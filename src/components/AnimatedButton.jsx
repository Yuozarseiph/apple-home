import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-[#7EC8E3] text-black px-6 py-2 rounded-lg"
    >
      Hover Me!
    </motion.button>
  );
};

export default AnimatedButton;
