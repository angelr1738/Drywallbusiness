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
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-brand-950 via-[#0b1c52] to-[#0a1640]">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep radial glows */}
        <div className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full bg-brand-500/30 blur-[140px] hero-glow-a" />
        <div className="absolute top-1/3 -right-24 w-[36rem] h-[36rem] rounded-full bg-sky-400/20 blur-[140px] hero-glow-b" />
        <div className="absolute -bottom-40 left-1/3 w-[34rem] h-[34rem] rounded-full bg-brand-400/20 blur-[140px] hero-glow-c" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08] bg-grid-faint"
          style={{
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
          }}
        />
        {/* Top sheen */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        {/* Logo banner across the top, centered */}
        <div className="flex justify-center mb-8 animate-[fadeInUp_0.5s_ease-out]">
          <div className="relative w-full max-w-6xl aspect-[7/2] overflow-hidden">
            <img src={logo} alt="E&M Drywall and Painting" className="absolute inset-0 w-full h-full object-contain brightness-0 invert hero-logo-wide" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 animate-[fadeInUp_0.55s_ease-out]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 text-sm font-medium">Licensed · Bonded · Insured · Based in Tacoma, WA</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[0.98] tracking-tight animate-[fadeInUp_0.6s_ease-out]">
              Walls That
              <br />
              <span className="animated-gradient-text">
                Wow.
              </span>
            </h1>

            <p className="mt-5 text-lg text-slate-300 max-w-lg leading-relaxed animate-[fadeInUp_0.7s_ease-out]">
              20 years of flawless finishes, fast turnarounds,
              and zero surprises on the invoice.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300 animate-[fadeInUp_0.75s_ease-out]">
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>Serving <span className="text-white font-semibold">King County</span> &amp; <span className="text-white font-semibold">Pierce County</span></span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 animate-[fadeInUp_0.8s_ease-out]">
              <a href="#booking"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3.5 rounded-xl text-base transition-all hover:scale-[1.04] hover:shadow-glow-lg shadow-glow shine-on-hover">
                <Calendar className="w-5 h-5" />Book Free Quote
              </a>
              <a href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-all hover:scale-[1.04]">
                <Phone className="w-5 h-5" />Call Now
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-5 animate-[fadeInUp_0.9s_ease-out]">
              {[
                { icon: Star, text: '5.0 · 80+ Reviews' },
                { icon: Shield, text: 'Fully Insured' },
                { icon: Zap, text: 'Same-Week Quotes' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white text-sm font-semibold hover:text-brand-200 transition-colors">
                  <Icon className="w-4 h-4 text-brand-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — issue picker */}
          <div className="animate-[fadeInUp_1s_ease-out]">
            <p className="text-slate-300 text-sm font-semibold uppercase tracking-widest mb-4">
              What's your situation?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-3 stagger">
              {issues.map(issue => (
                <a key={issue.label} href={issue.href}
                  className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-brand-400/60 rounded-2xl px-4 py-4 transition-all hover:scale-[1.04] hover:-translate-y-0.5">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{issue.emoji}</span>
                  <span className="text-white font-medium text-sm group-hover:text-brand-200 transition-colors leading-snug">
                    {issue.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-300 transition-all group-hover:translate-x-1 ml-auto flex-shrink-0" />
                </a>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-4 animate-float-slow">
              <div className="w-20 h-14 overflow-hidden flex-shrink-0">
                <img src={logo} alt="E&M logo" className="w-full h-full object-contain brightness-0 invert hero-logo-wide" />
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-400 fill-brand-400" />
                  ))}
                </div>
                <p className="text-white text-sm font-medium mt-1">"Done right the first time."</p>
                <p className="text-slate-400 text-xs font-medium">— 500+ satisfied clients</p>
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
            <div key={stat.label} className="text-center border-r border-white/10 last:border-0 hover:scale-105 transition-transform">
              <div className="text-3xl lg:text-4xl font-extrabold font-display text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-300 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down">
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}
