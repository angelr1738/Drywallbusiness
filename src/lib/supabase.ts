import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Booking = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  issue_type: string | null;
  preferred_date: string | null;
  notes: string | null;
  status: string;
  confirmation_code: string;
  created_at: string;
};

export type Review = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  body: string;
  created_at: string;
};
