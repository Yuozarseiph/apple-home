import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/bg-all.webp";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const valuesData = [
  {
    title: "Designed for You",
    desc: "Every lesson is crafted to help you grow stronger — together, and at your own pace.",
  },
  {
    title: "Thoughtfully Made",
    desc: "Gentle on the body, powerful in results. Because fitness should feel good.",
  },
  {
    title: "Built to Last",
    desc: "High-quality programs that adapt with you, from the first step to the final stretch.",
  },
];

export default function LandingPage() {
  const scrollToValues = () => {
    const el = document.getElementById("values");
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="bg-image-iPhone select-none bg-black text-white min-h-screen font-sans"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
    >
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center min-h-screen text-center px-4"
        
      >
        <motion.h1 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold mb-4">
          Welcome to Apple Home.
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-md lg:text-lg xl:text-xl mb-6 max-w-2xl"
        >
          A new way to build strength, together. Designed with care, built for
          connection.
        </motion.p>
        <motion.button
          onClick={scrollToValues}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          variants={fadeInUp}
          className="bg-[#7EC8E3] glow-button text-black px-6 py-3 rounded-full transition transform hover:scale-105 cursor-pointer"
        >
          Learn More
        </motion.button>
      </section>

      {/* Our Values */}
      <motion.section
        id="values"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-6 text-center"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-10">
          Our Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {valuesData.map(({ title, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl transition hover:scale-105"
              >
                <h3 className="text-2xl font-semibold text-[#7EC8E3] mb-2">
                  {title}
                </h3>
                <p className="text-white">{desc}</p>
              </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Follow Us */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 text-center text-white"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
          Stay in the Loop
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          Be the first to know about new features, updates, and how others are
          using Apple Home.
        </motion.p>
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 0 50px #fff",
          }}
          whileTap={{ scale: 0.95 }}
          variants={fadeInUp}
          transition={{ duration: 0.2 }}
          className="bg-black text-white px-6 py-3 rounded-full transition cursor-pointer"
        >
          Follow Me
        </motion.a>
      </motion.section>
    </motion.div>
  );
}
