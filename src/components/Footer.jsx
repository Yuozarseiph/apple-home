import React from "react";
import { motion } from "framer-motion";
import instagram from "../assets/instagram.svg";
import github from "../assets/github.svg";
import telegram from "../assets/telegram.svg";

// Import animation variants
import {
  containerVariant,
  itemVariant,
  hoverTapVariant,
  socialIconVariant,
  linkVariant
} from "../utils/motionVariants";

const Footer = () => {
  // Array of navigation links
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Team", href: "/team" },
  ];

  return (
    <motion.footer
      className="select-none bg-[#050A30] text-white py-12 px-6"
      variants={containerVariant}       // Animate child items with stagger
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}         // Trigger animation once on scroll
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8">
        
        {/* Branding and social icons */}
        <motion.div variants={itemVariant} className="flex-1 min-w-[250px]">
          <h3 className="text-2xl font-bold mb-4">Apple Home</h3>
          <p className="mb-5 text-sm leading-relaxed text-gray-300">
            Our mission is to bring couples closer together through meaningful and empowering gymnastics lessons.
          </p>

          {/* Social Media Icons with rotation animation */}
          <div className="flex space-x-5">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialIconVariant}
              custom={10}                 // Custom rotation direction
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
          </div>
        </motion.div>

        {/* Quick Navigation Links */}
        <motion.div variants={itemVariant} className="flex-1 min-w-[200px]">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-3 mt-1">
            {quickLinks.map((link, idx) => (
              <motion.li
                key={idx}
                variants={linkVariant}
                whileHover="hover"
                whileTap="tap"
              >
                <a
                  href={link.href}
                  className="text-sm hover:text-[#7EC8E3] p-3 footer-drop-shadow transition-colors duration-300"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter Subscription Box */}
        <motion.div variants={itemVariant} className="flex-1 min-w-[250px]">
          <h4 className="text-lg font-semibold mb-5">Newsletter</h4>
          <p className="text-sm mb-5 text-gray-300">
            Subscribe to our newsletter to get the latest updates and offers.
          </p>

          {/* Input and Button with animations */}
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-1 rounded-full border-none text-black input-shadow"
            />
            <motion.button
              className="bg-[#7EC8E3] text-black px-5 py-2 rounded-full hover:bg-[#6ab5c7] transition-colors"
              variants={hoverTapVariant}
              whileHover="hover"
              whileTap="tap"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Footer Copyright */}
      <motion.div
        variants={itemVariant}
        className="mt-10 text-center text-sm text-[#7EC8E3]"
      >
        &copy; {new Date().getFullYear()} Apple Home. All rights reserved.
      </motion.div>

      {/* Developer Credit */}
      <motion.div
        variants={itemVariant}
        className="mt-4 text-center text-sm text-[#7EC8E3]"
      >
        Created by{" "}
        <a
          href="https://yuozarseiph.top"
          className="hover:text-[#7EC8E3] transition-colors"
        >
          Yousef Shaker Ardakani
        </a>
        . All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
