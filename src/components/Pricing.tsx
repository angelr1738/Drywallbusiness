import { Check, ArrowRight, Zap, Star, Shield } from 'lucide-react';
import Reveal from '@/components/Reveal';

const tiers = [
  { name: 'Quick Fix', price: 'From $150', icon: Zap, desc: 'Patch it, match it.', items: ['Single-room patch or repair','Texture match','Same-week scheduling','Up to 5 holes or cracks'], popular: false },
  { name: 'Room Refresh', price: 'From $600', icon: Star, desc: 'One room, fully done.', items: ['Full single-room drywall work','Tape, mud, and finish','Your choice of texture','Ceiling included','Cleanup included'], popular: true },
  { name: 'Full Project', price: 'Custom Quote', icon: Shield, desc: 'Whole home or commercial.', items: ['Multi-room or full home','Level 5 finish available','Fire tape available','Water damage treatment','Project tracker access','Workmanship warranty'], popular: false },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Pricing</span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black text-slate-950">No Guessing. No Surprises.</h2>
          <p className="mt-4 text-slate-700 text-lg">Clear tiers, honest estimates, and a written quote before work begins.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <Reveal key={tier.name} direction="up" delay={i * 120}
                className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${tier.popular ? 'bg-slate-950 border-blue-500 shadow-2xl scale-[1.02]' : 'bg-white border-slate-200'}`}>
                {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full animate-pulse">MOST POPULAR</span>}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110 hover:rotate-3 ${tier.popular ? 'bg-blue-600' : 'bg-blue-50'}`}>
                  <Icon className={tier.popular ? 'text-white' : 'text-blue-600'} />
                </div>
                <h3 className={`mt-5 text-2xl font-black ${tier.popular ? 'text-white' : 'text-slate-950'}`}>{tier.name}</h3>
                <p className={tier.popular ? 'text-slate-400' : 'text-slate-700'}>{tier.desc}</p>
                <div className={`text-3xl font-black mt-4 ${tier.popular ? 'text-blue-300' : 'text-blue-600'}`}>{tier.price}</div>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.items.map(item => <li key={item} className={`flex gap-2 text-sm ${tier.popular ? 'text-slate-300' : 'text-slate-800'}`}><Check className="w-4 h-4 text-blue-500 flex-shrink-0" />{item}</li>)}
                </ul>
                <a href="#booking" className={`mt-8 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all hover:scale-[1.03] shine-on-hover ${tier.popular ? 'bg-blue-600 text-white' : 'bg-slate-950 text-white'}`}>Get Started <ArrowRight className="w-4 h-4" /></a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
