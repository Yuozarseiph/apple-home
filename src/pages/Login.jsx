// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { styles } from "../utils/Styles";
import AnimatedFormContainer from "../components/AnimatedFormContainer";
import AnimatedFormItem from "../components/AnimatedFormItem";
import CreativeButton from "../components/CreativeButton";

// Icons
import loginIcon from "../assets/Icons/apple-email.svg";
import passwordIcon from "../assets/Icons/apple-password.svg";

// Set base URL for axios requests
axios.defaults.baseURL = "http://127.0.0.1:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFocus = (iconRef) => {
    if (iconIconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 1, filter: "drop-shadow(0 0 12px #7EC8E3)" },
        {
          scale: 1.18,
          filter: "drop-shadow(0 0 24px rgba(0, 164, 196, 0.7))",
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        }
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (typeof window.showIslandMessage !== "function") {
      setTimeout(() => {
        if (typeof window.showIslandMessage === "function") {
          handleLogin(e);
        } else {
          alert("DynamicIsland is not loaded. Please refresh the page.");
        }
      }, 300);
      return;
    }

    // Client-side validation
    if (!email && !password) {
      window.showIslandMessage("Please enter your email and password");
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
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      window.showIslandMessage("Invalid email format");
      return;
    }

    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("authchange"));
      window.showIslandMessage("Login successful", {
        color: "#4ade80",
        duration: 2.2,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      window.showIslandMessage(
        err.response?.data?.message || "Incorrect email or password"
      );
    }
  };

  return (
    <AnimatedFormContainer
      title="Welcome back"
      intro="Sign in to your Apple Home account to continue."
      altText="Don't have an account? <a href='/register' class='underline hover:text-[#00a4c4] transition-colors'>Create one</a>"
      onSubmit={handleLogin}
    >
      {/* Email */}
      <AnimatedFormItem label="Apple ID or email" index={0}>
        <div className="relative">
          <span
            className="absolute left-4 top-[40%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_rgba(0,164,196,0.4)]"
            onClick={() =>
              handleFocus({ current: document.querySelector(".login-icon") })
            }
          >
            <img
              src={loginIcon}
              alt="Email Icon"
              className="w-5 h-5 login-icon"
            />
          </span>
          <input
            type="email"
            placeholder="Apple ID or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() =>
              handleFocus({ current: document.querySelector(".login-icon") })
            }
            className={`${styles.inoutStyles} pl-12`}
          />
        </div>
      </AnimatedFormItem>

      {/* Password */}
      <AnimatedFormItem label="Password" index={1}>
        <div className="relative">
          <span
            className="absolute left-4 top-[40%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_rgba(0,164,196,0.4)]"
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
            onFocus={() =>
              handleFocus({ current: document.querySelector(".password-icon") })
            }
            className={`${styles.inoutStyles} pl-12`}
          />
        </div>
      </AnimatedFormItem>

      {/* Submit Button */}
      <div className="mt-6">
        <CreativeButton text="Continue" type="submit" />
      </div>

      {/* Alternate Text */}
      <p className="text-gray-800 mt-6 text-sm text-center">
        Already have an Apple ID?{" "}
        <Link
          to="/register"
          className="text-[#00a4c4] hover:text-[#0077b6] transition-colors"
        >
          Sign up
        </Link>
      </p>
    </AnimatedFormContainer>
  );
}
