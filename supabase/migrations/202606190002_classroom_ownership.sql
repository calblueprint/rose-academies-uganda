-- Classrooms should be visible to the educator who created them, while still
-- allowing existing Canvas/imported classrooms to appear when they are already
-- assigned to that educator's lessons.

alter table public."Groups"
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists groups_user_id_idx on public."Groups" (user_id);
