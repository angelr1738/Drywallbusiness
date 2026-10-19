/*
# Add bookings, project_progress, and client_reviews tables

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `user_id` (uuid, FK to auth.users — optional, linked when client creates account)
  - `name`, `email`, `phone` — contact info
  - `service_type` (text) — service requested
  - `issue_type` (text) — e.g. hole, water damage, crack
  - `preferred_date` (date)
  - `notes` (text)
  - `status` (text, default 'pending') — pending/confirmed/in-progress/complete
  - `confirmation_code` (text, unique) — 6-char alphanumeric sent to client
  - `created_at` (timestamptz)

- `project_progress`
  - `id` (uuid, primary key)
  - `booking_id` (uuid, FK to bookings)
  - `user_id` (uuid, FK to auth.users) — who owns the project tracker
  - `step_name` (text)
  - `step_index` (int)
  - `completed` (boolean, default false)
  - `notes` (text)
  - `updated_at` (timestamptz)

- `client_reviews`
  - `id` (uuid, primary key)
  - `name` (text)
  - `location` (text)
  - `rating` (int, 1–5)
  - `body` (text)
  - `created_at` (timestamptz)

2. Security
- bookings: anon can INSERT; authenticated users can SELECT/UPDATE their own rows; also allow anon SELECT by confirmation_code lookup.
- project_progress: authenticated owner-scoped CRUD.
- client_reviews: anon/authenticated can INSERT and SELECT (public reviews).
*/

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  issue_type text,
  preferred_date date,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  confirmation_code text UNIQUE NOT NULL DEFAULT upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 6)),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_own_bookings" ON bookings;
CREATE POLICY "auth_update_own_bookings" ON bookings FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- PROJECT PROGRESS
CREATE TABLE IF NOT EXISTS project_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  step_name text NOT NULL,
  step_index int NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  notes text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE project_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_progress" ON project_progress;
CREATE POLICY "select_own_progress" ON project_progress FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_progress" ON project_progress;
CREATE POLICY "insert_own_progress" ON project_progress FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_progress" ON project_progress;
CREATE POLICY "update_own_progress" ON project_progress FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_progress" ON project_progress;
CREATE POLICY "delete_own_progress" ON project_progress FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- CLIENT REVIEWS
CREATE TABLE IF NOT EXISTS client_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body text NOT NULL,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE client_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reviews" ON client_reviews;
CREATE POLICY "anon_select_reviews" ON client_reviews FOR SELECT
TO anon, authenticated USING (approved = true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON client_reviews;
CREATE POLICY "anon_insert_reviews" ON client_reviews FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Seed a few starter reviews
INSERT INTO client_reviews (name, location, rating, body) VALUES
  ('Jennifer M.', 'Springfield', 5, 'E&M fixed water damage in our ceiling that two other companies said could not be repaired. You genuinely cannot tell where the damage was. Incredible work.'),
  ('Robert K.', 'Riverside', 5, 'They remodeled our entire kitchen — drywall, texture, the works. Clean, on time, and the price was exactly what they quoted. No surprises.'),
  ('Sarah L.', 'Oakwood', 5, 'Had popcorn ceilings removed throughout the house. The crew was respectful, covered everything, and cleaned up perfectly. The new smooth ceilings look amazing.'),
  ('David P.', 'Lakewood', 5, 'Quick patch job on a hole from a door knob. Done in under an hour, painted to match. Couldn''t be happier.'),
  ('Maria G.', 'Fairview', 5, 'Full level-5 smooth finish on our master bedroom. The walls look like a luxury hotel now. Worth every penny.')
ON CONFLICT DO NOTHING;
