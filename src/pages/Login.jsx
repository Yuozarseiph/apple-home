import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import loginIcon from "../assets/Icons/apple-email.svg";
import passwordIcon from "../assets/Icons/apple-password.svg";
import { styles } from "../utils/Styles";

// Set base URL for axios requests
axios.defaults.baseURL = "http://127.0.0.1:5000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formRef = useRef(null);
  const emailIconRef = useRef(null);
  const passwordIconRef = useRef(null);
  const buttonRef = useRef(null);

  // Animate form, icons, button
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
    // آیکون ایمیل (label style): x: -20, delay: 0.4
    if (emailIconRef.current) {
      gsap.fromTo(
        emailIconRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    }
    // ایمیل input: x: 20, delay: 0.5
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
      gsap.fromTo(
        emailInput,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }
    // آیکون پسورد: x: -20, delay: 0.6
    if (passwordIconRef.current) {
      gsap.fromTo(
        passwordIconRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "power2.out",
        }
      );
    }
    // پسورد input: x: 20, delay: 0.7
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
      gsap.fromTo(
        passwordInput,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.7,
          ease: "power2.out",
        }
      );
    }
    // دکمه: scale, opacity, delay: 0.9
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.9,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  // Icon pulse & glow on input focus
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (typeof window.showIslandMessage !== "function") {
      setTimeout(() => handleLogin(e), 200);
      return;
    }
    // Client-side validation (FORCE SYNC, NO ASYNC RECURSION)
    if (!email && !password) {
      window.showIslandMessage?.("Please enter your email and password");
      return;
    }
    if (!email) {
      window.showIslandMessage?.("Please enter your email");
      return;
    }
    if (!password) {
      window.showIslandMessage?.("Please enter your password");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      window.showIslandMessage?.("Invalid email format");
      return;
    }
    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      // اضافه کردن این خط برای اطلاع به BottomNav
      window.dispatchEvent(new Event("authchange"));
      window.showIslandMessage?.("Login successful", {
        color: "#4ade80",
        duration: 2.2,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.response) {
        window.showIslandMessage?.(
          err.response.data.message || "Incorrect email or password"
        );
      } else {
        window.showIslandMessage?.("Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4 pb-[120px]">
      <div
        ref={formRef}
        className="relative w-full max-w-md rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#7EC8E3] mb-8 drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]">
          Welcome back
        </h2>

        <p className="text-center text-blue-100 mb-8 text-lg font-medium drop-shadow-[0_1px_8px_rgba(126,200,227,0.2)]">
          Sign in to your Apple Home account to continue.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <span
              ref={emailIconRef}
              className="absolute left-4 top-[22%] -translate-y-1/2 h-6 w-6 flex items-center justify-center pointer-events-none filter drop-shadow-[0_0_8px_#7EC8E3] transition"
            >
              <img
                src={loginIcon}
                alt="Email Icon"
                className="w-5 h-5"
                style={{ display: "block" }}
              />
            </span>
            <input
              type="email"
              placeholder="Apple ID or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus(emailIconRef)}
              className={styles.inoutStyles + " pl-12"}
            />
          </div>

          {/* Password Input */}
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
            Continue with Apple ID
          </button>
        </form>

        {/* Link to register */}
        <div className="mt-6 text-center">
          <p className="text-blue-200 text-base">
            Don’t have an Apple ID?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#7EC8E3] font-semibold underline underline-offset-2 hover:text-white transition"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
