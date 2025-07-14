// src/components/LoadingSpinner.tsx
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.div
      className='relative flex aspect-square items-center justify-center'
      initial={{ rotate: 0 }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.div
        className='absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 dark:bg-slate-600'
        style={{
          transformOrigin: '50% 50%',
        }}
      />
    </motion.div>
  );
}
