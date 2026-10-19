import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import BrandWatermark from '@/components/BrandWatermark';

const textures = [
  ['Orange Peel','Light, subtle texture that hides small imperfections.','https://images.pexels.com/photos/17204376/pexels-photo-17204376.jpeg?auto=compress&cs=tinysrgb&w=600&h=600'],
  ['Knockdown','A softly flattened texture with depth and character.','https://images.pexels.com/photos/11254953/pexels-photo-11254953.jpeg?auto=compress&cs=tinysrgb&w=600&h=600'],
  ['Popcorn Removal','Remove the dated texture and reveal a clean, modern ceiling.','https://images.pexels.com/photos/33634506/pexels-photo-33634506.jpeg?auto=compress&cs=tinysrgb&w=600&h=600'],
  ['Smooth / Level 5','Our premium finish: flat, polished, and ready for dramatic light.','https://images.pexels.com/photos/38240995/pexels-photo-38240995.jpeg?auto=compress&cs=tinysrgb&w=600&h=600'],
  ['Fire Tape','Code-compliant protection for garages, shared walls, and commercial builds.','https://images.pexels.com/photos/5493663/pexels-photo-5493663.jpeg?auto=compress&cs=tinysrgb&w=600&h=600'],
];

export default function TextureShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (amount: number) => ref.current?.scrollBy({ left: amount, behavior: 'smooth' });

  return (
    <section id="textures" className="relative py-20 bg-slate-950 overflow-hidden">
      <BrandWatermark className="z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Finish Styles</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-white">Pick Your Texture</h2>
            <p className="mt-3 text-slate-200">Browse the finishes our crew is known for.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => move(-340)} className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all hover:scale-110 active:scale-95"><ChevronLeft /></button>
            <button onClick={() => move(340)} className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all hover:scale-110 active:scale-95"><ChevronRight /></button>
          </div>
        </Reveal>
        <div ref={ref} className="flex gap-5 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {textures.map(([name, description, image]) => (
            <a href="#booking" key={name} className="group flex-shrink-0 w-72 snap-start rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="h-48 overflow-hidden relative">
                <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5 bg-slate-900 group-hover:bg-slate-800 transition-colors">
                <h3 className="text-white font-bold text-lg">{name}</h3>
                <p className="mt-2 text-slate-200 text-sm leading-relaxed">{description}</p>
                <div className="mt-4 text-blue-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">Book this finish →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
