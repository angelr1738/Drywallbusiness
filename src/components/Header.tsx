import { useState } from 'react';
import { Phone, Menu, X, Search, User, LogOut, Calendar } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import { useAuth } from '@/context/AuthContext';

const PHONE_NUMBER = '(253) 322-2128';
const PHONE_HREF = 'tel:+12533222128';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Book', href: '#booking' },
];

const searchables = [
  { label: 'Drywall Installation', href: '#services' },
  { label: 'Drywall Repair', href: '#services' },
  { label: 'Water Damage', href: '#services' },
  { label: 'Popcorn Removal', href: '#services' },
  { label: 'Level 5 Smooth Finish', href: '#textures' },
  { label: 'Orange Peel Texture', href: '#textures' },
  { label: 'Knockdown Texture', href: '#textures' },
  { label: 'Fire Tape', href: '#textures' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Book a Quote', href: '#booking' },
  { label: 'Track My Project', href: '#progress' },
  { label: 'Before & After Gallery', href: '#gallery' },
  { label: 'King & Pierce Counties', href: '#map' },
  { label: 'Reviews', href: '#reviews' },
];

type HeaderProps = { onTrackProject: () => void };

export default function Header({ onTrackProject }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user, signOut } = useAuth();

  const results = query.length > 1
    ? searchables.filter(s => s.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-brand-950/70 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <a href="#top" className="flex-shrink-0">
            <AnimatedLogo size="sm" />
          </a>

          {/* Search */}
          <div className="relative flex-1 max-w-sm hidden md:block">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-brand-400 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 flex-shrink-0 text-white/60" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                placeholder="Search services, textures..."
                className={`bg-transparent text-sm outline-none w-full placeholder-white/50 focus:placeholder-white/70 text-white`}
              />
            </div>
            {searchOpen && results.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                {results.map(r => (
                  <a key={r.label} href={r.href} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    {r.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="relative font-medium text-sm transition-colors group text-slate-200 hover:text-brand-300">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-brand-400" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={onTrackProject}
                  className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors shadow-glow">
                  <User className="w-4 h-4" />My Project
                </button>
                <button onClick={() => signOut()}
                  className="p-2 rounded-lg transition-colors text-white/70 hover:text-red-300"
                  aria-label="Sign out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={onTrackProject}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors border border-white/25 text-slate-200 hover:border-brand-300 hover:text-brand-200">
                <User className="w-4 h-4" />Track Project
              </button>
            )}
            <a href="#booking"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 shine-on-hover">
              <Calendar className="w-4 h-4" />Book
            </a>
            <a href={PHONE_HREF}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 text-sm shine-on-hover">
              <Phone className="w-4 h-4" />{PHONE_NUMBER}
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-brand-950 border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          {/* Mobile search */}
          <div className="relative mb-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-white/50" />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search..." className="bg-transparent text-white text-sm outline-none w-full placeholder-white/40" />
            </div>
            {query.length > 1 && results.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                {results.map(r => (
                  <a key={r.label} href={r.href} onClick={() => { setMenuOpen(false); setQuery(''); }}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50">
                    {r.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block text-slate-200 hover:text-brand-300 font-medium py-2.5 border-b border-white/10">
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button onClick={() => { setMenuOpen(false); onTrackProject(); }}
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-medium py-2.5 rounded-xl">
              <User className="w-4 h-4" />{user ? 'My Project' : 'Track Project'}
            </button>
            <a href="#booking" onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-2.5 rounded-xl">
              <Calendar className="w-4 h-4" />Book a Quote
            </a>
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-xl">
              <Phone className="w-4 h-4" />{PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
