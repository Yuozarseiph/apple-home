import { motion } from "framer-motion";
import instagram from "../assets/instagram.svg";
import github from "../assets/github.svg";
import telegram from "../assets/telegram.svg";

// Import animation variants (یا می‌تونی خودت تعریف کنی)
import {
  containerVariant,
  itemVariant,
  hoverTapVariant,
  socialIconVariant,
} from "../utils/motionVariants";

export default function About() {
  return (
    <div className="bg-image-iPhone text-white min-h-screen pt-24 pb-[120px] px-6">
      {/* Main section with title and intro paragraph */}
      <section className="position-relative backdrop-blur-md bg-black/10 shadow-lg max-w-5xl mx-auto text-center rounded-xl p-5">
        <motion.h1
          className="text-4xl font-bold mb-6 text-[#7EC8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Apple Home
        </motion.h1>
        <motion.p
          className="text-lg mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A new kind of experience. Designed for connection. Built with care.
          Apple Home is where technology meets life — and every detail has a
          purpose.
        </motion.p>
      </section>

      {/* Section describing the company's purpose */}
      <section className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-8 rounded-xl max-w-4xl mx-auto mt-4">
        <motion.h2
          className="text-2xl font-semibold mb-4 text-[#7EC8E3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Our Purpose
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Technology should help you live better — not get in the way. At Apple
          Home, we design products that simplify your daily routine, inspire
          creativity, and keep you connected to what matters most.
        </motion.p>
      </section>

      {/* Two-column grid describing "Who We Are" and "What Drives Us" */}
      <section className="mt-12 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <motion.div
          className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-[#7EC8E3]">
            Who We Are
          </h3>
          <p className="text-white">
            We’re a team of designers, engineers, and thinkers who believe great
            technology starts with empathy. Every product we create begins with
            one question: How can this make life better?
          </p>
        </motion.div>

        <motion.div
          className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-[#7EC8E3]">
            What Drives Us
          </h3>
          <p className="text-white">
            We believe innovation isn’t just about speed or specs — it’s about
            how a product feels in your hands, how it fits into your life, and
            how it helps you do more of what you love.
          </p>
        </motion.div>
      </section>

      {/* Branding and Social Icons (From Footer) */}
      <motion.section
        className="position-relative backdrop-blur-md bg-black/10 shadow-lg max-w-5xl mx-auto mt-12 p-8 rounded-xl text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        <motion.h3
          className="text-2xl font-bold mb-4 text-[#7EC8E3]"
          variants={itemVariant}
        >
          Apple Home
        </motion.h3>
        <motion.p className="mb-5 text-sm leading-relaxed text-gray-300" variants={itemVariant}>
          Our mission is to bring couples closer together through meaningful and empowering gymnastics lessons.
        </motion.p>

        <motion.div className="flex justify-center space-x-5" variants={itemVariant}>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariant}
            custom={10}
            whileHover="hover"
            whileTap="tap"
          >
            <img src={instagram} alt="Instagram" className="w-7 h-7" />
          </motion.a>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariant}
            custom={-10}
            whileHover="hover"
            whileTap="tap"
          >
            <img src={github} alt="GitHub" className="w-7 h-7" />
          </motion.a>

          <motion.a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariant}
            custom={15}
            whileHover="hover"
            whileTap="tap"
          >
            <img src={telegram} alt="Telegram" className="w-7 h-7" />
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="position-relative backdrop-blur-md bg-black/10 shadow-lg max-w-5xl mx-auto mt-12 p-8 rounded-xl text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        <motion.h4 className="text-lg font-semibold mb-5 text-[#7EC8E3]" variants={itemVariant}>
          Newsletter
        </motion.h4>
        <motion.p className="text-sm mb-5 text-gray-300" variants={itemVariant}>
          Subscribe to our newsletter to get the latest updates and offers.
        </motion.p>

        <div className="flex justify-center space-x-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-1 rounded-full border-none shadow-lg shadow-[#ffffff38] bg-[#7474741e] backdrop:blur-2xl text-white input-shadow"
          />
          <motion.button
            className="bg-[#ffffff81] text-black px-5 py-2 rounded-full hover:bg-[#6ab5c7] transition-colors"
            variants={hoverTapVariant}
            whileHover="hover"
            whileTap="tap"
          >
            Subscribe
          </motion.button>
        </div>
      </motion.section>

      {/* Copyright and Developer Credit */}
      <motion.section
        className="mt-10 text-center text-sm text-[#7EC8E3]"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        <motion.div variants={itemVariant}>
          &copy; {new Date().getFullYear()} Apple Home. All rights reserved.
        </motion.div>

        <motion.div variants={itemVariant} className="mt-4">
          Created by{" "}
          <a
            href="https://yuozarseiph.top"
            className="hover:text-[#7EC8E3] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yousef Shaker Ardakani
          </a>
          . All rights reserved.
        </motion.div>
      </motion.section>
    </div>
  );
}
