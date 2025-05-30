import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// Set base URL for axios requests
axios.defaults.baseURL = "http://127.0.0.1:5000";

// Animation variant for fade-in and move-up with optional delay
const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const Login = () => {
  const [email, setEmail] = useState("");       // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState("");       // State to show error messages
  const navigate = useNavigate();               

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submitting
    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token); // Save token
      navigate("/dashboard"); // Navigate to dashboard page
      window.location.reload(); // Reload page to refresh app state
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
      }}
    >
      <motion.div
        variants={fadeInUp(0)}
        className="position-relative backdrop-blur-md bg-black/30 shadow-lg p-10 rounded-2xl w-full max-w-md"
      >
        <motion.h2
          variants={fadeInUp(0.3)}
          className="text-4xl font-extrabold text-center text-[#7EC8E3] mb-8"
        >
          Welcome back
        </motion.h2>

        <motion.p
          variants={fadeInUp(0.35)}
          className="text-center text-gray-300 mb-8 text-lg"
        >
          Sign in to your Apple Home account to continue.
        </motion.p>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div variants={fadeInUp(0.4)}>
            <input
              type="email"
              placeholder="Apple ID or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 mb-4 rounded-full focus:outline-none shadow-lg shadow-[#ffffff23]  bg-[#4d4d4d2c] backdrop:blur-2xl text-white placeholder:text-[#A6C8E3]"
            />
          </motion.div>

          <motion.div variants={fadeInUp(0.5)}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 mb-4 rounded-full focus:outline-none shadow-lg shadow-[#ffffff23]  bg-[#4d4d4d2c] backdrop:blur-2xl text-white placeholder:text-[#A6C8E3]"
            />
          </motion.div>

          {error && (
            <motion.p
              variants={fadeInUp(0.6)}
              className="text-red-400 text-center mt-2 font-medium"
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp(0.7)}
            type="submit"
            className="w-full bg-[#ffffff2f] text-black px-5 py-4 rounded-full backdrop:blur-2xl hover:bg-[#ffffff9f] transition-colors"
          >
            Continue with Apple ID
          </motion.button>
        </form>

        <motion.div variants={fadeInUp(0.8)} className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don’t have an Apple ID?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#7EC8E3] hover:underline font-semibold transition"
            >
              Create one
            </button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
