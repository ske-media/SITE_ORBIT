import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: Step[];
  className?: string;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps, className = '' }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + i * 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <div ref={ref} className={`${className} relative`}>
      {/* Vertical timeline line */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
        <motion.div 
          variants={lineVariants}
          initial="hidden"
          animate={controls}
          className="h-full w-full bg-neon-purple/30 origin-top"
        />
      </div>

      {/* Steps */}
      <div className="relative z-10">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Icon */}
            <motion.div
              custom={index}
              variants={iconVariants}
              initial="hidden"
              animate={controls}
              className="relative z-10 rounded-full p-3 bg-neon-purple/20 text-neon-purple border border-neon-purple"
            >
              {step.icon}
            </motion.div>

            {/* Content */}
            <motion.div
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              className={`flex-1 bg-dark-300/30 p-6 rounded-xl border border-neon-purple/20 ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}
            >
              <h3 className="text-lg font-bold mb-2 text-neon-purple">{step.title}</h3>
              <p className="text-surface-300">{step.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;