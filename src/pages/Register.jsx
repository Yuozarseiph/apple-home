import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { styles } from "../utils/Styles";

import userIcon from "../assets/Icons/apple-email.svg";
import emailIcon from "../assets/Icons/apple-email.svg";
import passwordIcon from "../assets/Icons/apple-password.svg";

// Set base URL for axios requests
axios.defaults.baseURL = "http://127.0.0.1:5000";

const Register = () => {
  // Form field states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const formRef = useRef(null);
  const userIconRef = useRef(null);
  const emailIconRef = useRef(null);
  const passwordIconRef = useRef(null);
  const confirmIconRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // ورود فرم و آیکون‌ها و دکمه دقیقاً مثل Contact.jsx
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
    // آیکون‌ها و اینپوت‌ها با delay افزایشی و x: -20/+20
    const iconRefs = [
      userIconRef,
      emailIconRef,
      passwordIconRef,
      confirmIconRef,
    ];
    const inputSelectors = [
      'input[type="text"]',
      'input[type="email"]',
      'input[placeholder="Password"]',
      'input[placeholder="Confirm Password"]',
    ];
    iconRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.4 + i * 0.2,
            ease: "power2.out",
          }
        );
      }
      const input = document.querySelector(inputSelectors[i]);
      if (input) {
        gsap.fromTo(
          input,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.5 + i * 0.2,
            ease: "power2.out",
          }
        );
      }
    });
    // دکمه: scale, opacity, delay: 1.3
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 1.3,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

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

  // Handle user registration
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

    // Client-side validation
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
      // اضافه کردن این خط برای اطلاع به BottomNav
      window.dispatchEvent(new Event("authchange"));
      window.showIslandMessage("Registration successful", {
        color: "#4ade80",
        duration: 2.5,
      });
      navigate("/dashboard");
      // window.location.reload(); // این خط را حذف کن
    } catch (err) {
      if (err.response) {
        window.showIslandMessage(
          err.response.data.message || "Registration failed. Please try again."
        );
      } else {
        window.showIslandMessage("Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4 w-full pb-[120px]">
      <div
        ref={formRef}
        className="relative w-full max-w-md rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-[#7EC8E3] mb-8 drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]">
          Create your Apple ID
        </h2>

        <p className="text-center text-blue-100 mb-8 text-base font-medium drop-shadow-[0_1px_8px_rgba(126,200,227,0.2)]">
          Enjoy seamless access to all Apple services with one account.
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <span
              ref={userIconRef}
              className="absolute left-4 top-[22%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3] transition"
            >
              <img
                src={userIcon}
                alt="User Icon"
                className="w-5 h-5"
                style={{ display: "block" }}
              />
            </span>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => handleFocus(userIconRef)}
              className={styles.inoutStyles + " pl-12"}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span
              ref={emailIconRef}
              className="absolute left-4 top-[22%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3] transition"
            >
              <img
                src={emailIcon}
                alt="Email Icon"
                className="w-5 h-5"
                style={{ display: "block" }}
              />
            </span>
            <input
              type="email"
              placeholder="Apple ID (email)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus(emailIconRef)}
              className={styles.inoutStyles + " pl-12"}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span
              ref={passwordIconRef}
              className="absolute left-4 top-[22%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3] transition"
            >
              <img
                src={passwordIcon}
                alt="Password Icon"
                className="w-5 h-5"
                style={{ display: "block" }}
              />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus(passwordIconRef)}
              className={styles.inoutStyles + " pl-12"}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <span
              ref={confirmIconRef}
              className="absolute left-4 top-[22%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3] transition"
            >
              <img
                src={passwordIcon}
                alt="Confirm Password Icon"
                className="w-5 h-5"
                style={{ display: "block" }}
              />
            </span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleFocus(confirmIconRef)}
              className={styles.inoutStyles + " pl-12"}
            />
          </div>

          {/* Submit button */}
          <button
            ref={buttonRef}
            type="submit"
            className={styles.btnStyle + " w-full"}
            onMouseEnter={() => {
              if (buttonRef.current) {
                gsap.to(buttonRef.current, {
                  scale: 1.08,
                  boxShadow: "0 0 32px #7EC8E3, 0 0 8px #fff",
                  duration: 0.2,
                  ease: "power1.out",
                });
              }
            }}
            onMouseLeave={() => {
              if (buttonRef.current) {
                gsap.to(buttonRef.current, {
                  scale: 1,
                  boxShadow: "0 4px 32px #7ec8e340",
                  duration: 0.2,
                  ease: "power1.in",
                });
              }
            }}
          >
            Continue
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-blue-200 text-base">
            Already have an Apple ID?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#7EC8E3] font-semibold underline underline-offset-2 hover:text-white transition"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
