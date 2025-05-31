import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "./IconImports";
import upIcon from "../assets/Icons/Header/apple-up-menu.svg";

const BottomNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 768);
  const extraMenuRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        extraMenuRef.current &&
        !extraMenuRef.current.contains(event.target)
      ) {
        setShowExtra(false);
      }
    };

    if (showExtra) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showExtra]);

  const navLinks = [
    { label: "Home", path: "/", icon: icons.homeIc },
    {
      label: isLoggedIn ? "Dashboard" : "Login",
      path: isLoggedIn ? "/dashboard" : "/login",
      icon: icons.dashboardIc,
    },
    { label: "Shop", path: "/shop", icon: icons.shopIc },
    { label: "Contact", path: "/contact", icon: icons.contactIc },
    { label: "Terms", path: "/terms", icon: icons.termsIc },
    { label: "About", path: "/about", icon: icons.aboutIc },
    { label: "FAQ", path: "/faq", icon: icons.faqIc },
    { label: "Blog", path: "/blog", icon: icons.blogIc },
    { label: "Team", path: "/team", icon: icons.teamIc },
  ];

  const primaryLinks = navLinks.slice(0, isMobile ? 4 : navLinks.length);
  const extraLinks = isMobile ? navLinks.slice(4) : [];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[98%] sm:w-[95%] md:w-[fit-content] max-w-5xl px-9 py-1 bg-white/50 backdrop-blur-xl border border-white/30 shadow-lg rounded-full"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-hidden">
        {primaryLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-1 py-1 font-bold rounded-xl transition-all duration-300 hover:scale-110 ${
                isActive ? "text-[#1c274c] text-shadow-white text-shadow-lg/100 scale-110" : "text-white"
              }`
            }
          >
            <img
              src={link.icon}
              alt={link.label}
              className={`${isTablet ? "w-7 h-7" : "w-7 h-7"} sm:w-7 sm:h-7`}
            />
            <span className="text-[0.8rem] sm:text-sm font-semibold mt-1">
              {link.label}
            </span>
          </NavLink>
        ))}

        {extraLinks.length > 0 && (
          <button
            onClick={() => setShowExtra(!showExtra)}
            className="flex flex-col items-center justify-center px-1 py-1 text-white hover:scale-110 transition-all text-xl"
          >
            <img src={upIcon} alt="Up Icon Menu" className="w-7 h-7" />
            <span className="text-[0.8rem] sm:text-sm mt-1">More</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {showExtra && (
          <motion.div
            ref={extraMenuRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 20 }}
            className={`absolute ${
              isMobile
                ? "right-3 bottom-20"
                : "left-1/2 -translate-x-1/2 bottom-20"
            } bg-white/50 backdrop-blur-xl rounded-2xl shadow-xl p-3 flex flex-col gap-2 max-h-[60vh] overflow-hidden`}
          >
            {extraLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-1 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive ? "text-[#1c274c] text-shadow-white text-shadow-lg/100" : "text-white"
                  }`
                }
              >
                <img src={link.icon} alt={link.label} className="w-7 h-7" />
                <span className="text-sm font-medium">{link.label}</span>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BottomNav;
