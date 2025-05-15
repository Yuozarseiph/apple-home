import React from "react";
import { motion } from "framer-motion";
import { hoverTapVariant } from "../utils/motionVariants";

export default function Contact() {
  return (
    <div className="bg-image-iPhone text-white min-h-screen flex flex-col items-center justify-center p-6">
      {/* Page title */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-[#7EC8E3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Let’s talk.
      </motion.h1>

      {/* Contact form container */}
      <motion.form
        className="backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Introductory text */}
        <motion.p
          className=" text-lg text-center mb-8 text-white/80 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Got a question or need support? We’re here to help. Reach out and
          we’ll get back to you soon.
        </motion.p>

        {/* Label for name input */}
        <motion.label
          htmlFor="name"
          className="block text-lg mb-2 text-[#7EC8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Your Name
        </motion.label>
        {/* Name input field */}
        <motion.input
          type="text"
          id="name"
          className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          placeholder="Enter your name"
        />

        {/* Label for email input */}
        <motion.label
          htmlFor="email"
          className="block text-lg mb-2 text-[#7EC8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Your Email Address
        </motion.label>
        {/* Email input field */}
        <motion.input
          type="email"
          id="email"
          className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          placeholder="Enter your email"
        />

        {/* Label for message textarea */}
        <motion.label
          htmlFor="message"
          className="block text-lg mb-2 text-[#7EC8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          What’s on your mind?
        </motion.label>
        {/* Message textarea */}
        <motion.textarea
          id="message"
          rows="4"
          className="resize-none w-full p-3 mb-4 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          placeholder="Your message"
        ></motion.textarea>

        {/* Submit button */}
        <motion.button
          type="submit"
          className="w-full bg-[#7EC8E3] text-black px-5 py-2 rounded-md hover:bg-[#6ab5c7] transition-colors"
          variants={hoverTapVariant}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Send Message
        </motion.button>

        {/* Alternative contact email */}
        <motion.p
          className="text-sm text-center mt-6 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Or reach us at{" "}
          <a href="mailto:support@applehome.com" className="underline">
            support@applehome.com
          </a>
        </motion.p>
      </motion.form>
    </div>
  );
}
