import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface AnimatedInfographicProps {
  data: DataPoint[];
  title?: string;
  height?: number;
  className?: string;
  maxValue?: number;
}

const AnimatedInfographic: React.FC<AnimatedInfographicProps> = ({
  data,
  title,
  height = 300,
  className = '',
  maxValue
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [highest, setHighest] = useState(0);

  useEffect(() => {
    const highestValue = maxValue || Math.max(...data.map(item => item.value));
    setHighest(highestValue);
    
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, data, controls, maxValue]);

  const variants = {
    hidden: { height: 0 },
    visible: (i: number) => ({
      height: `${(data[i].value / highest) * 100}%`,
      transition: {
        delay: i * 0.2,
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  return (
    <div ref={ref} className={`${className} p-4 rounded-xl bg-dark-300/30`}>
      {title && <h3 className="text-lg font-medium mb-4 text-white">{title}</h3>}
      
      <div className="flex justify-between items-end h-[300px] overflow-hidden">
        {data.map((item, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center justify-end h-full flex-1 mx-1"
          >
            <motion.div
              custom={i}
              variants={variants}
              initial="hidden"
              animate={controls}
              className="w-full rounded-t-md relative group"
              style={{ backgroundColor: item.color }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-300/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-sm whitespace-nowrap">
                {item.value}
              </div>
            </motion.div>
            <div className="text-xs text-surface-400 mt-2 text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedInfographic;