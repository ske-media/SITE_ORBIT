import React, { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start = 0,
  end,
  duration = 3,
  delay = 0.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = 'text-4xl font-bold text-neon-purple mb-3 text-shadow-neon'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <CountUp 
          start={start}
          end={end}
          duration={duration}
          delay={delay}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          enableScrollSpy={false}
        />
      ) : (
        <span>{prefix}{start}{suffix}</span>
      )}
    </div>
  );
};

export default AnimatedCounter;