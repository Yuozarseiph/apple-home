import React from "react";
import { motion } from "framer-motion";
import { Instagram, Github, Send } from "lucide-react";

// Framer Motion variants can be defined here or imported
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
  ];

  const SocialLink = ({ href, children }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-teal-400 transition-colors"
    >
        {children}
    </motion.a>
  );

  return (
    <motion.footer
      className="select-none bg-gray-900 text-gray-300 py-12 px-6"
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={itemVariant} className="flex flex-col">
          <h3 className="text-2xl font-bold mb-4 text-white">Apple Home</h3>
          <p className="mb-5 text-sm leading-relaxed text-gray-400">
            Our mission is to bring you the best products with the best design and quality.
          </p>
          <div className="flex space-x-5 mt-auto">
            <SocialLink href="https://instagram.com"><Instagram /></SocialLink>
            <SocialLink href="https://github.com"><Github /></SocialLink>
            <SocialLink href="https://t.me"><Send /></SocialLink>
          </div>
        </motion.div>

        <motion.div variants={itemVariant}>
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-3 mt-4">
            {quickLinks.map((link) => (
              <motion.li key={link.label} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <a href={link.href} className="text-sm hover:text-teal-400 transition-colors">
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariant}>
          <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
          <p className="text-sm mb-5 text-gray-400">
            Subscribe to our newsletter for the latest updates.
          </p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            />
            <motion.button
              className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition-colors font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariant} className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Apple Home. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
