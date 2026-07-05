create or replace function public.get_device_sync_payload(
  p_device_id text,
  p_pairing_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public
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

grant execute on function public.get_device_sync_payload(text, text) to anon, authenticated;
