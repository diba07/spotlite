-- SQL for creating the events table in Spotlite

create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  date timestamp with time zone not null,
  location_name text not null,
  full_address text not null,
  city text,
  base_price numeric default 0,
  category text check (category in ('Music', 'Food', 'Kids', 'Nightlife', 'Sports', 'Other')),
  image_url text,
  age_badge text default 'All Ages', -- 'Kids', 'Adults', 'All Ages'
  latitude float8,
  longitude float8,
  organizer_id uuid references auth.users(id) default auth.uid(),
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table events enable row level security;

-- 1. Everyone can view events
drop policy if exists "Events are viewable by everyone" on events;
create policy "Events are viewable by everyone" on events
  for select using (true);

-- 2. Only admins can create/update/delete events
drop policy if exists "Only admins can manage events" on events;
create policy "Only admins can manage events" on events
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
