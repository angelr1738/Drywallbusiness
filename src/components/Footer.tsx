import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';

const PHONE_HREF = 'tel:+12533222128';
const PHONE_NUMBER = '(253) 322-2128';

export default function Footer() {
  return (
    <footer className="bg-black text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-5"><AnimatedLogo size="md" /></div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Professional drywall installation, repair, and remodeling serving King County, Pierce County, and Tacoma since 2009.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Facebook"
                className="bg-slate-800 hover:bg-blue-600 p-2.5 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram"
                className="bg-slate-800 hover:bg-blue-600 p-2.5 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={PHONE_HREF} className="flex items-center gap-2.5 hover:text-blue-400 transition-colors group">
                <Phone className="w-4 h-4 text-blue-500" />{PHONE_NUMBER}
              </a></li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />Tacoma, WA 98418
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>Mon–Fri 7am–6pm<br />Sat 8am–2pm<br />Sun Closed</div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['#services', 'Services'],
                ['#textures', 'Texture Styles'],
                ['#pricing', 'Pricing'],
                ['#gallery', 'Before & After'],
                ['#about', 'Our Story'],
                ['#reviews', 'Reviews'],
                ['#map', 'Service Areas'],
                ['#booking', 'Book a Quote'],
                ['#progress', 'Track Project'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-blue-400 transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} E&M Drywall & Painting. All rights reserved.</p>
          <p>Licensed · Bonded · Insured</p>
        </div>
      </div>
    </footer>
  );
}
