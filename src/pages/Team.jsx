// src/pages/Team.jsx
import React from "react";
import { motion } from "framer-motion";
import man from "../assets/man.svg";

const teamMembers = [
  {
    id: 1,
    name: "Yousof Shaker Ardakani",
    role: "Co-founder & Chief Experience Officer",
    description:
      "Yousof leads with vision and purpose — building experiences that bring people together through thoughtful design and intuitive technology.",
    imgSrc: man,
    alt: "Yousof Shaker Ardakani",
    rotate: 3,
    socials: {
      linkedin: "https://linkedin.com/in/yousofshaker",
      twitter: "https://twitter.com/yousofshaker",
    },
  }
];

function SocialIcon({ type, url }) {
  const icons = {
    linkedin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[#7EC8E3] hover:text-white transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5v5.5h-3v-10h3v1.25c.847-1.522 3-1.625 3 1.452v7.298z" />
      </svg>
    ),
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[#7EC8E3] hover:text-white transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482A13.944 13.944 0 011.671 3.15a4.916 4.916 0 001.523 6.563 4.9 4.9 0 01-2.224-.616v.06a4.918 4.918 0 003.941 4.827 4.904 4.904 0 01-2.217.084 4.92 4.92 0 004.588 3.417A9.867 9.867 0 010 19.54a13.936 13.936 0 007.548 2.209c9.056 0 14.009-7.507 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
      </svg>
    ),
  };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={type} className="mx-2">
      {icons[type]}
    </a>
  );
}

function Team() {
  return (
    <div className="bg-image-iPhone text-white min-h-screen py-20 flex justify-center items-center pb-[120px]">
      <section className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#7EC8E3]">
          Meet the Minds Behind Apple Home
        </h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto text-center text-white/90 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We’re a team of designers, engineers, and thinkers who believe great technology starts with empathy.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 justify-center">
          {teamMembers.map(({ id, name, role, description, imgSrc, alt, rotate, socials }, index) => (
            <motion.div
              key={id}
              className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl flex flex-col items-center"
              transition={{ duration: 0.8, type: "spring", stiffness: 50, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)", transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={imgSrc} alt={alt} className="rounded-full mb-4 w-32 h-32 object-cover" />
              <h3 className="text-2xl font-semibold mb-2 text-[#7EC8E3]">{name}</h3>
              <p className="mb-4 text-[#FFFFFF]">{role}</p>
              <p className="text-center text-white mb-4">{description}</p>
              <div className="flex">
                {Object.entries(socials).map(([type, url]) => (
                  <SocialIcon key={type} type={type} url={url} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Team;
