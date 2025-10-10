import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// انیمیشن‌ها رو برای خوانایی بیشتر بیرون تعریف می‌کنیم
const buttonVariants = {
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: "0px 10px 20px -5px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

const iconVariants = {
  hover: {
    x: 4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const AnimatedButtonV2 = () => {
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="
        flex items-center justify-center gap-2 
        px-6 py-3 rounded-lg font-bold text-white
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        shadow-md
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      "
    >
      <span>شروع کنید</span>
      <motion.div variants={iconVariants}>
        <ArrowRight size={20} />
      </motion.div>
    </motion.button>
  );
};

export default AnimatedButtonV2;