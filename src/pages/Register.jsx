import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// Set base URL for axios requests
axios.defaults.baseURL = "http://127.0.0.1:5000"; // Change this to your backend URL

// Animation variant for fade in and move up effect with delay option
const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const Register = () => {
  // Form field states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic password confirmation validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        fullName,
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard
      navigate("/dashboard");
      // Reload page to refresh app state (optional)
      window.location.reload();
    } catch (err) {
      // Handle possible errors
      if (err.response) {
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else {
        setError("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4 w-full"
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
          className="text-3xl font-bold text-center text-[#7EC8E3] mb-3"
        >
          Create your Apple ID
        </motion.h2>

        <motion.p
          variants={fadeInUp(0.35)}
          className="text-center text-gray-300 mb-6 text-sm"
        >
          Enjoy seamless access to all Apple services with one account.
        </motion.p>

        <form onSubmit={handleRegister} className="space-y-5">
          <motion.div variants={fadeInUp(0.4)}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 border border-[#7EC8E3] rounded-full bg-[#2E3A59] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] transition duration-200"
            />
          </motion.div>

          <motion.div variants={fadeInUp(0.5)}>
            <input
              type="email"
              placeholder="Apple ID (email)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-[#7EC8E3] rounded-full bg-[#2E3A59] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] transition duration-200"
            />
          </motion.div>

          <motion.div variants={fadeInUp(0.6)}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-[#7EC8E3] rounded-full bg-[#2E3A59] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] transition duration-200"
            />
          </motion.div>

          <motion.div variants={fadeInUp(0.7)}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-[#7EC8E3] rounded-full bg-[#2E3A59] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] transition duration-200"
            />
          </motion.div>

          {error && (
            <motion.p
              variants={fadeInUp(0.8)}
              className="text-red-400 text-center mt-2 font-medium"
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={fadeInUp(0.9)}
            type="submit"
            className="w-full p-3 bg-[#7EC8E3] text-black font-semibold rounded-full hover:bg-white transition duration-200 shadow-md"
          >
            Continue
          </motion.button>
        </form>

        <motion.div variants={fadeInUp(1)} className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an Apple ID?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#7EC8E3] hover:underline font-medium transition"
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
