import logo from '@/assets/images/IMG_2058.jpg';

type BrandWatermarkProps = {
  className?: string;
};

export default function BrandWatermark({ className = '' }: BrandWatermarkProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <img
        src={logo}
        alt=""
        className="brand-watermark absolute left-1/2 top-1/2 w-[min(100vw,900px)] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
