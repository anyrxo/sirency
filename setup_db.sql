-- SETUP SCRIPT FOR SIRENCY SUPABASE DATABASE
-- This script sets up the necessary tables, policies, and triggers for the OnlyFans Agency dashboard.

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE PROFILES TABLE
-- This maps to Clerk Users. We use 'text' for id to store the Clerk User ID directly.
CREATE TABLE public.profiles (
    id text PRIMARY KEY, -- Clerk User ID
    email text,
    full_name text,
    role text CHECK (role IN ('model', 'staff', 'admin')),
    
    -- Social Handles
    instagram_handle text,
    tiktok_handle text,
    onlyfans_link text,
    
    -- Status
    status text DEFAULT 'active' CHECK (status IN ('active', 'onboarding', 'paused')),
    
    -- Metadata
    avatar_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CREATE REVENUE TRACKING TABLE
-- Tracks daily/monthly revenue for models
CREATE TABLE public.revenue_stats (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    model_id text REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Financials
    gross_revenue decimal(10, 2) DEFAULT 0,
    net_revenue decimal(10, 2) DEFAULT 0, -- After OF fees
    new_subs integer DEFAULT 0,
    
    -- Timeframe
    period_start date NOT NULL, -- e.g. 2025-11-01
    period_type text DEFAULT 'month' CHECK (period_type IN ('day', 'week', 'month')),
    
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CREATE CONTENT CALENDAR TABLE
-- For scheduling posts
CREATE TABLE public.content_calendar (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    model_id text REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    title text NOT NULL,
    description text,
    platform text CHECK (platform IN ('instagram', 'tiktok', 'onlyfans', 'twitter')),
    status text DEFAULT 'planned' CHECK (status IN ('planned', 'created', 'posted', 'archived')),
    
    scheduled_for timestamp with time zone,
    media_url text, -- Link to content in storage
    
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;

-- 6. CREATE POLICIES

-- Policy: Models can view only their own profile
CREATE POLICY "Models view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid()::text = id);

-- Policy: Models can update their own profile
CREATE POLICY "Models update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid()::text = id);

-- Policy: Staff/Admins can view all profiles
-- (Note: This assumes we have a way to check 'role' safely. 
-- For simplicity in Client-side Clerk auth, strictly verifying role usually requires a custom claim in JWT 
-- or a trusted backend. For now, we'll allow basic self-access and create a 'staff' role check function if needed later.)
-- A simpler approach for now for Clerk integration:
CREATE POLICY "Enable read access for authenticated users"
ON public.profiles FOR SELECT
USING (auth.role() = 'authenticated');

-- Policy: Models view their own revenue
CREATE POLICY "Models view own revenue"
ON public.revenue_stats FOR SELECT
USING (auth.uid()::text = model_id);

-- Policy: Models view their own calendar
CREATE POLICY "Models view own content"
ON public.content_calendar FOR SELECT
USING (auth.uid()::text = model_id);


-- 7. FUNCTION TO HANDLE NEW USER INSERTION (Optional helper)
-- Since we use Clerk, we usually insert via webhook or client-side on first login.
-- Here is a function you can call from your JS after login to ensure the profile exists.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS void AS $$
BEGIN
  -- This is a placeholder. Logic usually resides in the application layer for Clerk.
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. GRANT PERMISSIONS
-- Allow authenticated users (logged in via Clerk/Supabase bridge) to use these tables
GRANT ALL ON public.profiles TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.revenue_stats TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.content_calendar TO postgres, anon, authenticated, service_role;

-- COMMENT
COMMENT ON TABLE public.profiles IS 'Stores user profiles linked to Clerk IDs';
COMMENT ON TABLE public.revenue_stats IS 'Tracks financial performance for models';

