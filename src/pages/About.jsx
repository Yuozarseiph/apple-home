import React from "react";
import { motion } from "framer-motion";
import { Instagram, Github, Send, Users, Target, Rocket } from "lucide-react";

// Animation Variants
const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.8,
      delay,
    },
  },
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const SocialLink = ({ href, Icon }) => (
    <motion.a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-500 hover:text-[#00d5be] transition-colors"
        whileHover={{ scale: 1.2, y: -3}}
        whileTap={{ scale: 0.9 }}
    >
      <Icon size={28} />
    </motion.a>
);

export default function About() {
  const GREEN_COLOR = "#00d5be";

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        
        {/* --- Hero Section --- */}
        <motion.section 
          className="text-center mb-24 md:mb-32"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeIn("up")}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6"
          >
            A new standard in <span style={{color: GREEN_COLOR}}>connection</span>.
          </motion.h1>
          <motion.p 
            variants={fadeIn("up", 0.2)}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            We believe technology should feel like an extension of you. Intuitive, inspiring, and seamlessly integrated into your life.
          </motion.p>
        </motion.section>

        {/* --- Feature Section 1 --- */}
        <motion.section 
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
        >
          <motion.div variants={fadeIn("right")}>
            <div className="w-full h-80 bg-gray-900 rounded-2xl flex items-center justify-center border border-white/10">
              {/* Placeholder for a compelling image */}
                            <Target className="w-16 h-16 text-gray-700" />
            </div>
          </motion.div>
          <motion.div variants={fadeIn("left")}>
            <Target className="w-10 h-10 mb-4" style={{color: GREEN_COLOR}}/>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Purpose</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Technology should help you live better. We design products that simplify your daily routine and inspire creativity, not complicate it.
            </p>
          </motion.div>
        </motion.section>

        {/* --- Quote Section --- */}
        <motion.section 
            className="text-center my-24 md:my-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn("up")}
        >
          <Rocket className="w-12 h-12 mx-auto mb-6" style={{color: GREEN_COLOR}} />
          <h2 className="text-3xl md:text-4xl font-medium text-white italic max-w-4xl mx-auto leading-snug">
            "Innovation isn’t just about specs — it’s about how a product feels, how it fits into your life, and how it helps you do more of what you love."
          </h2>
        </motion.section>

        {/* --- Team Section (Suggested Addition) --- */}
        <motion.section
          className="mb-24 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
            <motion.div variants={fadeIn("up")} className="text-center">
                <Users className="w-10 h-10 mb-4 mx-auto" style={{color: GREEN_COLOR}} />
                <h2 className="text-3xl font-bold mb-4 text-white">Who We Are</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                 A team of designers and engineers who believe great technology starts with empathy.
                </p>
            </motion.div>
            {/* You can map over team members here */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Example Team Member */}
              <motion.div variants={fadeIn("up")} className="text-center">
                 <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 border-2" style={{borderColor: GREEN_COLOR}}></div>
                 <h4 className="font-semibold text-white">Alex Doe</h4>
                 <p className="text-sm text-gray-500">Lead Designer</p>
              </motion.div>
              {/* ... other team members */}
            </div>
        </motion.section>
        
        {/* --- Connect Section --- */}
        <motion.section 
            className="text-center bg-gray-900 py-16 rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
        >
          <motion.h3 variants={fadeIn("up")} className="text-3xl font-bold mb-4 text-white">Stay Connected</motion.h3>
          <motion.p variants={fadeIn("up")} className="mb-8 text-gray-400">
            Follow our journey and be the first to know about updates.
          </motion.p>
          <motion.div variants={fadeIn("up")} className="flex justify-center space-x-10">
            <SocialLink href="https://instagram.com" Icon={Instagram} />
            <SocialLink href="https://github.com" Icon={Github} />
            <SocialLink href="https://t.me" Icon={Send} />
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}