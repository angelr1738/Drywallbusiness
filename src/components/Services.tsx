import { Wrench, Layers, Paintbrush, Droplets, Building2, Sparkles, ArrowRight, Brush, Home } from 'lucide-react';
import Reveal from '@/components/Reveal';

const services = [
  { icon: Layers, title: 'New Drywall Installation', tag: 'Most Popular', description: 'Full hang-and-finish for new construction, additions, or gut renovations.', color: 'blue' },
  { icon: Wrench, title: 'Patch & Repair', tag: 'Quick Turnaround', description: 'Holes, dings, and cracks vanish. We match texture and paint seamlessly.', color: 'slate' },
  { icon: Droplets, title: 'Water Damage', tag: 'Emergency Ready', description: 'Remove damaged board, treat for mold, replace, and finish — fully restored.', color: 'blue' },
  { icon: Brush, title: 'Interior Painting', tag: 'Fresh & Clean', description: 'Walls, ceilings, and trim painted smooth and even — colors that last.', color: 'slate' },
  { icon: Home, title: 'Exterior Painting', tag: 'Curb Appeal', description: 'Weatherproof coatings that protect siding and trim while looking sharp.', color: 'blue' },
  { icon: Paintbrush, title: 'Texture Finishing', tag: 'Any Style', description: 'Orange peel, knockdown, skip trowel, smooth — we do them all perfectly.', color: 'slate' },
  { icon: Building2, title: 'Full Remodeling', tag: 'Design to Done', description: 'From framing to level-5 finish — complete drywall scope management.', color: 'blue' },
  { icon: Sparkles, title: 'Popcorn Removal', tag: 'Instant Upgrade', description: 'Out with the old, in with a sleek smooth ceiling you will love.', color: 'slate' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <div>
            <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">What We Do</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Every Wall.<br />Every Problem.
            </h2>
          </div>
          <a href="#booking"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg self-start md:self-auto shine-on-hover">
            Get a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} direction="up" delay={i * 80}
                className="group relative bg-slate-50 hover:bg-slate-950 border border-slate-200 hover:border-blue-500 rounded-2xl p-7 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-2xl">
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 group-hover:bg-blue-600 rounded-xl p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-300 bg-blue-50 group-hover:bg-blue-900/40 px-2.5 py-1 rounded-full transition-colors">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors">{s.title}</h3>
                  <p className="mt-2 text-slate-800 group-hover:text-slate-300 text-sm leading-relaxed transition-colors">{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
