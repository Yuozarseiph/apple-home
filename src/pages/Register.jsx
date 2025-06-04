// pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { styles } from "../utils/Styles";
import AnimatedFormContainer from "../components/AnimatedFormContainer";
import AnimatedFormItem from "../components/AnimatedFormItem";

// Icons
import userIcon from "../assets/Icons/apple-email.svg";
import emailIcon from "../assets/Icons/apple-email.svg";
import passwordIcon from "../assets/Icons/apple-password.svg";

// Set base URL for axios requests
axios.defaults.baseURL = "http://127.0.0.1:5000";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFocus = (iconRef) => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 1, filter: "drop-shadow(0 0 12px #7EC8E3)" },
        {
          scale: 1.18,
          filter: "drop-shadow(0 0 24px #7EC8E3)",
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        }
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (typeof window.showIslandMessage !== "function") {
      setTimeout(() => {
        if (typeof window.showIslandMessage === "function") {
          handleRegister(e);
        } else {
          alert("DynamicIsland is not loaded. Please refresh the page.");
        }
      }, 300);
      return;
    }

    if (!fullName && !email && !password && !confirmPassword) {
      window.showIslandMessage("Please fill in all fields");
      return;
    }
    if (!fullName) {
      window.showIslandMessage("Please enter your full name");
      return;
    }
    if (!email) {
      window.showIslandMessage("Please enter your email");
      return;
    }
    if (!password) {
      window.showIslandMessage("Please enter your password");
      return;
    }
    if (!confirmPassword) {
      window.showIslandMessage("Please confirm your password");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      window.showIslandMessage("Invalid email format");
      return;
    }
    if (password.length < 8) {
      window.showIslandMessage("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      window.showIslandMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        fullName,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("authchange"));
      window.showIslandMessage("Registration successful", {
        color: "#4ade80",
        duration: 2.5,
      });
      navigate("/dashboard");
    } catch (err) {
      window.showIslandMessage(
        err.response?.data?.message || "Registration failed. Please try again.",
        { color: "#f87171" }
      );
    }
  };

  return (
    <AnimatedFormContainer
      title="Create your Apple ID"
      intro="Enjoy seamless access to all Apple services with one account."
      button={{
        className: `${styles.btnStyle} w-full`,
        text: "Continue",
      }}
      
      onSubmit={handleRegister}
    >
      {/* Full Name */}
      <AnimatedFormItem label="Your Name" index={0}>
        <div className="relative">
          <span
            className="absolute left-4 top-[40%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3]"
            onClick={() =>
              handleFocus({ current: document.querySelector(".name-icon") })
            }
          >
            <img src={userIcon} alt="User Icon" className="w-5 h-5 name-icon" />
          </span>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`${styles.inoutStyles} pl-12`}
          />
        </div>
      </AnimatedFormItem>

      {/* Email */}
      <AnimatedFormItem label="Your Email Address" index={1}>
        <div className="relative">
          <span
            className="absolute left-4 top-[40%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3]"
            onClick={() =>
              handleFocus({ current: document.querySelector(".email-icon") })
            }
          >
            <img
              src={emailIcon}
              alt="Email Icon"
              className="w-5 h-5 email-icon"
            />
          </span>
          <input
            type="email"
            placeholder="Apple ID (email)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.inoutStyles} pl-12`}
          />
        </div>
      </AnimatedFormItem>

      {/* Password */}
      <AnimatedFormItem label="Password" index={2}>
        <div className="relative">
          <span
            className="absolute left-4 top-[40%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3]"
            onClick={() =>
              handleFocus({ current: document.querySelector(".password-icon") })
            }
          >
            <img
              src={passwordIcon}
              alt="Password Icon"
              className="w-5 h-5 password-icon"
            />
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles.inoutStyles} pl-12`}
          />
        </div>
      </AnimatedFormItem>

      {/* Confirm Password */}
      <AnimatedFormItem label="Confirm Password" index={3}>
        <div className="relative">
          <span
            className="absolute left-4 top-[40%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3]"
            onClick={() =>
              handleFocus({ current: document.querySelector(".confirm-icon") })
            }
          >
            <img
              src={passwordIcon}
              alt="Confirm Password Icon"
              className="w-5 h-5 confirm-icon"
            />
          </span>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`${styles.inoutStyles} pl-12`}
          />
        </div>
      </AnimatedFormItem>
      <p className="text-white">Already have an Apple ID? <Link to='/login' className="text-blue-400">Login</Link></p>
    </AnimatedFormContainer>
  );
}
