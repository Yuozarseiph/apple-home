import React from "react";
import { motion } from "framer-motion";

function Terms() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.3, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      className="bg-image-iPhone min-h-screen py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className="max-w-4xl mx-auto text-center px-4">
        <motion.h1
          variants={itemVariants}
          custom={0}
          className="text-4xl font-bold mb-8 text-[#FFFFFF]"
        >
          Terms of Use
        </motion.h1>

        <div className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-8 rounded-xl shadow-lg text-left">
          <motion.p
            variants={itemVariants}
            custom={0.5}
            className="mb-8 text-lg text-white/90 max-w-3xl mx-auto text-center"
          >
            Welcome to Apple Home. These Terms of Use govern your access to and
            use of our website, services, and products.
          </motion.p>

          <motion.h3
            variants={itemVariants}
            custom={1}
            className="text-2xl font-semibold mb-4 text-[#7EC8E3]"
          >
            1. About This Agreement
          </motion.h3>
          <motion.p
            variants={itemVariants}
            custom={2}
            className="mb-6 text-[#FFFFFF]"
          >
            By using our website or purchasing any product from us, you agree to
            be bound by these Terms of Use. Please read them carefully before
            proceeding.
          </motion.p>

          <motion.h3
            variants={itemVariants}
            custom={3}
            className="text-2xl font-semibold mb-4 text-[#7EC8E3]"
          >
            2. Your Privacy Matters
          </motion.h3>
          <motion.p
            variants={itemVariants}
            custom={4}
            className="mb-6 text-[#FFFFFF]"
          >
            We take your privacy seriously. Our{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>{" "}
            explains how we collect, use, and protect your personal information.
            By using our services, you consent to those practices.
          </motion.p>

          <motion.h3
            variants={itemVariants}
            custom={5}
            className="text-2xl font-semibold mb-4 text-[#7EC8E3]"
          >
            3. How You Can Use Our Site
          </motion.h3>
          <motion.p
            variants={itemVariants}
            custom={6}
            className="mb-6 text-[#FFFFFF]"
          >
            You may use our website for personal, non-commercial purposes only.
            Any unauthorized use, including scraping, redistribution, or
            modification of content without permission is strictly prohibited.
          </motion.p>

          <motion.h3
            variants={itemVariants}
            custom={7}
            className="text-2xl font-semibold mb-4 text-[#7EC8E3]"
          >
            4. No Warranties. No Guarantees.
          </motion.h3>
          <motion.p
            variants={itemVariants}
            custom={8}
            className="mb-6 text-[#FFFFFF]"
          >
            The website and its content are provided “as is” and “as available,”
            without warranties of any kind, either express or implied. We do not
            guarantee continuous or secure access to the site.
          </motion.p>

          <motion.h3
            variants={itemVariants}
            custom={9}
            className="text-2xl font-semibold mb-4 text-[#7EC8E3]"
          >
            5. Questions?
          </motion.h3>
          <motion.p
            variants={itemVariants}
            custom={10}
            className="mb-4 text-[#FFFFFF]"
          >
            If you have any questions about these Terms of Use, feel free to
            reach out to us at{" "}
            <a href="mailto:support@applehome.com" className="underline">
              support@applehome.com
            </a>
            .
          </motion.p>
        </div>
      </section>
    </motion.div>
  );
}

export default Terms;
