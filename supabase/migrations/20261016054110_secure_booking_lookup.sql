/*
# Secure booking lookup

1. Security changes
- Remove the public SELECT policy that exposed every booking record.
- Add a narrow SECURITY DEFINER lookup function that returns only the booking summary needed by a client who knows a valid confirmation code.
- Revoke direct function execution from public roles before granting the intended lookup access.

2. Important notes
- Booking creation remains available to prospective customers.
- The confirmation code is the only public lookup credential.
- Email, phone, notes, and other private booking fields are never returned by the lookup function.
*/

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;

CREATE OR REPLACE FUNCTION public.lookup_booking(p_confirmation_code text)
RETURNS TABLE (
  id uuid,
  name text,
  service_type text,
  preferred_date date,
  status text,
  confirmation_code text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.id, b.name, b.service_type, b.preferred_date, b.status, b.confirmation_code
  FROM public.bookings AS b
  WHERE upper(b.confirmation_code) = upper(trim(p_confirmation_code))
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.lookup_booking(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lookup_booking(text) TO anon, authenticated;
