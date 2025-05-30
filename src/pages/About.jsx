import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-image-iPhone text-white min-h-screen pt-24 pb-16 px-6">
      {/* Main section with title and intro paragraph */}
      <section className="position-relative backdrop-blur-md bg-black/10 shadow-lg max-w-5xl mx-auto text-center rounded-xl p-5">
        <motion.h1
          className="text-4xl font-bold mb-6 text-[#7EC8E3]"
          initial={{ opacity: 0 }} // Start with transparent
          animate={{ opacity: 1 }} // Fade in
          transition={{ duration: 1 }} // 1 second duration
        >
          About Apple Home
        </motion.h1>
        <motion.p
          className="text-lg mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }} // Start transparent
          animate={{ opacity: 1 }} // Fade in
          transition={{ duration: 1, delay: 0.2 }} // Delay for subtle effect
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
          initial={{ opacity: 0 }} // Start transparent
          animate={{ opacity: 1 }} // Fade in
          transition={{ duration: 1, delay: 0.4 }} // Slight delay for layering effect
        >
          Our Purpose
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} // Start transparent
          animate={{ opacity: 1 }} // Fade in
          transition={{ duration: 1, delay: 0.6 }} // Delay for smooth reveal
        >
          Technology should help you live better — not get in the way. At Apple
          Home, we design products that simplify your daily routine, inspire
          creativity, and keep you connected to what matters most.
        </motion.p>
      </section>

      {/* Two-column grid describing "Who We Are" and "What Drives Us" */}
      <section className="mt-12 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* "Who We Are" card with fade and upward slide animation */}
        <motion.div
          className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl"
          initial={{ opacity: 0, y: 50 }} // Start transparent and shifted down
          animate={{ opacity: 1, y: 0 }} // Fade in and move up to place
          transition={{ duration: 1, delay: 0.8 }} // Delay for staggered effect
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

        {/* "What Drives Us" card with similar animation, slightly delayed */}
        <motion.div
          className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl"
          initial={{ opacity: 0, y: 50 }} // Start transparent and shifted down
          animate={{ opacity: 1, y: 0 }} // Fade in and move up
          transition={{ duration: 1, delay: 1 }} // Slightly later delay for stagger
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
    </div>
  );
}
