import { useState, type FormEvent } from 'react';
import { Calendar, User, Mail, Phone, MessageSquare, CheckCircle, Loader2, AlertCircle, Upload, X, FileText, ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const PHONE_HREF = 'tel:+12533222128';

const serviceTypes = [
  'Drywall Installation',
  'Drywall Repair',
  'Water Damage Repair',
  'Texture & Finishing',
  'Remodeling',
  'Popcorn Ceiling Removal',
  'Other / Not Sure',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 6;

type UploadedFile = {
  name: string;
  url: string;
  path: string;
};

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [dragging, setDragging] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `${file.name}: unsupported file type. Use JPG, PNG, WEBP, GIF, or PDF.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: file too large (max 10MB).`;
    }
    return null;
  };

  const addFiles = (incoming: FileList | File[]) => {
    setUploadError('');
    const arr = Array.from(incoming);
    const room = MAX_FILES - files.length;
    if (room <= 0) {
      setUploadError(`You can attach up to ${MAX_FILES} files.`);
      return;
    }
    const accepted: File[] = [];
    for (const f of arr) {
      if (accepted.length >= room) {
        setUploadError(`Only the first ${room} file(s) were added (max ${MAX_FILES}).`);
        break;
      }
      const err = validateFile(f);
      if (err) {
        setUploadError(err);
        continue;
      }
      accepted.push(f);
    }
    if (accepted.length) setFiles((prev) => [...prev, ...accepted]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    setUploadError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      service_type: String(formData.get('service_type') || ''),
      project_description: String(formData.get('project_description') || '') || null,
      preferred_date: String(formData.get('preferred_date') || '') || null,
    };

    try {
      const { data: inserted, error: insertError } = await supabase
        .from('quote_requests')
        .insert(data)
        .select('id')
        .maybeSingle();
      if (insertError) throw insertError;
      const quoteId = inserted?.id as string | undefined;

      const uploaded: UploadedFile[] = [];
      if (files.length && quoteId) {
        for (const file of files) {
          const ext = file.name.split('.').pop() || 'bin';
          const path = `${quoteId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from('quote-attachments')
            .upload(path, file, { upsert: false });
          if (upErr) throw upErr;
          const { data: pub } = supabase.storage.from('quote-attachments').getPublicUrl(path);
          uploaded.push({ name: file.name, url: pub.publicUrl, path });
        }
      }

      setUploads(uploaded);
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setFiles([]);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try calling us instead.'
      );
    }
  };

  if (status === 'success') {
    return (
      <section id="quote" className="py-20 md:py-28 bg-gradient-to-br from-blue-500 to-blue-600">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950">
              Thank You! Request Received.
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              We have received your quote request and will reach out within 24 hours
              to confirm your appointment. Need to talk sooner?
            </p>
            {uploads.length > 0 && (
              <div className="mt-6 text-left bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-sm font-semibold text-slate-800 mb-2">Attached files:</p>
                <ul className="space-y-1">
                  {uploads.map((u) => (
                    <li key={u.path} className="text-sm text-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <a href={u.url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                        {u.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <a
              href={PHONE_HREF}
              className="mt-6 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call (253) 322-2128
            </a>
            <button
              onClick={() => {
                setStatus('idle');
                setUploads([]);
              }}
              className="mt-4 block w-full text-slate-500 hover:text-slate-700 font-medium text-sm"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 md:py-28 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/11427055/pexels-photo-11427055.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-slate-950 font-semibold text-sm tracking-widest uppercase">
            Get Started
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight">
            Schedule Your Free Quote
          </h2>
          <p className="mt-4 text-stone-800 text-lg max-w-xl mx-auto">
            Tell us about your project and we will get back to you within 24 hours
            to set up a free, no-obligation estimate.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          {status === 'error' && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold text-sm">
                  Could not submit your request
                </p>
                <p className="text-red-600 text-sm mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Smith"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-950"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="(253) 322-2128"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-950"
                  />
                </div>
              </div>
            </div>

            {/* Email + Preferred date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-950"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="preferred_date" className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="date"
                    id="preferred_date"
                    name="preferred_date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-950"
                  />
                </div>
              </div>
            </div>

            {/* Service type */}
            <div>
              <label htmlFor="service_type" className="block text-sm font-semibold text-slate-700 mb-2">
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                id="service_type"
                name="service_type"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-950 bg-white"
              >
                <option value="" disabled>
                  Select a service...
                </option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="project_description" className="block text-sm font-semibold text-slate-700 mb-2">
                Project Details
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-stone-400" />
                <textarea
                  id="project_description"
                  name="project_description"
                  rows={4}
                  placeholder="Tell us about your project — room size, what needs to be done, any specific concerns..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-950 resize-none"
                />
              </div>
            </div>

            {/* File upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Photos / Files <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
                }}
                className={`relative rounded-xl border-2 border-dashed transition-all px-4 py-6 ${
                  dragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-blue-400'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept={ACCEPTED_TYPES.join(',')}
                  onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ''; }}
                  className="sr-only"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center gap-2 cursor-pointer text-center"
                >
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Click to upload or drag &amp; drop
                  </span>
                  <span className="text-xs text-slate-500">
                    JPG, PNG, WEBP, GIF, or PDF · up to 10MB each · max 6 files
                  </span>
                </label>
              </div>

              {uploadError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> {uploadError}
                </p>
              )}

              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <li
                      key={`${f.name}-${i}`}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                    >
                      {f.type.startsWith('image/') ? (
                        <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{f.name}</p>
                        <p className="text-xs text-slate-500">
                          {(f.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-slate-400 hover:text-red-600 transition-colors flex-shrink-0"
                        aria-label={`Remove ${f.name}`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:bg-slate-300 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-4 rounded-xl text-lg transition-all hover:scale-[1.01] shadow-lg"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Request My Free Quote
                </>
              )}
            </button>

            <p className="text-center text-slate-500 text-sm">
              We respect your privacy. Your information is only used to contact you
              about your quote.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
