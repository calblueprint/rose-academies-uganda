-- Delete an educator-owned classroom and clean up its lesson assignments.
--
-- The browser cannot safely know every relationship that may block a classroom
-- delete. This function keeps the operation narrow, authenticated, and atomic.

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

  if array_length(affected_lesson_ids, 1) is not null then
    delete from public."DeviceLessons"
    where lesson_id = any(affected_lesson_ids);

    update public."Lessons"
    set
      group_id = null,
      updated_at = now()
    where user_id = educator_id
      and group_id = p_group_id;
  end if;

  delete from public."LessonGroups"
  where group_id = p_group_id;

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

revoke all on function public.delete_owned_classroom(bigint) from public;
grant execute on function public.delete_owned_classroom(bigint) to authenticated;
