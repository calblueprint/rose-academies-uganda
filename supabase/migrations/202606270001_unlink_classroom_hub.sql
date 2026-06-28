-- Allow an educator to disconnect their current Classroom Hub without linking
-- a replacement hub in the same action.

create or replace function public.unlink_current_device()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  educator_id uuid := auth.uid();
  current_device_id text;
begin
  if educator_id is null then
    raise exception 'authentication_required';
  end if;

  select id
  into current_device_id
  from public.devices
  where user_id = educator_id
  limit 1
  for update;

  if current_device_id is null then
    return jsonb_build_object(
      'status', 'not_linked',
      'unlinked', false
    );
  end if;

  delete from public."DeviceLessons"
  where device_id = current_device_id;

  update public.devices
  set user_id = null
  where id = current_device_id
    and user_id = educator_id;

  update public.device_pairing_codes
  set claimed_at = null,
      expires_at = greatest(expires_at, now() + interval '365 days')
  where device_id = current_device_id;

  return jsonb_build_object(
    'status', 'unlinked',
    'unlinked', true,
    'device_id', current_device_id
  );
end;
$$;

revoke all on function public.unlink_current_device() from public;
grant execute on function public.unlink_current_device() to authenticated;
