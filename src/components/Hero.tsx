import { Phone, Calendar, ChevronDown, Star, ArrowRight, Shield, Zap, MapPin } from 'lucide-react';
import logo from '@/assets/images/em-logo-transparent.png';
import AnimatedCounter from '@/components/AnimatedCounter';

const PHONE_HREF = 'tel:+12533222128';

const issues = [
  { emoji: '🕳️', label: 'Hole in Wall', href: '#booking' },
  { emoji: '💧', label: 'Water Damage', href: '#booking' },
  { emoji: '🏠', label: 'Full Remodel', href: '#booking' },
  { emoji: '🔊', label: 'Popcorn Ceiling', href: '#booking' },
  { emoji: '🎨', label: 'New Texture', href: '#booking' },
  { emoji: '⚡', label: 'Fire Damage', href: '#booking' },
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#2f6fa8]">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep radial glows */}
        <div className="absolute -top-32 -left-24 w-[36rem] h-[36rem] rounded-full bg-white/30 blur-[120px] hero-glow-a" />
        <div className="absolute top-1/3 -right-24 w-[34rem] h-[34rem] rounded-full bg-sky-300/30 blur-[120px] hero-glow-b" />
        <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] rounded-full bg-white/25 blur-[120px] hero-glow-c" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(30,64,120,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,120,0.4) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
          }}
        />
        {/* Top sheen */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/30 to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#245680] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        {/* Logo banner across the top, centered */}
        <div className="flex justify-center mb-8 animate-[fadeInUp_0.5s_ease-out]">
          <div className="relative w-full max-w-6xl aspect-[7/2] overflow-hidden">
            <img src={logo} alt="E&M Drywall and Painting" className="absolute inset-0 w-full h-full object-contain mix-blend-normal brightness-100 contrast-100 hero-logo-wide" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/40 border border-white/60 rounded-full px-4 py-2 mb-6 animate-[fadeInUp_0.55s_ease-out]">
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-pulse" />
              <span className="text-blue-950 text-sm font-medium">Licensed · Bonded · Insured · Based in Tacoma, WA</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.0] tracking-tighter animate-[fadeInUp_0.6s_ease-out] drop-shadow-sm">
              Walls That
              <br />
              <span className="animated-gradient-text">
                Wow.
              </span>
            </h1>

            <p className="mt-5 text-lg text-slate-800 max-w-lg leading-relaxed animate-[fadeInUp_0.7s_ease-out]">
              20 years of flawless finishes, fast turnarounds,
              and zero surprises on the invoice.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700 animate-[fadeInUp_0.75s_ease-out]">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>Serving <span className="text-slate-900 font-semibold">King County</span> &amp; <span className="text-slate-900 font-semibold">Pierce County</span></span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 animate-[fadeInUp_0.8s_ease-out]">
              <a href="#booking"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl text-base transition-all hover:scale-[1.04] hover:shadow-2xl hover:shadow-blue-900/30 shadow-xl shadow-blue-900/20 shine-on-hover">
                <Calendar className="w-5 h-5" />Book Free Quote
              </a>
              <a href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-white/60 hover:bg-white/80 border border-white/80 text-slate-900 font-semibold px-6 py-3.5 rounded-xl text-base transition-all hover:scale-[1.04]">
                <Phone className="w-5 h-5" />Call Now
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-4 animate-[fadeInUp_0.9s_ease-out]">
              {[
                { icon: Star, text: '5.0 · 80+ Reviews' },
                { icon: Shield, text: 'Fully Insured' },
                { icon: Zap, text: 'Same-Week Quotes' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white text-sm font-semibold hover:text-blue-100 transition-colors drop-shadow-sm">
                  <Icon className="w-4 h-4 text-blue-700" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — issue picker */}
          <div className="animate-[fadeInUp_1s_ease-out]">
            <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-4">
              What's your situation?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-3 stagger">
              {issues.map(issue => (
                <a key={issue.label} href={issue.href}
                  className="group flex items-center gap-3 bg-white/50 hover:bg-white/80 border border-white/70 hover:border-blue-700 rounded-2xl px-4 py-4 transition-all hover:scale-[1.04] hover:-translate-y-0.5">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{issue.emoji}</span>
                  <span className="text-slate-900 font-medium text-sm group-hover:text-blue-800 transition-colors leading-snug">
                    {issue.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-blue-700 transition-all group-hover:translate-x-1 ml-auto flex-shrink-0" />
                </a>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-white/50 border border-white/70 flex items-center gap-4 animate-float-slow">
              <div className="w-20 h-14 overflow-hidden flex-shrink-0">
                <img src={logo} alt="E&M logo" className="w-full h-full object-contain mix-blend-normal brightness-100 contrast-100 hero-logo-wide" />
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-blue-700 fill-blue-700" />
                  ))}
                </div>
                <p className="text-slate-900 text-sm font-medium mt-1">"Done right the first time."</p>
                <p className="text-white text-xs font-medium drop-shadow-sm">— 500+ satisfied clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar with animated counters */}
        <div className="mt-12 grid grid-cols-3 gap-4 animate-[fadeInUp_1.1s_ease-out]">
          {[
            { value: 20, suffix: '+', label: 'Years In Business' },
            { value: 500, suffix: '+', label: 'Projects Done' },
            { value: 100, suffix: '%', label: 'Satisfaction' },
          ].map(stat => (
            <div key={stat.label} className="text-center border-r border-slate-900/20 last:border-0 hover:scale-105 transition-transform">
              <div className="text-3xl lg:text-4xl font-black text-blue-800">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-white mt-1 uppercase tracking-wide font-semibold drop-shadow-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-blue-800 hover:text-blue-900 transition-colors animate-bounce"
        aria-label="Scroll down">
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}
