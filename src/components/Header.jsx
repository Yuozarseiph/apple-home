import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Navigation links list
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Contact", path: "/contact" },
  { label: "Terms", path: "/terms" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Blog", path: "/blog" },
  { label: "Team", path: "/team" },
];

// Animation variants for the mobile menu container
const menuVariants = {
  open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

// Animation variants for each menu item (staggered appearance)
const itemVariants = {
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
  closed: {
    opacity: 0,
    y: -20,
  },
};

const Header = () => {
  // State to toggle mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to check if user is logged in (based on localStorage token)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage on mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Toggle the mobile menu visibility
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="select-none header fixed z-50 backdrop-blur-md bg-black/10 shadow-lg text-white rounded-full w-full mx-auto mt-8">
      <nav className="flex items-center justify-between lg:justify-center px-6 py-4 rounded-full relative w-full">
        {/* Brand name visible only on mobile */}
        <h1 className="text-xl font-bold tracking-wider lg:hidden">Apple Home</h1>

        {/* Desktop navigation menu - horizontal centered list */}
        <ul className="hidden lg:flex flex-wrap justify-center gap-x-6 gap-y-2 w-full text-center items-center">
          {navLinks.map((link) => (
            <motion.li key={link.path} className="inline-block">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#000] font-bold transition duration-300 active-bg-glow"
                    : "hover:text-[#7EC8E3] transition duration-300 drop-shadow"
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
          {/* Auth links like Login/Register or Dashboard/Cart */}
          <AuthLinks isLoggedIn={isLoggedIn} />
        </ul>

        {/* Mobile hamburger menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-2xl text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {/* Hamburger icon toggles to close icon */}
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown with animation and glassmorphism */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed top-full bg-black/75 backdrop-blur left-0 right-0 mx-4 mt-2 border border-white/20 shadow-xl rounded-2xl overflow-hidden text-white z-40 pt-4 pb-6 px-6"
          >
            <ul className="space-y-4 text-center ">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  variants={itemVariants}
                  custom={index}
                  className="border-b border-black/10 pb-3"
                >
                  <NavLink
                    to={link.path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#000] font-bold transition duration-300 active-bg-glow"
                        : "hover:text-[#7EC8E3] transition duration-300 drop-shadow"
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}

              {/* Auth links for mobile menu */}
              <motion.li variants={itemVariants} custom={navLinks.length}>
                <AuthLinks
                  isLoggedIn={isLoggedIn}
                  mobile
                  onClick={toggleMenu}
                />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Component for authentication related links (Login/Register or Dashboard/Cart)
const AuthLinks = ({ isLoggedIn, mobile = false, onClick }) => {
  if (isLoggedIn) {
    return (
      <>
        <motion.li>
          <NavLink
            to="/dashboard"
            onClick={onClick}
            className={({ isActive }) =>
              isActive
                ? "text-[#000] font-bold transition duration-300 active-bg-glow"
                : "hover:text-[#7EC8E3] transition duration-300 drop-shadow"
            }
          >
            Dashboard
          </NavLink>
        </motion.li>

        <motion.li>
          <NavLink
            to="/cart"
            onClick={onClick}
            className={({ isActive }) =>
              isActive
                ? "text-[#000] font-bold transition duration-300 active-bg-glow"
                : "hover:text-[#7EC8E3] transition duration-300 drop-shadow"
            }
          >
            Cart
          </NavLink>
        </motion.li>
      </>
    );
  }

  return (
    <>
      <motion.li>
        <NavLink
          to="/login"
          onClick={onClick}
          className={({ isActive }) =>
            isActive
              ? "text-[#000] font-bold transition duration-300 active-bg-glow"
              : "hover:text-[#7EC8E3] transition duration-300 drop-shadow"
          }
        >
          Login
        </NavLink>
      </motion.li>
      <motion.li>
        <NavLink
          to="/register"
          onClick={onClick}
          className={({ isActive }) =>
            isActive
              ? "text-[#000] font-bold transition duration-300 active-bg-glow"
              : "hover:text-[#7EC8E3] transition duration-300 drop-shadow"
          }
        >
          Register
        </NavLink>
      </motion.li>
    </>
  );
};

export default Header;
