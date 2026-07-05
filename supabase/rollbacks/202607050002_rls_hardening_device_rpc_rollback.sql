-- Emergency rollback for 202607050002_rls_hardening_device_rpc.sql.
--
-- This returns the main app tables to the pre-hardening access model. It does
-- not delete data and does not remove policies/functions; it only makes RLS stop
-- enforcing on the tables that the Educator Dashboard and Classroom Hub use.

alter table public."DeviceLessons" disable row level security;
alter table public."Files" disable row level security;
alter table public."Groups" disable row level security;
alter table public."LessonFiles" disable row level security;
alter table public."LessonGroups" disable row level security;
alter table public."Lessons" disable row level security;
alter table public.devices disable row level security;
alter table public.sync_runs disable row level security;
