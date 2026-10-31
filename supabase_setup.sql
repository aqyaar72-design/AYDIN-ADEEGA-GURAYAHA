-- AYDIN CLEANING SERVICES: ku orod Supabase SQL Editor
create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('AYD-' || upper(substr(encode(gen_random_bytes(4),'hex'),1,8))),
  customer_name text not null,
  phone text not null,
  email text,
  city text not null,
  address text not null,
  service_id text not null,
  property_type text,
  cleaning_type text,
  preferred_date date not null,
  preferred_time text not null,
  details text,
  status text not null default 'Cusub'
    check (status in ('Cusub','La xaqiijiyey','Shaqada socota','La dhammeeyey','La joojiyey')),
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- Macaamiishu waxay diri karaan booking cusub. Akhriska iyo beddelka booking-yada admin keliya.
drop policy if exists "Dadweynuhu booking diri karaan" on public.bookings;
create policy "Dadweynuhu booking diri karaan"
on public.bookings for insert to anon, authenticated
with check (
  length(trim(customer_name)) between 2 and 120
  and length(trim(phone)) between 7 and 30
  and length(trim(address)) between 4 and 500
  and length(trim(city)) between 2 and 100
);

-- Jadwalka shaqaalaha maamulka (profiles) si loo kala saaro admin.
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin'))
);
alter table public.admin_profiles enable row level security;

drop policy if exists "Maamuluhu arki karo doorkiisa" on public.admin_profiles;
create policy "Maamuluhu arki karo doorkiisa"
on public.admin_profiles for select to authenticated
using (user_id = auth.uid());

create or replace function public.is_aydin_admin()
returns boolean language sql stable security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_profiles where user_id = auth.uid() and role = 'admin');
$$;

drop policy if exists "Admin akhriyi karo bookings" on public.bookings;
create policy "Admin akhriyi karo bookings"
on public.bookings for select to authenticated
using (public.is_aydin_admin());

drop policy if exists "Admin cusboonaysiin karo bookings" on public.bookings;
create policy "Admin cusboonaysiin karo bookings"
on public.bookings for update to authenticated
using (public.is_aydin_admin())
with check (public.is_aydin_admin());

-- Kadib markaad Auth user-ka admin-ka ka samaysato, ku beddel USER_UUID:
-- insert into public.admin_profiles (user_id, role) values ('USER_UUID', 'admin');
