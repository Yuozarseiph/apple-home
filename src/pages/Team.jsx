// src/pages/Team.jsx

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import man from "../assets/man.svg"; // Assuming you have this asset

const teamMembers = [
    {
        id: 1,
        name: "Yousof Shaker Ardakani",
        role: "Co-founder & Chief Experience Officer",
        description: "Yousof leads with vision, building experiences that bring people together through thoughtful design and intuitive technology.",
        imgSrc: man,
        socials: {
            linkedin: "https://linkedin.com/in/yousofshaker",   
            twitter: "https://twitter.com/yousofshaker",   
        },
    },
    // Add more team members here
];

const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.2 }}};
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 }};
const GREEN_COLOR = "#00d5be";

const SocialLink = ({ Icon, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
        <motion.div 
            className="p-2 rounded-full bg-gray-800 border border-gray-700 text-gray-400"
            whileHover={{ scale: 1.1, color: GREEN_COLOR, borderColor: GREEN_COLOR, backgroundColor: `${GREEN_COLOR}22` }}
        >
            <Icon size={20} />
        </motion.div>
    </a>
);

export default function Team() {
  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-28 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-16">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tighter">Meet the Minds Behind the Magic</motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">We’re a team of designers and engineers who believe great technology starts with empathy.</motion.p>
        </motion.div>

        <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer} 
            className="grid md:grid-cols-2 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative group bg-gray-900 border border-white/10 rounded-2xl p-8 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 z-0 opacity-20" style={{ background: `radial-gradient(circle, ${GREEN_COLOR}33, transparent 60%)`}}/>
              <div className="relative z-10 flex flex-col items-center h-full">
                <div className="relative mb-6">
                    <img src={member.imgSrc} alt={member.name} className="rounded-full w-32 h-32 object-cover mx-auto" />
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#00d5be]"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 0 }} // Start slightly larger
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                </div>
                <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
                <p className="font-medium mb-4" style={{ color: GREEN_COLOR }}>{member.role}</p>
                <p className="text-gray-400 mb-6 flex-grow">{member.description}</p>
                <div className="flex space-x-4 mt-auto">
                    <SocialLink Icon={Linkedin} href={member.socials.linkedin} />
                    <SocialLink Icon={Twitter} href={member.socials.twitter} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}