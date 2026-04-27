import React from 'react';
import { motion } from 'framer-motion';

const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Blob 1 */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] will-change-transform"
      />
      
      {/* Blob 2 */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[90%] md:w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px] will-change-transform"
      />

      {/* Blob 3 - Solo per desktop */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="hidden md:block absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-cyan-600/10 rounded-full blur-[100px] will-change-transform"
      />
    </div>
  );
};

export default BackgroundBlobs;
