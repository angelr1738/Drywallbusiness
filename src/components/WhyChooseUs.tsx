import { ArrowRight, Sparkles, Star, Users, Clock, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute -top-20 left-1/4 w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
          {/* Left — headline */}
          <Reveal direction="left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-300">A different kind of crew</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Don't hire us because we said so.
              <br />
              <span className="text-slate-500">Hire us because of how it feels.</span>
            </h2>
          </Reveal>

          {/* Right — story */}
          <Reveal direction="right">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/15 via-white/[0.03] to-transparent p-8 md:p-10 border border-white/10 overflow-hidden">
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                Run your hand along the wall — your fingers never stumble. No ridge, no bump, no seam. Just one unbroken sweep, and something in your chest goes <span className="text-blue-400 font-bold">"oh."</span>
              </p>
              <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
                We show up at 8:00 sharp. Plastic down, shoes off, floors protected. Quiet, clean, on schedule — you don't manage us, you just watch it happen.
              </p>
              <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
                No surprise line items, no upsells. The number on the quote is the number on the invoice — every time.
              </p>
            </div>
          </Reveal>
        </div>


        {/* Social proof bar */}
        <Reveal direction="up" className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-6 border-y border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
                ))}
              </div>
              <span className="text-white font-bold text-sm">5.0</span>
              <span className="text-slate-300 text-xs">· 80+ neighbors</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-bold text-sm">500+</span>
              <span className="text-slate-300 text-xs">homes served</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-white font-bold text-sm">20 years</span>
              <span className="text-slate-300 text-xs">family-owned</span>
            </div>
          </div>
        </Reveal>

        {/* Scarcity + CTA */}
        <Reveal direction="up" className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-amber-300 text-sm font-semibold">
              Only 3 quote slots left this week
            </span>
          </div>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-5">
            We cap bookings at 8 new projects a week. Once they're gone, the next opening is usually 3 weeks out.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.04] hover:shadow-2xl hover:shadow-blue-500/40 shine-on-hover"
            >
              Claim a Slot <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#reviews"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.04]"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Read 80+ Reviews
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
