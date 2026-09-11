import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface FireParticlesProps {
  active: boolean;
}

export const FireParticles: React.FC<FireParticlesProps> = ({ active }) => {
  // 5 lightweight particle trajectories
  const particles = [
    { id: 1, x: -24, y: -65, scale: 0.8, rotate: -15, delay: 0 },
    { id: 2, x: -8, y: -90, scale: 1.2, rotate: 10, delay: 0.04 },
    { id: 3, x: 14, y: -80, scale: 1.0, rotate: -8, delay: 0.02 },
    { id: 4, x: 28, y: -60, scale: 0.75, rotate: 20, delay: 0.05 },
    { id: 5, x: 0, y: -105, scale: 1.1, rotate: 0, delay: 0.06 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
      <AnimatePresence>
        {active &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
              animate={{
                opacity: [1, 0.9, 0],
                x: p.x,
                y: p.y,
                scale: [0.4, p.scale, p.scale * 0.7],
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.75,
                delay: p.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute text-xl select-none"
            >
              🔥
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
