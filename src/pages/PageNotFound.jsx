import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import CreativeButton from "../components/CreativeButton";

export default function PageNotFound() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center text-center p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      >
        <AlertTriangle className="w-24 h-24 text-teal-400 mx-auto" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mt-6 mb-4"
      >
        Page Not Found
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-lg text-gray-400 mb-8"
      >
        Sorry, the page you are looking for does not exist.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Link to="/">
          <CreativeButton text={"Go to Home"} />
        </Link>
      </motion.div>
    </div>
  );
}
