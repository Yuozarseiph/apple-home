import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const routeMessages = {
  "/shop": "Shop",
  "/contact": "Contact",
  "/terms": "Terms",
  "/about": "About",
  "/faq": "FAQ",
  "/blog": "Blog",
  "/team": "Team",
  "/register": "Register",
  "/login": "Login",
  "/": "Home",
};

export default function DynamicIslandRouteNotifier() {
  const islandRef = useRef();
  const messageRef = useRef();
  const tl = useRef();

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showDateTime, setShowDateTime] = useState(false);
  const [dateTimeStr, setDateTimeStr] = useState("");

  // پیام‌های در صف
  const queueRef = useRef([]);
  const isPlayingRef = useRef(false);

  // Helper to update date/time string from user's device
  const updateDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const time = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    enqueueMessage({ type: "datetime", value: `${date} - ${time}` });
  };

  // صف پیام‌ها
  const enqueueMessage = (msg) => {
    queueRef.current.push(msg);
    playNext();
  };

  const playNext = () => {
    if (isPlayingRef.current) return;
    const next = queueRef.current.shift();
    if (!next) return;
    isPlayingRef.current = true;
    if (next.type === "datetime") {
      setDateTimeStr(next.value);
      setShowDateTime(true);
    } else if (next.type === "route") {
      setShowDateTime(false);
      setCurrentPath(next.value);
    }
  };

  // Show date/time immediately and then every 60s
  useEffect(() => {
    updateDateTime(); // نمایش اولیه
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  // Hide date/time after animation
  useEffect(() => {
    if (showDateTime) {
      const timeout = setTimeout(() => {
        setShowDateTime(false);
        isPlayingRef.current = false;
        playNext();
      }, 3300);
      return () => clearTimeout(timeout);
    }
  }, [showDateTime]);

  // اجرای انیمیشن برای route
  useEffect(() => {
    if (showDateTime) return; // اگر ساعت/تاریخ نمایش داده می‌شود، route اجرا نشود
    tl.current = gsap.timeline({ paused: true });

    tl.current.set(messageRef.current, { opacity: 0, y: 20 });

    tl.current.set(islandRef.current, {
      width: 40,
      height: 40,
      borderRadius: "50%",
      paddingLeft: 0,
      paddingRight: 0,
      scale: 1,
      opacity: 1,
    });

    tl.current.to(islandRef.current, {
      width: () => {
        const msgWidth = messageRef.current.offsetWidth;
        return msgWidth + 32; // 16px padding left + right
      },
      height: 40,
      borderRadius: "20px",
      paddingLeft: 16,
      paddingRight: 16,
      duration: 0.5,
      ease: "power2.out",
    });

    tl.current.to(
      messageRef.current,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "<"
    );

    tl.current.to(messageRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      delay: 2,
    });

    tl.current.to(islandRef.current, {
      width: 40,
      height: 40,
      borderRadius: "50%",
      paddingLeft: 0,
      paddingRight: 0,
      duration: 0.5,
      ease: "power2.in",
    });

    tl.current.to(islandRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        isPlayingRef.current = false;
        playNext();
      },
    });

    tl.current.restart();
    // eslint-disable-next-line
  }, [currentPath, showDateTime]);

  // رویدادهای تغییر مسیر
  useEffect(() => {
    const handleRouteChange = () => {
      enqueueMessage({ type: "route", value: window.location.pathname });
    };

    window.addEventListener("popstate", handleRouteChange);

    const origPushState = window.history.pushState;
    const origReplaceState = window.history.replaceState;
    window.history.pushState = function (...args) {
      origPushState.apply(this, args);
      window.dispatchEvent(new Event("popstate"));
    };
    window.history.replaceState = function (...args) {
      origReplaceState.apply(this, args);
      window.dispatchEvent(new Event("popstate"));
    };

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.history.pushState = origPushState;
      window.history.replaceState = origReplaceState;
    };
    // eslint-disable-next-line
  }, []);

  // اجرای انیمیشن اولیه بعد از mount برای هماهنگی اندازه با محتوا
  useEffect(() => {
    // فقط یک بار اجرا شود
    if (!islandRef.current || !messageRef.current) return;
    const tlInit = gsap.timeline();
    tlInit.set(messageRef.current, { opacity: 0, y: 20 });
    tlInit.set(islandRef.current, {
      width: 40,
      height: 40,
      borderRadius: "50%",
      paddingLeft: 0,
      paddingRight: 0,
      scale: 1,
      opacity: 1,
    });
    tlInit.to(islandRef.current, {
      width: () => {
        const msgWidth = messageRef.current.offsetWidth;
        return msgWidth + 32;
      },
      height: 40,
      borderRadius: "20px",
      paddingLeft: 16,
      paddingRight: 16,
      duration: 0.5,
      ease: "power2.out",
    });
    tlInit.to(
      messageRef.current,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "<"
    );
  }, []);

  return (
    <div
      ref={islandRef}
      onClick={() => {
        enqueueMessage({ type: "route", value: window.location.pathname });
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-full border border-white/20 shadow-lg z-50 flex items-center justify-center px-4 py-2 cursor-pointer overflow-hidden select-none"
    >
      <span
        ref={messageRef}
        style={{
          position: "absolute",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {showDateTime ? dateTimeStr : routeMessages[currentPath] || "Unknown"}
      </span>
    </div>
  );
}
