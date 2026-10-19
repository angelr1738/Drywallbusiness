import { MapPin, CheckCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import BrandWatermark from '@/components/BrandWatermark';

const areas = ['Tacoma', 'Seattle', 'Federal Way', 'Kent', 'Auburn', 'Puyallup', 'Lakewood', 'Gig Harbor', 'Renton', 'Bellevue', 'King County', 'Pierce County'];

export default function ServiceAreaMap() {
  return (
    <section id="map" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <BrandWatermark className="z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal direction="left">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Service Area</span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black text-white">We Come to You</h2>
          <p className="mt-4 text-slate-200 text-lg leading-relaxed">E&M serves King County, Pierce County, and Tacoma from our home base at Tacoma, WA 98418. Not sure if we cover your address? Call us and we will check.</p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            {areas.map((area, i) => (
              <div key={area} className="flex items-center gap-2 text-slate-300 text-sm hover:text-blue-300 transition-colors hover:translate-x-1 transition-transform" style={{ animation: `fadeInUp 0.4s ease-out ${i * 50}ms backwards` }}>
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />{area}
              </div>
            ))}
          </div>
          <a href="#booking" className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 shine-on-hover"><MapPin className="w-5 h-5" />Check My Area</a>
        </Reveal>
        <Reveal direction="right">
          <div className="relative h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
            <img
              src="/service-area-map.webp"
              alt="Map of E&M Drywall service area covering King County and Pierce County, Washington"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay legend */}
            <div className="absolute left-3 bottom-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-xs text-white pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                <span className="font-semibold">Tacoma HQ</span>
              </div>
              <div className="text-slate-300 mt-1">King County &amp; Pierce County</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
