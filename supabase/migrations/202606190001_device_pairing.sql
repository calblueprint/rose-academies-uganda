-- Educator-friendly Raspberry Pi registration.
--
-- A Pi creates a random device ID and one-time pairing code locally. The Pi
-- registers only a SHA-256 hash of that code. An authenticated educator can
-- then claim the unassigned device with the code shown on the Pi setup page.

create extension if not exists pgcrypto with schema extensions;

-- Devices must be allowed to exist before they belong to an educator.
alter table public.devices
  alter column user_id drop not null;

create table if not exists public.device_pairing_codes (
  device_id text primary key references public.devices(id) on delete cascade,
  code_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '365 days'),
  claimed_at timestamptz
);

alter table public.device_pairing_codes enable row level security;

-- Pairing codes are never read directly. All access goes through the narrow
-- SECURITY DEFINER functions below.
revoke all on table public.device_pairing_codes from anon, authenticated;

create or replace function public.register_device_for_pairing(
  p_device_id text,
  p_pairing_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  normalized_device_id text := btrim(p_device_id);
  normalized_code text := upper(regexp_replace(p_pairing_code, '[[:space:]-]', '', 'g'));
  pairing_hash text;
  linked_user_id uuid;
  affected_rows integer;
begin
  if normalized_device_id !~ '^[A-Za-z0-9][A-Za-z0-9._-]{5,127}$' then
    raise exception 'invalid_device_id';
  end if;

  if normalized_code !~ '^[A-F0-9]{12}$' then
    raise exception 'invalid_pairing_code';
  end if;

  pairing_hash := encode(digest(normalized_code, 'sha256'), 'hex');

  insert into public.devices (id, user_id)
  values (normalized_device_id, null)
  on conflict (id) do nothing;

  select user_id
  into linked_user_id
  from public.devices
  where id = normalized_device_id;

  if linked_user_id is not null then
    return jsonb_build_object(
      'status', 'claimed',
      'claimed', true,
      'device_id', normalized_device_id
    );
  end if;

  insert into public.device_pairing_codes (
    device_id,
    code_hash,
    created_at,
    expires_at,
    claimed_at
  )
  values (
    normalized_device_id,
    pairing_hash,
    now(),
    now() + interval '365 days',
    null
  )
  on conflict (device_id) do update
  set expires_at = greatest(public.device_pairing_codes.expires_at, excluded.expires_at)
  where public.device_pairing_codes.code_hash = excluded.code_hash
    and public.device_pairing_codes.claimed_at is null;

  get diagnostics affected_rows = row_count;

  -- Do not let a caller replace the secret for an ID registered by a real Pi.
  if affected_rows = 0 then
    raise exception 'device_pairing_conflict';
  end if;

  return jsonb_build_object(
    'status', 'ready',
    'claimed', false,
    'device_id', normalized_device_id
  );
end;
$$;

create or replace function public.get_device_pairing_status(
  p_device_id text,
  p_pairing_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  normalized_device_id text := btrim(p_device_id);
  normalized_code text := upper(regexp_replace(p_pairing_code, '[[:space:]-]', '', 'g'));
  linked_user_id uuid;
  pairing_is_valid boolean;
begin
  select user_id
  into linked_user_id
  from public.devices
  where id = normalized_device_id;

  if linked_user_id is not null then
    return jsonb_build_object(
      'status', 'claimed',
      'claimed', true,
      'device_id', normalized_device_id
    );
  end if;

  select exists (
    select 1
    from public.device_pairing_codes
    where device_id = normalized_device_id
      and code_hash = encode(digest(normalized_code, 'sha256'), 'hex')
      and claimed_at is null
      and expires_at > now()
  )
  into pairing_is_valid;

  return jsonb_build_object(
    'status', case when pairing_is_valid then 'ready' else 'not_registered' end,
    'claimed', false,
    'device_id', normalized_device_id
  );
end;
$$;

create or replace function public.claim_device_with_code(p_pairing_code text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  educator_id uuid := auth.uid();
  normalized_code text := upper(regexp_replace(p_pairing_code, '[[:space:]-]', '', 'g'));
  matched_device_id text;
  existing_device_id text;
begin
  if educator_id is null then
    raise exception 'authentication_required';
  end if;

  if normalized_code !~ '^[A-F0-9]{12}$' then
    raise exception 'invalid_pairing_code';
  end if;

  select id
  into existing_device_id
  from public.devices
  where user_id = educator_id
  limit 1;

  if existing_device_id is not null then
    return jsonb_build_object(
      'status', 'already_linked',
      'claimed', true,
      'device_id', existing_device_id
    );
  end if;

  select device_id
  into matched_device_id
  from public.device_pairing_codes
  where code_hash = encode(digest(normalized_code, 'sha256'), 'hex')
    and claimed_at is null
    and expires_at > now()
  for update;

  if matched_device_id is null then
    raise exception 'invalid_or_expired_pairing_code';
  end if;

  update public.devices
  set user_id = educator_id
  where id = matched_device_id
    and user_id is null;

  if not found then
    raise exception 'device_already_claimed';
  end if;

  update public.device_pairing_codes
  set claimed_at = now()
  where device_id = matched_device_id;

  return jsonb_build_object(
    'status', 'claimed',
    'claimed', true,
    'device_id', matched_device_id
  );
end;
$$;

revoke all on function public.register_device_for_pairing(text, text) from public;
revoke all on function public.get_device_pairing_status(text, text) from public;
revoke all on function public.claim_device_with_code(text) from public;

grant execute on function public.register_device_for_pairing(text, text) to anon, authenticated;
grant execute on function public.get_device_pairing_status(text, text) to anon, authenticated;
grant execute on function public.claim_device_with_code(text) to authenticated;
