import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { styles } from "../utils/Styles";

// className for User Greeting and Info Cards
const UGAIC =
  "position-relative mt-2 backdrop-blur-md bg-black/40 p-6 rounded-2xl shadow-md flex items-center gap-4";

const Dashboard = () => {
  // State to hold user data fetched from API
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // GSAP refs
  const headerRef = useRef();
  const logoutBtnRef = useRef();
  const greetingRef = useRef();
  const nameCardRef = useRef();
  const emailCardRef = useRef();
  const deviceCardRef = useRef();
  const activityRef = useRef();
  const usageRef = useRef();
  const quickActionsRef = useRef();
  const supportRef = useRef();

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

  // Animate dashboard sections with GSAP
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out" }
    );
    gsap.fromTo(
      logoutBtnRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.7)" }
    );
    gsap.fromTo(
      greetingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: "power2.out" }
    );
    gsap.fromTo(
      nameCardRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      emailCardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: "power2.out" }
    );
    gsap.fromTo(
      deviceCardRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.7, ease: "power2.out" }
    );
    gsap.fromTo(
      activityRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.8, ease: "power2.out" }
    );
    gsap.fromTo(
      usageRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.9, ease: "power2.out" }
    );
    gsap.fromTo(
      quickActionsRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, delay: 1.0, ease: "power2.out" }
    );
    gsap.fromTo(
      supportRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.7, delay: 1.1, ease: "power2.out" }
    );
  }, [userData]);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.dispatchEvent(new Event("authchange"));
    if (typeof window.showIslandMessage === "function") {
      window.showIslandMessage("Logged out successfully", {
        color: "#7ec8e3",
        duration: 2.2,
      });
    }
    navigate("/"); // Redirect to home page
    // window.location.reload(); // حذف رفرش
  };

  // Show loading text while user data is being fetched
  if (!userData) {
    return (
      <div className="flex bg-image-iPhone items-center justify-center h-screen text-lg text-gray-600 pb-[120px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-image-iPhone p-6 pt-20 pb-[120px]">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <h1 className="text-4xl md:text-3xl font-extrabold text-[#7ec8e3] tracking-tight drop-shadow-[0_2px_16px_rgba(126,200,227,0.4)]">
            Your Apple Home Dashboard
          </h1>
          <button
            ref={logoutBtnRef}
            onClick={handleLogout}
            className={" flex items-center justify-center gap-2 bg-gradient-to-r cursor-pointer from-[#7EC8E3] to-[#4d4d4d2c] text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gradient-to-l hover:from-white hover:to-[#7EC8E3] hover:text-[#222] transition"}
          >
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
            <span>Logout</span>
          </button>
        </div>

        {/* User Greeting and Info Cards */}
        <div
          ref={greetingRef}
          className="relative mt-2 bg-gradient-to-r from-[#7ec8e3]/10 via-[#232526]/60 to-[#232526]/80 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6 border border-[#7ec8e3]/20"
        >
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center shadow-lg">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#7ec8e3" opacity="0.2" />
              <path
                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.31 0-6 2.01-6 4.5V20h12v-1.5c0-2.49-2.69-4.5-6-4.5z"
                fill="#7ec8e3"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome, <span className="text-[#7ec8e3]">{userData.name}</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Here’s what’s happening with your account today.
            </p>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            ref={nameCardRef}
            className="bg-[#232526]/80 border border-[#7ec8e3]/10 rounded-2xl shadow-lg p-6 flex flex-col items-center"
          >
            <span className="text-[#7ec8e3] text-lg font-semibold mb-2">
              Your Name
            </span>
            <span className="font-bold text-white text-xl">
              {userData.name}
            </span>
          </div>
          <div
            ref={emailCardRef}
            className="bg-[#232526]/80 border border-[#7ec8e3]/10 rounded-2xl shadow-lg p-6 flex flex-col items-center"
          >
            <span className="text-[#7ec8e3] text-lg font-semibold mb-2">
              Apple ID
            </span>
            <span className="font-bold text-white text-xl">
              {userData.email}
            </span>
          </div>
          <div
            ref={deviceCardRef}
            className="bg-[#232526]/80 border border-[#7ec8e3]/10 rounded-2xl shadow-lg p-6 flex flex-col items-center"
          >
            <span className="text-[#7ec8e3] text-lg font-semibold mb-2">
              Active Devices
            </span>
            <span className="font-bold text-white text-xl">1 (Demo)</span>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div
          ref={activityRef}
          className="relative mt-8 bg-gradient-to-r from-[#7ec8e3]/10 via-[#232526]/60 to-[#232526]/80 p-8 rounded-2xl shadow-xl border border-[#7ec8e3]/20"
        >
          <h2 className="text-xl font-bold text-[#7ec8e3] mb-4">
            Recent Activity
          </h2>
          <ul className="text-[#FFFFFF] space-y-2">
            <li className="mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#7ec8e3]"></span>
              Signed in from a new device • 3 hours ago
            </li>
            <li className="mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#7ec8e3]"></span>
              Account settings updated • 1 day ago
            </li>
            <li className="mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#7ec8e3]"></span>
              Password changed • 2 days ago
            </li>
          </ul>
        </div>

        {/* Placeholder for User Usage Graphs */}
        <div
          ref={usageRef}
          className="relative mt-8 bg-gradient-to-r from-[#7ec8e3]/10 via-[#232526]/60 to-[#232526]/80 p-8 rounded-2xl shadow-xl border border-[#7ec8e3]/20"
        >
          <h2 className="text-xl font-bold text-[#7ec8e3] mb-4">Your Usage</h2>
          <p className="text-[#FFFFFF]">
            This section will show your usage stats and trends once available.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div
            ref={quickActionsRef}
            className="bg-[#232526]/80 border border-[#7ec8e3]/10 rounded-2xl shadow-lg p-7"
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
          </div>
          <div
            ref={supportRef}
            className="bg-[#232526]/80 border border-[#7ec8e3]/10 rounded-2xl shadow-lg p-7"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
