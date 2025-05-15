import React from "react";
import { motion } from "framer-motion";

const FadeInComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h2>Welcome to Smart Rendezvous</h2>
      <p>This content fades in when it enters the DOM.</p>
    </motion.div>
  );
};

export default FadeInComponent;
