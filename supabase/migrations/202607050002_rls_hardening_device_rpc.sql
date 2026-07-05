-- Harden public tables with RLS while keeping Classroom Hub sync working.
--
-- Educator Dashboard access uses normal authenticated policies. Classroom Hubs
-- do not have an educator login session, so Pi sync operations go through the
-- narrow SECURITY DEFINER RPC functions below. Each device RPC requires both
-- the device id and the private pairing code stored on the Pi.

create extension if not exists pgcrypto with schema extensions;

alter table public."Lessons"
  alter column group_id drop not null;

create or replace function public.verify_device_pairing_secret(
  p_device_id text,
  p_pairing_code text
)
returns boolean
language sql
security definer
set search_path = public, extensions
as $$
  select exists (
    select 1
    from public.device_pairing_codes dpc
    where dpc.device_id = btrim(p_device_id)
      and dpc.code_hash = encode(
        digest(
          upper(regexp_replace(coalesce(p_pairing_code, ''), '[[:space:]-]', '', 'g')),
          'sha256'
        ),
        'hex'
      )
  );
$$;

create or replace function public.get_device_pending_update_count(
  p_device_id text,
  p_pairing_code text
)
returns integer
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  pending_count integer := 0;
begin
  if not public.verify_device_pairing_secret(p_device_id, p_pairing_code) then
    raise exception 'invalid_device_secret';
  end if;

  select count(*)::integer
  into pending_count
  from public."DeviceLessons"
  where device_id = btrim(p_device_id)
    and status in ('pending', 'pending_removal');

  return pending_count;
end;
$$;

create or replace function public.get_device_sync_payload(
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
  payload jsonb;
begin
  if not public.verify_device_pairing_secret(normalized_device_id, p_pairing_code) then
    raise exception 'invalid_device_secret';
  end if;

  with assigned_lessons as (
    select distinct dl.lesson_id
    from public."DeviceLessons" dl
    where dl.device_id = normalized_device_id
      and dl.status <> 'pending_removal'
      and dl.lesson_id is not null
  ),
  lesson_rows as (
    select l.id, l.name, l.description, l.image_path, l.group_id
    from public."Lessons" l
    join assigned_lessons al on al.lesson_id = l.id
    where coalesce(l.is_archived, false) = false
  ),
  lesson_group_rows as (
    select distinct lg.lesson_id, lg.group_id
    from public."LessonGroups" lg
    join assigned_lessons al on al.lesson_id = lg.lesson_id
  ),
  lesson_file_rows as (
    select distinct lf.lesson_id, lf.file_id
    from public."LessonFiles" lf
    join assigned_lessons al on al.lesson_id = lf.lesson_id
  ),
  file_rows as (
    select distinct
      f.id,
      f.name,
      f.size_bytes,
      f.storage_path,
      f.hash,
      f.lesson_id,
      f.created_at,
      null::timestamptz as updated_at,
      f.mime_type
    from public."Files" f
    join lesson_file_rows lf on lf.file_id = f.id
  ),
  group_ids as (
    select group_id
    from lesson_group_rows
    where group_id is not null

    union

    select group_id
    from lesson_rows
    where group_id is not null
  ),
  group_rows as (
    select distinct g.id, g.name, g.join_code
    from public."Groups" g
    join group_ids ids on ids.group_id = g.id
  )
  select jsonb_build_object(
    'groups', coalesce((select jsonb_agg(to_jsonb(group_rows)) from group_rows), '[]'::jsonb),
    'lessons', coalesce((select jsonb_agg(to_jsonb(lesson_rows)) from lesson_rows), '[]'::jsonb),
    'files', coalesce((select jsonb_agg(to_jsonb(file_rows)) from file_rows), '[]'::jsonb),
    'lessonFiles', coalesce((select jsonb_agg(to_jsonb(lesson_file_rows)) from lesson_file_rows), '[]'::jsonb),
    'lessonGroups', coalesce((select jsonb_agg(to_jsonb(lesson_group_rows)) from lesson_group_rows), '[]'::jsonb)
  )
  into payload;

  return payload;
end;
$$;

create or replace function public.complete_device_lesson_sync(
  p_device_id text,
  p_pairing_code text,
  p_lesson_ids bigint[]
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  normalized_device_id text := btrim(p_device_id);
  updated_count integer := 0;
  removed_count integer := 0;
begin
  if not public.verify_device_pairing_secret(normalized_device_id, p_pairing_code) then
    raise exception 'invalid_device_secret';
  end if;

  if coalesce(array_length(p_lesson_ids, 1), 0) > 0 then
    update public."DeviceLessons"
    set status = 'available'
    where device_id = normalized_device_id
      and lesson_id = any(p_lesson_ids)
      and status <> 'pending_removal';

    get diagnostics updated_count = row_count;
  end if;

  delete from public."DeviceLessons"
  where device_id = normalized_device_id
    and status = 'pending_removal';

  get diagnostics removed_count = row_count;

  return jsonb_build_object(
    'updated', updated_count,
    'removed', removed_count
  );
end;
$$;

create or replace function public.update_device_last_synced(
  p_device_id text,
  p_pairing_code text,
  p_synced_at timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_device_pairing_secret(p_device_id, p_pairing_code) then
    raise exception 'invalid_device_secret';
  end if;

  update public.devices
  set last_synced_at = p_synced_at
  where id = btrim(p_device_id);

  return jsonb_build_object('updated', found);
end;
$$;

create or replace function public.report_device_storage(
  p_device_id text,
  p_pairing_code text,
  p_total_kb bigint,
  p_used_kb bigint,
  p_available_kb bigint,
  p_use_percent numeric,
  p_rose_files_kb bigint,
  p_repo_kb bigint
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_device_pairing_secret(p_device_id, p_pairing_code) then
    raise exception 'invalid_device_secret';
  end if;

  update public.devices
  set
    total_kb = p_total_kb,
    used_kb = p_used_kb,
    available_kb = p_available_kb,
    use_percent = p_use_percent,
    rose_files_kb = p_rose_files_kb,
    repo_kb = p_repo_kb
  where id = btrim(p_device_id);

  return jsonb_build_object('updated', found);
end;
$$;

create or replace function public.claim_requested_sync_run(
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
  claimed_run record;
begin
  if not public.verify_device_pairing_secret(normalized_device_id, p_pairing_code) then
    raise exception 'invalid_device_secret';
  end if;

  with candidate as (
    select id
    from public.sync_runs
    where device_id = normalized_device_id
      and status = 'requested'
    order by requested_at desc
    limit 1
    for update skip locked
  )
  update public.sync_runs sr
  set status = 'in_progress'
  from candidate
  where sr.id = candidate.id
  returning sr.id::text as id, sr.status, sr.requested_at
  into claimed_run;

  if claimed_run.id is null then
    return null;
  end if;

  return jsonb_build_object(
    'id', claimed_run.id,
    'status', claimed_run.status,
    'requested_at', claimed_run.requested_at
  );
end;
$$;

create or replace function public.update_device_sync_run(
  p_device_id text,
  p_pairing_code text,
  p_sync_run_id text,
  p_status text,
  p_stage text default null,
  p_started_at timestamptz default null,
  p_completed_at timestamptz default null,
  p_error_message text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_device_pairing_secret(p_device_id, p_pairing_code) then
    raise exception 'invalid_device_secret';
  end if;

  update public.sync_runs
  set
    status = p_status,
    stage = p_stage,
    started_at = coalesce(p_started_at, started_at),
    completed_at = coalesce(p_completed_at, completed_at),
    error_message = p_error_message
  where id::text = p_sync_run_id
    and device_id = btrim(p_device_id);

  if not found then
    raise exception 'sync_run_not_found';
  end if;

  return jsonb_build_object('updated', true);
end;
$$;

create or replace function public.delete_owned_classroom(p_group_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  educator_id uuid := auth.uid();
  classroom_name text;
  affected_lesson_ids bigint[];
  linked_device_id text;
  lesson_id_to_update bigint;
  next_group_id bigint;
begin
  if educator_id is null then
    raise exception 'authentication_required';
  end if;

  select name
  into classroom_name
  from public."Groups"
  where id = p_group_id
    and user_id = educator_id;

  if classroom_name is null then
    raise exception 'classroom_not_found_or_not_owned';
  end if;

  select id
  into linked_device_id
  from public.devices
  where user_id = educator_id
  limit 1;

  select coalesce(array_agg(distinct lesson_id), array[]::bigint[])
  into affected_lesson_ids
  from (
    select id::bigint as lesson_id
    from public."Lessons"
    where user_id = educator_id
      and group_id = p_group_id

    union

    select lg.lesson_id::bigint as lesson_id
    from public."LessonGroups" lg
    join public."Lessons" l on l.id = lg.lesson_id
    where l.user_id = educator_id
      and lg.group_id = p_group_id
  ) owned_lessons;

  delete from public."LessonGroups"
  where group_id = p_group_id
    and lesson_id = any(affected_lesson_ids);

  foreach lesson_id_to_update in array affected_lesson_ids loop
    select lg.group_id
    into next_group_id
    from public."LessonGroups" lg
    join public."Groups" g on g.id = lg.group_id
    where lg.lesson_id = lesson_id_to_update
      and g.user_id = educator_id
    order by g.name asc
    limit 1;

    update public."Lessons"
    set
      group_id = next_group_id,
      updated_at = now()
    where id = lesson_id_to_update
      and user_id = educator_id;

    if linked_device_id is not null then
      if next_group_id is null then
        update public."DeviceLessons"
        set status = 'pending_removal'
        where lesson_id = lesson_id_to_update
          and device_id = linked_device_id;
      else
        update public."DeviceLessons"
        set status = 'pending'
        where lesson_id = lesson_id_to_update
          and device_id = linked_device_id
          and status <> 'pending_removal';
      end if;
    end if;
  end loop;

  delete from public."Groups"
  where id = p_group_id
    and user_id = educator_id;

  if not found then
    raise exception 'classroom_delete_failed';
  end if;

  return jsonb_build_object(
    'deleted', true,
    'classroom_id', p_group_id,
    'classroom_name', classroom_name,
    'affected_lessons', coalesce(array_length(affected_lesson_ids, 1), 0)
  );
end;
$$;

drop policy if exists "sync_runs" on public.sync_runs;
drop policy if exists "Users can create their own sync runs" on public.sync_runs;
drop policy if exists "Users can view their own sync runs" on public.sync_runs;
drop policy if exists "Users can update their own sync runs" on public.sync_runs;

create policy "Users can create their own sync runs"
on public.sync_runs
for insert
to authenticated
with check (
  exists (
    select 1
    from public.devices d
    where d.id = sync_runs.device_id
      and d.user_id = auth.uid()
  )
);

create policy "Users can view their own sync runs"
on public.sync_runs
for select
to authenticated
using (
  exists (
    select 1
    from public.devices d
    where d.id = sync_runs.device_id
      and d.user_id = auth.uid()
  )
);

create policy "Users can update their own sync runs"
on public.sync_runs
for update
to authenticated
using (
  exists (
    select 1
    from public.devices d
    where d.id = sync_runs.device_id
      and d.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.devices d
    where d.id = sync_runs.device_id
      and d.user_id = auth.uid()
  )
);

alter table public."DeviceLessons" enable row level security;
alter table public."Files" enable row level security;
alter table public."Groups" enable row level security;
alter table public."LessonFiles" enable row level security;
alter table public."LessonGroups" enable row level security;
alter table public."Lessons" enable row level security;
alter table public.devices enable row level security;
alter table public.sync_runs enable row level security;

revoke all on function public.verify_device_pairing_secret(text, text) from public;
revoke all on function public.get_device_pending_update_count(text, text) from public;
revoke all on function public.get_device_sync_payload(text, text) from public;
revoke all on function public.complete_device_lesson_sync(text, text, bigint[]) from public;
revoke all on function public.update_device_last_synced(text, text, timestamptz) from public;
revoke all on function public.report_device_storage(text, text, bigint, bigint, bigint, numeric, bigint, bigint) from public;
revoke all on function public.claim_requested_sync_run(text, text) from public;
revoke all on function public.update_device_sync_run(text, text, text, text, text, timestamptz, timestamptz, text) from public;
revoke all on function public.delete_owned_classroom(bigint) from public;

grant execute on function public.get_device_pending_update_count(text, text) to anon, authenticated;
grant execute on function public.get_device_sync_payload(text, text) to anon, authenticated;
grant execute on function public.complete_device_lesson_sync(text, text, bigint[]) to anon, authenticated;
grant execute on function public.update_device_last_synced(text, text, timestamptz) to anon, authenticated;
grant execute on function public.report_device_storage(text, text, bigint, bigint, bigint, numeric, bigint, bigint) to anon, authenticated;
grant execute on function public.claim_requested_sync_run(text, text) to anon, authenticated;
grant execute on function public.update_device_sync_run(text, text, text, text, text, timestamptz, timestamptz, text) to anon, authenticated;
grant execute on function public.delete_owned_classroom(bigint) to authenticated;
