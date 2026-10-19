import { type ReactNode, type ElementType } from 'react';
import { useInView } from '@/hooks/useInView';

type Direction = 'up' | 'left' | 'right' | 'scale' | 'fade';

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  as?: ElementType;
  className?: string;
};

const directionClass: Record<Direction, string> = {
  up: 'reveal-up',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  fade: '',
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  as: Tag = 'div',
  className = '',
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass[direction]} ${inView ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
