import React from "react";
import { motion } from "framer-motion";

const AnimatedFormContainer = ({ title, intro, children, onSubmit }) => {
  const GREEN_COLOR = "#00d5be";

  // Variants for the main container's entrance and staggering children
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren", // Ensure container animates in before children
        staggerChildren: 0.15, // Stagger delay for each child
      },
    },
  };

  // Variants for each child element (title, intro, form)
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-lg rounded-2xl p-8 md:p-12 shadow-2xl bg-black overflow-hidden"
      >
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${GREEN_COLOR}22, transparent 60%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.h1
            variants={childVariants}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-base md:text-lg text-center mb-8 text-gray-400"
          >
            {intro}
          </motion.p>
          
          {/* Decorative Accent Line */}
          <motion.div variants={childVariants} className="w-16 h-1 mx-auto mb-8 rounded-full" style={{backgroundColor: GREEN_COLOR}} />

          <motion.form
            variants={childVariants}
            onSubmit={onSubmit}
            autoComplete="off"
          >
            {children}
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedFormContainer;