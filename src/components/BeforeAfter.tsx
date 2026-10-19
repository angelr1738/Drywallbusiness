import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import BrandWatermark from '@/components/BrandWatermark';

interface Project {
  title: string;
  category: string;
  before: string;
  after: string;
}

const projects: Project[] = [
  {
    title: 'Living Room Patch Repair',
    category: 'Drywall Repair',
    before: 'https://images.pexels.com/photos/12326418/pexels-photo-12326418.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
    after: 'https://images.pexels.com/photos/6238683/pexels-photo-6238683.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
  },
  {
    title: 'Ceiling Water Damage',
    category: 'Water Damage Repair',
    before: 'https://images.pexels.com/photos/9617552/pexels-photo-9617552.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
    after: 'https://images.pexels.com/photos/8146330/pexels-photo-8146330.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
  },
  {
    title: 'Kitchen Remodel',
    category: 'Full Remodeling',
    before: 'https://images.pexels.com/photos/4756489/pexels-photo-4756489.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
    after: 'https://images.pexels.com/photos/7587827/pexels-photo-7587827.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
  },
  {
    title: 'Bedroom Popcorn Removal',
    category: 'Popcorn Ceiling Removal',
    before: 'https://images.pexels.com/photos/12469670/pexels-photo-12469670.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
    after: 'https://images.pexels.com/photos/39590350/pexels-photo-39590350.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
  },
  {
    title: 'New Addition — Level 5 Finish',
    category: 'New Installation',
    before: 'https://images.pexels.com/photos/3614763/pexels-photo-3614763.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
    after: 'https://images.pexels.com/photos/35430052/pexels-photo-35430052.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
  },
  {
    title: 'Bathroom Renovation',
    category: 'Full Remodeling',
    before: 'https://images.pexels.com/photos/7717787/pexels-photo-7717787.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
    after: 'https://images.pexels.com/photos/7546648/pexels-photo-7546648.jpeg?auto=compress&cs=tinysrgb&w=940&h=600',
  },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);
  const project = projects[active];

  const prev = () => setActive(p => (p - 1 + projects.length) % projects.length);
  const next = () => setActive(p => (p + 1) % projects.length);

  return (
    <section id="gallery" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <BrandWatermark className="z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="text-blue-400 font-semibold text-sm tracking-widest uppercase">Our Work</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-white tracking-tight">
              Before &<br />After
            </h2>
          </div>
          <a href="#booking"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 shine-on-hover self-start">
            Book Your Transformation <ArrowRight className="w-4 h-4" />
          </a>
        </Reveal>

        {/* Thumbnail strip */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
          {projects.map((p, i) => (
            <button key={p.title} onClick={() => setActive(i)}
              className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                i === active ? 'border-blue-500 scale-[1.04]' : 'border-transparent opacity-60 hover:opacity-90'
              }`}>
              <img src={p.after} alt={p.title} className="w-24 h-16 object-cover" />
            </button>
          ))}
        </div>

        {/* Main pair with key for re-animation */}
        <div key={active} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            { src: project.before, label: 'Before' },
            { src: project.after, label: 'After' },
          ].map(({ src, label }, idx) => (
            <div key={label}
              className="group relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              style={{ animation: `${idx === 0 ? 'fadeInLeft' : 'fadeInRight'} 0.6s ease-out` }}
              onClick={() => setLightbox({ src, label })}>
              <div className={`absolute top-4 left-4 z-10 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                label === 'Before' ? 'bg-black/80 text-white' : 'bg-blue-600 text-white'
              }`}>{label}</div>
              <Maximize2 className="absolute top-4 right-4 z-10 w-5 h-5 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src={src} alt={`${project.title} ${label}`}
                className="w-full h-64 sm:h-80 md:h-[28rem] object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Project info + nav */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div key={`info-${active}`} style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-blue-400 text-sm font-medium mt-1">{project.category}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all hover:scale-110 active:scale-95"
              aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-slate-200 text-sm tabular-nums">{active + 1} / {projects.length}</span>
            <button onClick={next}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all hover:scale-110 active:scale-95"
              aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
          onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white p-2 hover:scale-110 transition-transform" aria-label="Close">
            <X className="w-8 h-8" />
          </button>
          <span className={`absolute top-6 left-6 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full ${
            lightbox.label === 'Before' ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white'
          }`}>{lightbox.label}</span>
          <img src={lightbox.src} alt={lightbox.label}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            style={{ animation: 'scaleIn 0.4s ease-out' }}
            onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
