-- Share a Beer — Supabase integration + compliance guardrails.
--
-- 1. auth.users → public.users sync trigger (UC-1). Keeps a 1:1 row in
--    public.users for every Supabase Auth user, with a placeholder
--    handle/display_name that the user replaces during profile setup.
-- 2. Append-only audit_logs (UC-26, BR-21, BR-22). The table already
--    exists from the initial migration; we revoke mutation grants here.

-----------------------------------------------------------------
-- 1. auth.users → public.users sync
-----------------------------------------------------------------
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  placeholder_handle text;
begin
  -- "user_" + first 12 hex chars of the UUID. Unique by construction since
  -- UUIDs are unique; users rename this during profile setup (UC-21).
  placeholder_handle := 'user_' || substr(replace(new.id::text, '-', ''), 1, 12);

  insert into public.users (user_id, email, display_name, handle, status, age_verified)
  values (
    new.id,
    new.email,
    'New User',
    placeholder_handle,
    'pending_age_verification',
    false
  );

  insert into public.profiles (user_id)
  values (new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_auth_user();

-----------------------------------------------------------------
-- 2. Append-only audit_logs (BR-21, BR-22)
-----------------------------------------------------------------
-- Admin/service role can INSERT; nobody can UPDATE or DELETE.
revoke update, delete on public.audit_logs from public;
revoke update, delete on public.audit_logs from authenticated;
revoke update, delete on public.audit_logs from anon;
revoke update, delete on public.audit_logs from service_role;

-- A trigger as a defense-in-depth measure — revocations can be loosened by
-- accident, a trigger cannot unless someone drops it intentionally.
create or replace function public.audit_logs_deny_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'audit_logs is append-only (BR-21 / BR-22)';
end;
$$;

drop trigger if exists audit_logs_no_update on public.audit_logs;
create trigger audit_logs_no_update
  before update on public.audit_logs
  for each row
  execute function public.audit_logs_deny_mutation();

drop trigger if exists audit_logs_no_delete on public.audit_logs;
create trigger audit_logs_no_delete
  before delete on public.audit_logs
  for each row
  execute function public.audit_logs_deny_mutation();
