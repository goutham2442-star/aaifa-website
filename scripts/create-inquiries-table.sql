-- Run this in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/plzhlwiohfuxwljnaexa/sql

CREATE TABLE IF NOT EXISTS public.inquiries (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name    text NOT NULL,
  email        text NOT NULL,
  phone        text,
  subject      text,
  message      text NOT NULL,
  inquiry_type text DEFAULT 'general',
  ip_address   text,
  created_at   timestamptz DEFAULT now()
);

-- Allow the API (service role) to insert rows
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_insert" ON public.inquiries
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "service_role_select" ON public.inquiries
  FOR SELECT TO service_role USING (true);
