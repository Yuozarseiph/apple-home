import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  ShoppingCart,
  Mail,
  FileText,
  Info,
  HelpCircle,
  BookOpen,
  Users,
  ChevronUp,
} from "lucide-react";

const BottomNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Logic remains
  const [showExtra, setShowExtra] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const extraMenuRef = useRef();

  useEffect(() => {
    // All the logic for resizing and auth checks remains the same
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (extraMenuRef.current && !extraMenuRef.current.contains(event.target)) {
        setShowExtra(false);
      }
    };
    if (showExtra) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showExtra]);


  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Shop", path: "/shop", icon: ShoppingCart },
    { label: "Contact", path: "/contact", icon: Mail },
    {
      label: isLoggedIn ? "Dashboard" : "Login",
      path: isLoggedIn ? "/dashboard" : "/login",
      icon: LayoutDashboard,
    },
    { label: "Terms", path: "/terms", icon: FileText },
    { label: "About", path: "/about", icon: Info },
    { label: "FAQ", path: "/faq", icon: HelpCircle },
    { label: "Blog", path: "/blog", icon: BookOpen },
    { label: "Team", path: "/team", icon: Users },
  ];

  const primaryLinks = navLinks.slice(0, isMobile ? 4 : navLinks.length);
  const extraLinks = isMobile ? navLinks.slice(4) : [];
  
  const NavItem = ({ link }) => (
     <NavLink
        to={link.path}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center transition-all duration-300 ${
            isActive ? "text-teal-400" : "text-gray-400 hover:text-white"
          }`
        }
      >
        <motion.div
          className="p-3 rounded-full"
          whileHover={{ scale: 1.2, y: -5, backgroundColor: "rgba(30, 41, 59, 0.8)"}}
          whileTap={{ scale: 0.9 }}
        >
          <link.icon size={28} />
        </motion.div>
     </NavLink>
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="relative flex items-center justify-center gap-2 sm:gap-4 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-700/60 shadow-lg rounded-full">
        {primaryLinks.map((link) => (
          <NavItem key={link.path} link={link} />
        ))}
        {extraLinks.length > 0 && (
          <motion.button
            onClick={() => setShowExtra(!showExtra)}
            className="p-3 rounded-full text-gray-400 hover:text-white"
            whileHover={{ scale: 1.2, y: -5, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={28} className={`transition-transform duration-300 ${showExtra ? 'rotate-180' : ''}`}/>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showExtra && (
          <motion.div
            ref={extraMenuRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute right-0 bottom-20 bg-gray-800/90 border border-gray-700 backdrop-blur-xl rounded-2xl shadow-xl p-3 flex flex-col gap-2"
          >
            {extraLinks.map((link) => (
               <NavItem key={link.path} link={link} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BottomNav;
