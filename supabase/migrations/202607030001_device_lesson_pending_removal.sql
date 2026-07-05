alter table public."DeviceLessons"
  drop constraint if exists "DeviceLessons_status_check";

alter table public."DeviceLessons"
  add constraint "DeviceLessons_status_check"
  check (status in ('pending', 'available', 'failed', 'pending_removal'));
