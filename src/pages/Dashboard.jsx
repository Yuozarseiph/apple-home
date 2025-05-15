import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variant for fade-in and slide-up effect with optional delay
const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

// Animation variant for staggering children animations
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const Dashboard = () => {
  // State to hold user data fetched from API
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Get authentication token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Redirect to login if token is not available
    if (!token) {
      navigate("/login");
      return;
    }

    // Async function to fetch user data from backend API
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in headers
          },
        });

        // Add slight delay before setting user data for better UX animation effect
        setTimeout(() => {
          setUserData(
            response.data || {
              name: "John Doe",
              email: "john@example.com",
            }
          );
        }, 800);
      } catch (error) {
        console.error("Error fetching user data:", error);

        // Handle unauthorized errors: clear token and redirect to login
        if (
          error.response?.status === 401 ||
          error.message.includes("jwt") ||
          error.message.includes("token")
        ) {
          localStorage.removeItem("token");
          navigate("/login");
          window.location.reload(); // Reload page to reset app state
        }
      }
    };

    fetchUserData();
  }, [navigate, token]);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to home page
    window.location.reload(); // Reload page to reset app state
  };

  // Show loading text while user data is being fetched
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-image-iPhone p-6 pt-20"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 }, // stagger all children animations
        },
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={fadeInUp(0)}
          className="flex justify-between items-center mb-6"
        >
          <motion.h1
            variants={fadeInUp(0)}
            className="text-3xl font-bold text-[#7ec8e3]"
          >
            Your Apple Home Dashboard
          </motion.h1>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 backdrop-blur-md bg-black/40 shadow-lg hover:bg-[#0000ff] text-white px-4 py-2 rounded-lg transition"
          >
            {/* Logout Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </motion.button>
        </motion.div>

        {/* User Greeting and Info Cards */}
        <motion.div
          variants={fadeInUp(0.2)}
          className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            Welcome, {userData.name}
          </h2>
          <p className="text-gray-300">
            Here’s what’s happening with your account today.
          </p>
        </motion.div>

        {/* User Name Card */}
        <motion.div
          variants={fadeInUp(0.3)}
          className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md flex items-center gap-4"
        >
          <div>
            <p className="text-sm text-gray-300">Your Name</p>
            <p className="font-semibold text-white">{userData.name}</p>
          </div>
        </motion.div>

        {/* User Email / Apple ID Card */}
        <motion.div
          variants={fadeInUp(0.4)}
          className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md flex items-center gap-4"
        >
          <div>
            <p className="text-sm text-gray-300">Apple ID</p>
            <p className="font-semibold text-white">{userData.email}</p>
          </div>
        </motion.div>

        {/* Active Devices Card */}
        <motion.div
          variants={fadeInUp(0.5)}
          className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md flex items-center gap-4"
        >
          <div>
            <p className="text-sm text-gray-300">Active Devices</p>
            <p className="font-semibold text-white">1 (Demo)</p>
          </div>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div
          variants={fadeInUp(0.6)}
          className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-bold text-[#7ec8e3] mb-4">
            Recent Activity
          </h2>
          <ul className="text-[#FFFFFF] space-y-2">
            <li className="mb-2">Signed in from a new device • 3 hours ago</li>
            <li className="mb-2">Account settings updated • 1 day ago</li>
            <li className="mb-2">Password changed • 2 days ago</li>
          </ul>
        </motion.div>

        {/* Placeholder for User Usage Graphs */}
        <motion.div
          variants={fadeInUp(0.7)}
          className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-bold text-[#7ec8e3] mb-4">Your Usage</h2>
          <p className="text-[#FFFFFF]">
            This section will show your usage stats and trends once available.
          </p>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div
          variants={fadeInUp(0.7)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
        >
          {/* Quick Actions Links */}
          <motion.div
            variants={fadeInUp(0.8)}
            className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-bold text-[#7ec8e3] mb-4">
              Quick Actions
            </h3>
            <ul className="text-[#FFFFFF] mt-4 space-y-2">
              <li>
                <Link to="/profile" className="hover:text-[#7ec8e3]">
                  Manage Your Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#7ec8e3]">
                  Check Order Status
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-[#7ec8e3]">
                  Privacy & Security Settings
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            variants={fadeInUp(0.9)}
            className="backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-bold text-[#7ec8e3] mb-4">
              Need Help?
            </h3>
            <ul className="text-[#FFFFFF] mt-4 space-y-2">
              <li>
                <Link to="/help" className="hover:text-[#7ec8e3]">
                  Visit Apple Home Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#7ec8e3]">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
