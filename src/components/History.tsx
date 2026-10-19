import { Award, Users, Shield, Heart, Clock, Star } from 'lucide-react';
import Reveal from '@/components/Reveal';
import AnimatedCounter from '@/components/AnimatedCounter';

const milestones = [
  { year: '2006', title: 'Founded', description: 'Erik & Marcus started with one truck and one goal: do it right.' },
  { year: '2011', title: 'Growing Fast', description: 'Expanded to a full crew. First commercial contracts.' },
  { year: '2017', title: 'Top Rated', description: 'Earned 5-star status with 400+ completed projects.' },
  { year: '2024', title: 'Still Family-Owned', description: '12-person team. Same values. King & Pierce Counties served.' },
];

const values = [
  { icon: Award, title: 'Quality', description: 'Every seam, every corner, every finish to the highest standard.' },
  { icon: Shield, title: 'Licensed & Insured', description: 'Fully licensed, bonded, and insured. Zero risk to you.' },
  { icon: Heart, title: 'Honest Pricing', description: 'Written quotes. No surprises. You approve before we start.' },
  { icon: Users, title: 'Respectful Crew', description: 'Clean, punctual, and courteous — your home is treated with care.' },
  { icon: Clock, title: 'On Time', description: 'We show up when we say we will, every time.' },
  { icon: Star, title: '5-Star Rated', description: '80+ Google reviews and counting. Reputation matters to us.' },
];

export default function History() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <Reveal direction="left">
            <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Our Story</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
              20 Years.<br />One Standard.
            </h2>
            <p className="mt-5 text-lg text-slate-800 leading-relaxed">
              Erik and Marcus built E&M Drywall on a simple principle: treat every home like it's your own,
              never cut corners, and be the contractor you'd hire for your own house.
            </p>
            <p className="mt-4 text-lg text-slate-800 leading-relaxed">
              Today we're a 12-person crew serving King County, Pierce County, and Tacoma — still family-owned, still holding to that
              same standard. That's why customers keep coming back — and recommending us.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="bg-slate-50 rounded-xl px-5 py-3 border border-slate-200 text-center hover:scale-105 hover:border-blue-300 transition-all">
                <div className="text-2xl font-black text-blue-600"><AnimatedCounter value={20} suffix="+" /></div>
                <div className="text-xs text-slate-900 mt-0.5">Years</div>
              </div>
              <div className="bg-slate-50 rounded-xl px-5 py-3 border border-slate-200 text-center hover:scale-105 hover:border-blue-300 transition-all">
                <div className="text-2xl font-black text-blue-600"><AnimatedCounter value={500} suffix="+" /></div>
                <div className="text-xs text-slate-900 mt-0.5">Projects</div>
              </div>
              <div className="bg-slate-50 rounded-xl px-5 py-3 border border-slate-200 text-center hover:scale-105 hover:border-blue-300 transition-all">
                <div className="text-2xl font-black text-blue-600"><AnimatedCounter value={12} /></div>
                <div className="text-xs text-slate-900 mt-0.5">Team Members</div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="relative group">
              <img
                src="https://images.pexels.com/photos/8470036/pexels-photo-8470036.jpeg?auto=compress&cs=tinysrgb&w=940&h=700"
                alt="E&M Drywall team at work"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute -bottom-5 -right-5 bg-blue-600 rounded-2xl px-6 py-4 shadow-xl hidden sm:block hover:scale-105 transition-transform">
                <div className="text-3xl font-black text-white">Licensed</div>
                <div className="text-blue-200 text-sm font-medium">Bonded · Insured</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal direction="up" className="mb-20">
          <h3 className="text-2xl font-black text-slate-950 text-center mb-10">Our Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-slate-100" />
            {milestones.map((m, i) => (
              <Reveal key={m.year} direction="up" delay={i * 120} className="relative text-center group">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center mx-auto mb-3 relative z-10 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-transform">{m.year}</div>
                <h4 className="font-black text-slate-950">{m.title}</h4>
                <p className="text-slate-700 text-sm mt-1 leading-relaxed">{m.description}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Values */}
        <Reveal direction="up">
          <h3 className="text-2xl font-black text-slate-950 text-center mb-10">What We Stand For</h3>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} direction="up" delay={i * 80}
                className="group bg-slate-50 hover:bg-slate-950 rounded-2xl p-6 border border-slate-200 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="bg-blue-100 group-hover:bg-blue-600 rounded-xl p-3 w-fit mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-black text-slate-950 group-hover:text-white transition-colors">{v.title}</h4>
                <p className="text-slate-700 group-hover:text-slate-400 text-sm mt-2 leading-relaxed transition-colors">{v.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
