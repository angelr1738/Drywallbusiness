import logo from '@/assets/images/em-logo-transparent.png';

type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, { img: string; frame: string }> = {
  sm: { img: 'h-12 w-40', frame: 'rounded-md' },
  md: { img: 'h-16 w-40', frame: 'rounded-lg' },
  lg: { img: 'h-20 w-48', frame: 'rounded-xl' },
};

export default function AnimatedLogo({ size = 'sm' }: { size?: Size }) {
  const s = sizes[size];
  return (
    <img
      src={logo}
      alt="E&M Drywall and Painting"
      className={`relative ${s.img} object-contain mix-blend-normal brightness-100 contrast-100 scale-x-[1.35] ${s.frame} shadow-lg`}
    />
  );
}
