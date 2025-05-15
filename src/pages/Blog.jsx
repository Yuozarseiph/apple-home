import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="bg-image-iPhone text-white min-h-screen py-20 pt-30">
      {/* Container for the blog content */}
      <section className="container mx-auto px-6">
        {/* Animated main heading */}
        <motion.h1
          className="text-4xl font-bold mb-12 text-center text-[#7EC8E3]"
          initial={{ opacity: 0 }} // Start hidden
          animate={{ opacity: 1 }} // Fade in
          transition={{ duration: 1 }} // Duration 1 second
        >
          Discover the Experience
        </motion.h1>

        {/* Grid container for blog cards */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* First Card */}
          <motion.div
            className="backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }} // Start faded and shifted down
            animate={{ opacity: 1, y: 0 }} // Animate to visible and in place
            transition={{ duration: 1, delay: 0.2 }} // Slight delay for staggered effect
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
              Designing for Connection
            </h3>
            <p className="mb-6 text-white">
              How thoughtful design brings people closer — and makes every
              interaction feel more natural, more human.
            </p>
            {/* Link to the detailed blog post */}
            <Link
              to="/blog/designing-for-connection"
              className="text-[#7EC8E3] hover:underline"
            >
              Read more
            </Link>
          </motion.div>

          {/* Second Card */}
          <motion.div
            className="backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
              Strength Through Simplicity
            </h3>
            <p className="mb-6 text-white">
              The most powerful experiences are often the simplest. Here’s how
              we build products that empower without overwhelming.
            </p>
            <Link
              to="/blog/strength-through-simplicity"
              className="text-[#7EC8E3] hover:underline"
            >
              Read more
            </Link>
          </motion.div>

          {/* Third Card */}
          <motion.div
            className="backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
              The Future of Everyday Tech
            </h3>
            <p className="mb-6 text-white">
              Technology should evolve with you. We explore how smart,
              sustainable design is shaping the home of tomorrow — today.
            </p>
            <Link
              to="/blog/the-future-of-everyday-tech"
              className="text-[#7EC8E3] hover:underline"
            >
              Read more
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
