export type KnowledgeEntry = {
  keywords: string[];
  response: string;
  action?: { label: string; href: string };
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'quote', 'estimate', 'rate', 'charge', 'fee', 'afford'],
    response: "We have three pricing tiers:\n\n• Quick Fix — from $150 (patches, repairs, texture match)\n• Room Refresh — from $600 (full single-room drywall, tape, mud, finish, ceiling)\n• Full Project — custom quote (whole home or commercial, Level 5, fire tape, warranty)\n\nEvery project gets a free written quote before any work starts. Would you like to book one?",
    action: { label: 'Get a Free Quote', href: '#booking' },
  },
  {
    keywords: ['service', 'services', 'what do you do', 'offer', 'help with', 'work'],
    response: "We offer six core services:\n\n1. New Drywall Installation — full hang-and-finish for new construction or additions\n2. Patch & Repair — holes, dings, cracks, texture matching\n3. Water Damage — remove damaged board, mold treatment, replace, finish\n4. Texture Finishing — orange peel, knockdown, skip trowel, smooth\n5. Full Remodeling — framing to Level 5 finish\n6. Popcorn Ceiling Removal — transform dated ceilings to sleek modern ones\n\nWhat kind of project are you thinking about?",
    action: { label: 'See Services', href: '#services' },
  },
  {
    keywords: ['texture', 'orange peel', 'knockdown', 'popcorn', 'smooth', 'level 5', 'fire tape', 'finish'],
    response: "We offer five texture styles:\n\n• Orange Peel — light, subtle, hides imperfections\n• Knockdown — flattened texture with depth and character\n• Popcorn Removal — remove dated texture for a clean ceiling\n• Smooth / Level 5 — premium flat, polished finish\n• Fire Tape — code-compliant protection for garages and shared walls\n\nYou can browse samples and book the one you want.",
    action: { label: 'Browse Textures', href: '#textures' },
  },
  {
    keywords: ['area', 'areas', 'where', 'location', 'serve', 'service area', 'travel', 'come to', 'cover', 'near', 'nearby'],
    response: "We serve King County and Pierce County from our Tacoma HQ (98418), including:\n\nTacoma, Seattle, Federal Way, Kent, Auburn, Puyallup, Lakewood, Gig Harbor, Renton, and Bellevue.\n\nNot sure if we cover your address? Give us a call and we'll check!",
    action: { label: 'Check My Area', href: '#map' },
  },
  {
    keywords: ['book', 'booking', 'schedule', 'appointment', 'consultation', 'visit', 'come out'],
    response: "Booking a free quote takes under 2 minutes! Just pick your issue, enter your details, and pick a preferred date. You'll get a confirmation code to track your project.\n\nWe confirm all bookings within 24 hours.",
    action: { label: 'Book Now', href: '#booking' },
  },
  {
    keywords: ['track', 'progress', 'status', 'project tracker', 'confirmation code', 'where is', 'my project'],
    response: "You can track your project two ways:\n\n1. Quick Check — enter your 6-character confirmation code to see your project status\n2. Create an account — sign up to see your full project history\n\nOur process has 6 stages: Quote Requested, Quote Confirmed, Materials Prepped, Work In Progress, Final Inspection, and Project Complete.",
    action: { label: 'Track My Project', href: '#progress' },
  },
  {
    keywords: ['phone', 'call', 'number', 'contact', 'reach', 'email', 'get in touch'],
    response: "Here's how to reach us:\n\nPhone: (253) 322-2128\nLocation: Tacoma, WA 98418\nHours: Mon–Fri 7am–6pm, Sat 8am–2pm, Sun Closed\n\nYou can also book online anytime!",
    action: { label: 'Call Now', href: 'tel:+12533222128' },
  },
  {
    keywords: ['hours', 'open', 'closed', 'available', 'when do you', 'weekend', 'sunday'],
    response: "Our hours are:\n\nMonday–Friday: 7am – 6pm\nSaturday: 8am – 2pm\nSunday: Closed\n\nBut you can book online 24/7 and we'll get back to you within 24 hours!",
    action: { label: 'Book Online', href: '#booking' },
  },
  {
    keywords: ['water', 'leak', 'damage', 'mold', 'wet', 'flood', 'stain', 'ceiling damage', 'emergency'],
    response: "Water damage? We've got you covered. We remove damaged board, treat for mold, replace, and finish — fully restored.\n\nThis is one of our emergency-ready services. Call us right away at (253) 322-2128, or book online and we'll prioritize it.",
    action: { label: 'Call Now', href: 'tel:+12533222128' },
  },
  {
    keywords: ['hole', 'crack', 'ding', 'broken', 'punch', 'damaged wall', 'repair', 'fix', 'patch'],
    response: "Holes, cracks, and dings are our Quick Fix specialty — starting at $150! We patch, match the texture, and make it disappear.\n\nSame-week scheduling is available. Want to book a repair?",
    action: { label: 'Book a Repair', href: '#booking' },
  },
  {
    keywords: ['remodel', 'renovation', 'gut', 'gut renovation', 'addition', 'new construction', 'build'],
    response: "For remodels and new construction, we handle the full drywall scope — from framing to Level 5 finish. This is our Full Project tier with a custom quote.\n\nWe manage everything: hang, tape, mud, texture, fire tape, and cleanup. Would you like a free estimate?",
    action: { label: 'Get a Custom Quote', href: '#booking' },
  },
  {
    keywords: ['popcorn', 'ceiling', 'remove popcorn', 'acoustic', 'cottage cheese'],
    response: "Popcorn ceiling removal is one of our most popular services! We scrape the old texture, repair any imperfections, and apply a clean modern finish.\n\nIt's an instant upgrade that transforms any room. Ready to get started?",
    action: { label: 'Book Popcorn Removal', href: '#booking' },
  },
  {
    keywords: ['review', 'reviews', 'rating', 'testimonial', 'recommend', 'reputation', 'stars'],
    response: "We're proud of our 5.0-star rating with 80+ verified reviews and a 100% recommendation rate!\n\nCustomers consistently say we're clean, punctual, and do it right the first time. Check out what they've said on our reviews page.",
    action: { label: 'Read Reviews', href: '#reviews' },
  },
  {
    keywords: ['before', 'after', 'gallery', 'photos', 'pictures', 'portfolio', 'examples', 'work samples'],
    response: "Our Before & After gallery shows real projects: patch repairs, water damage restoration, kitchen remodels, popcorn removal, Level 5 finishes, and more.\n\nTake a look at the transformation!",
    action: { label: 'View Gallery', href: '#gallery' },
  },
  {
    keywords: ['licensed', 'insured', 'bonded', 'insurance', 'license', 'credentials', 'certified', 'legit', 'qualified'],
    response: "Yes! E&M Drywall & Painting is fully licensed, bonded, and insured. We've been serving King County and Pierce County for 20+ years with a 12-person professional crew.\n\nZero risk to you — we stand behind every project with a workmanship warranty.",
  },
  {
    keywords: ['about', 'who', 'company', 'business', 'story', 'history', 'founded', 'experience', 'how long'],
    response: "E&M Drywall & Painting was founded in 2006 by Erik & Marcus with one truck and one goal: do it right.\n\nToday we're a 12-person crew serving King County, Pierce County, and Tacoma — still family-owned, with 500+ completed projects and a 5-star reputation.",
    action: { label: 'Read Our Story', href: '#about' },
  },
  {
    keywords: ['warranty', 'guarantee', 'stand behind', 'satisfaction'],
    response: "Every Full Project comes with a workmanship warranty. We treat your home like it's our own — if something isn't right, we'll make it right.\n\nYour satisfaction is 100% guaranteed.",
  },
  {
    keywords: ['fire', 'fire tape', 'firecode', 'garage', 'shared wall', 'code', 'fire rated'],
    response: "Fire taping is code-compliant protection for garages, shared walls, and commercial builds. We include this on Full Project tiers.\n\nNeed fire-rated drywall work? We can handle it.",
    action: { label: 'Get a Quote', href: '#booking' },
  },
  {
    keywords: ['hi', 'hello', 'hey', 'yo', 'sup', 'greetings', 'good morning', 'good afternoon'],
    response: "Hello! Welcome to E&M Drywall & Painting. I can help you with services, pricing, booking, service areas, and more. What can I do for you?",
  },
  {
    keywords: ['thanks', 'thank you', 'appreciate', 'great', 'awesome', 'cool', 'nice', 'perfect'],
    response: "You're welcome! Is there anything else I can help you with? You can also call us at (253) 322-2128 or book a free quote online.",
    action: { label: 'Book a Quote', href: '#booking' },
  },
];

export const quickPrompts = [
  'How much does it cost?',
  'Do you serve my area?',
  'Book a free quote',
  'What services do you offer?',
  'I have water damage',
  'What are your hours?',
];

export function findAnswer(query: string): { response: string; action?: { label: string; href: string } } {
  const normalized = query.toLowerCase().trim();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        const score = keyword.length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = entry;
        }
      }
    }
  }

  if (bestMatch) {
    return { response: bestMatch.response, action: bestMatch.action };
  }

  return {
    response: "I'm not quite sure about that one, but I'd love to help! Try asking about our services, pricing, service areas, booking, or call us at (253) 322-2128. You can also browse the site using the quick links below.",
    action: { label: 'Book a Free Quote', href: '#booking' },
  };
}
