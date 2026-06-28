-- Educator self-signup profile bootstrap.
--
-- Supabase Auth owns email/password credentials. The app reads educator display
-- information from public."Profiles", so every auth user needs a matching row.

create table if not exists public."Profiles" (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public."Profiles" enable row level security;

drop policy if exists "Educators can read their own profile" on public."Profiles";
create policy "Educators can read their own profile"
  on public."Profiles"
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Educators can update their own profile" on public."Profiles";
create policy "Educators can update their own profile"
  on public."Profiles"
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public."Profiles" (id, display_name)
  values (
    new.id,
    nullif(
      btrim(
        coalesce(
          new.raw_user_meta_data ->> 'display_name',
          new.raw_user_meta_data ->> 'full_name',
          split_part(new.email, '@', 1)
        )
      ),
      ''
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_profile_after_auth_signup on auth.users;
create trigger create_profile_after_auth_signup
  after insert on auth.users
  for each row
  execute function public.create_profile_for_new_user();
