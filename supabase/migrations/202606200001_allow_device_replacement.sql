-- Allow an educator to replace their linked classroom hub by entering a valid
-- pairing code from a new unclaimed device.

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

  select id
  into existing_device_id
  from public.devices
  where user_id = educator_id
  limit 1;

  if existing_device_id is not null and existing_device_id <> matched_device_id then
    update public.devices
    set user_id = null
    where user_id = educator_id;
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
    'status', case
      when existing_device_id is null then 'claimed'
      when existing_device_id = matched_device_id then 'claimed'
      else 'replaced'
    end,
    'claimed', true,
    'device_id', matched_device_id,
    'replaced_device_id', case
      when existing_device_id is not null and existing_device_id <> matched_device_id
      then existing_device_id
      else null
    end
  );
end;
$$;

revoke all on function public.claim_device_with_code(text) from public;
grant execute on function public.claim_device_with_code(text) to authenticated;
