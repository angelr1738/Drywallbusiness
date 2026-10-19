import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1600, className = '' }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
