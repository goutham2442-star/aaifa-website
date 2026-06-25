-- ============================================================
-- AAIFA — Supabase Schema
-- ============================================================

create extension if not exists "uuid-ossp";

-- ─── Programs ───────────────────────────────────────────────
create table if not exists programs (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  subtitle text,
  description text not null,
  long_description text,
  min_age text,
  duration text,
  mode text not null default 'hybrid' check (mode in ('offline','online','hybrid')),
  icon text,
  image_url text,
  highlights text[],
  levels jsonb,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Gallery Images ─────────────────────────────────────────
create table if not exists gallery_images (
  id uuid primary key default uuid_generate_v4(),
  title text,
  description text,
  url text not null,
  storage_path text not null default '',
  category text not null default 'general'
    check (category in ('performances','events','classes','awards','general')),
  alt_text text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Testimonials ───────────────────────────────────────────
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  author_role text not null,
  content text not null,
  rating int not null default 5 check (rating between 1 and 5),
  program text,
  avatar_url text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Awards ──────────────────────────────────────────────────
create table if not exists awards (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  year int,
  description text,
  image_url text,
  recipient text not null default 'Guru Smt. Haripriya Pettem',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Events ──────────────────────────────────────────────────
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  location text,
  image_url text,
  type text not null default 'performance'
    check (type in ('performance','workshop','exam','arangetram','festival')),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─── Inquiries (contact form submissions) ───────────────────
create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  preferred_program text,
  inquiry_type text not null default 'general'
    check (inquiry_type in ('general','enrollment','collaboration','media')),
  status text not null default 'new'
    check (status in ('new','read','replied','archived')),
  ip_address text,
  created_at timestamptz not null default now()
);

-- ─── Newsletter Subscribers ─────────────────────────────────
create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  is_active boolean not null default true,
  source text not null default 'website',
  subscribed_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table programs enable row level security;
alter table gallery_images enable row level security;
alter table testimonials enable row level security;
alter table awards enable row level security;
alter table events enable row level security;
alter table inquiries enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public can READ content tables
create policy "public_read_programs" on programs for select using (true);
create policy "public_read_gallery" on gallery_images for select using (true);
create policy "public_read_testimonials" on testimonials for select using (true);
create policy "public_read_awards" on awards for select using (true);
create policy "public_read_events" on events for select using (is_published = true);

-- Public can INSERT into inquiries & newsletter (contact/newsletter forms)
-- but NOT read/update/delete them (only the service role, used server-side, can)
create policy "public_insert_inquiries" on inquiries for insert with check (true);
create policy "public_insert_newsletter" on newsletter_subscribers for insert with check (true);
