-- Show a small owner summary on the local setup page when a Classroom Hub is
-- already linked. The pairing code remains required for registration/status
-- calls; the response only includes display fields for the claimed device.

create or replace function public.device_owner_summary(p_user_id uuid)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'linked_educator_name',
    coalesce(
      nullif(btrim(p.display_name), ''),
      nullif(btrim(u.raw_user_meta_data ->> 'display_name'), ''),
      nullif(btrim(u.raw_user_meta_data ->> 'full_name'), ''),
      split_part(u.email, '@', 1)
    ),
    'linked_educator_email',
    u.email
  )
  from auth.users u
  left join public."Profiles" p on p.id = u.id
  where u.id = p_user_id;
$$;

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
    ) || coalesce(public.device_owner_summary(linked_user_id), '{}'::jsonb);
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
    ) || coalesce(public.device_owner_summary(linked_user_id), '{}'::jsonb);
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

revoke all on function public.device_owner_summary(uuid) from public;
