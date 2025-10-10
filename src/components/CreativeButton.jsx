import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CreativeButton({ text, type = "button", onSubmitBtn }) {
  const GREEN_COLOR = "#00d5be";
  const DARK_GREEN_TEXT = "#004d40"; // A very dark shade for contrast

  const backgroundVariants = {
    rest: { scale: 0 },
    hover: { scale: 1 },
  };

  const textVariants = {
    rest: { color: GREEN_COLOR },
    hover: { color: DARK_GREEN_TEXT },
  };

  const iconVariants = {
    rest: { x: 0, color: GREEN_COLOR },
    hover: { x: 5, color: DARK_GREEN_TEXT },
  };

  return (
    <motion.button
      type={type}
      onSubmit={onSubmitBtn}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className="
        relative w-52 h-14 rounded-xl font-bold
        bg-black
        border border-green-500
        overflow-hidden
        shadow-lg
        focus:outline-none focus:ring-4 focus:ring-green-300
        transition-colors duration-300
      "
      style={{ borderColor: GREEN_COLOR }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-green-400 via-teal-400 to-blue-500"
        style={{ borderRadius: "1rem" }}
        variants={backgroundVariants}
        transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
      >
        {/* Shimmer/gloss effect */}
        <motion.div
          className="w-full h-full"
          style={{
            backgroundSize: "400% 400%",
            backgroundImage: `radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.3), transparent 30%), 
            radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.25), transparent 30%)`,
          }}
          animate={{ backgroundPosition: ["150% 150%", "-50% -50%"] }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-2"
      >
        <motion.span variants={textVariants} transition={{ duration: 0.3 }} className="text-white">
          {text}
        </motion.span>
        <motion.div variants={iconVariants} transition={{ duration: 0.3 }}>
          <ArrowRight size={20} />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
