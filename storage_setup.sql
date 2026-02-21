-- SQL for creating the flyers storage bucket
-- Run this in your Supabase SQL Editor

-- 1. Create the bucket
insert into storage.buckets (id, name, public)
values ('flyers', 'flyers', true)
on conflict (id) do nothing;

-- 2. Allow public access to flyers
drop policy if exists "Flyer images are publicly accessible." on storage.objects;
create policy "Flyer images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'flyers' );

-- 3. Allow admins to upload flyers
-- Note: This assumes your profiles table has a role column
drop policy if exists "Admins can upload flyers." on storage.objects;
create policy "Admins can upload flyers."
  on storage.objects for insert
  with check (
    bucket_id = 'flyers' AND
    (exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    ))
  );

-- 4. Allow admins to delete/update flyers
drop policy if exists "Admins can update flyers." on storage.objects;
create policy "Admins can update flyers."
  on storage.objects for update
  using ( bucket_id = 'flyers' );

drop policy if exists "Admins can delete flyers." on storage.objects;
create policy "Admins can delete flyers."
  on storage.objects for delete
  using ( bucket_id = 'flyers' );
