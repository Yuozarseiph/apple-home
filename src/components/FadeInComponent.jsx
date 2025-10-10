import React from "react";
import { motion } from "framer-motion";

const FadeInComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="p-8 bg-gray-800 rounded-lg text-gray-200 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-teal-400 mb-2">
        Welcome to Dark Mode
      </h2>
      <p>This content fades in with a dark theme applied.</p>
    </motion.div>
  );
};

export default FadeInComponent;
