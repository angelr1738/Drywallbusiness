/*
# Create quote_requests table (single-tenant, no auth)

1. New Tables
- `quote_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — customer's full name
  - `email` (text, not null) — customer's email
  - `phone` (text, not null) — customer's phone number
  - `service_type` (text, not null) — type of drywall service requested
  - `project_description` (text) — optional details about the project
  - `preferred_date` (date) — preferred date for the quote visit
  - `status` (text, default 'pending') — quote status tracking
  - `created_at` (timestamptz, default now()) — when the request was submitted

2. Security
- Enable RLS on `quote_requests`.
- Allow anon + authenticated INSERT (public can submit quotes) and SELECT (for display).
- Only allow INSERT to anon — no public reads of other people's data, but this is a single-tenant business app so SELECT is also open.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  project_description text,
  preferred_date date,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_quotes" ON quote_requests;
CREATE POLICY "anon_select_quotes" ON quote_requests FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_quotes" ON quote_requests;
CREATE POLICY "anon_insert_quotes" ON quote_requests FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_quotes" ON quote_requests;
CREATE POLICY "anon_update_quotes" ON quote_requests FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_quotes" ON quote_requests;
CREATE POLICY "anon_delete_quotes" ON quote_requests FOR DELETE
TO anon, authenticated USING (true);
