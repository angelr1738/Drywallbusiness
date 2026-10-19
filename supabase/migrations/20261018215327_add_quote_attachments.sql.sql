/*
# Add quote attachments storage bucket

1. Storage
- Create public bucket `quote-attachments` for customer-uploaded photos/files submitted with quote requests.
2. Security
- Public read (so the business owner can view attachments without signing in — single-tenant, no-auth app).
- Allow anon + authenticated uploads to the bucket.
- No public delete; management happens via dashboard.
*/

insert into storage.buckets (id, name, public)
values ('quote-attachments', 'quote-attachments', true)
on conflict (id) do nothing;

drop policy if exists "anon_upload_quote_attachments" on storage.objects;
create policy "anon_upload_quote_attachments"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'quote-attachments');

drop policy if exists "anon_read_quote_attachments" on storage.objects;
create policy "anon_read_quote_attachments"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'quote-attachments');
