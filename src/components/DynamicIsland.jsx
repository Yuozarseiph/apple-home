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

  // پیام‌های در صف
  const queueRef = useRef([]);
  const isPlayingRef = useRef(false);

  // پیام فعلی که باید نمایش داده شود
  const [currentMessage, setCurrentMessage] = useState(() => ({
    type: "route",
    value: window.location.pathname,
  }));

  // ذخیره مسیر فعلی برای تشخیص تغییر واقعی مسیر
  const lastPathRef = useRef(window.location.pathname);

  // صف پیام‌ها
  const enqueueMessage = (msg) => {
    // اگر پیام route است و مسیر جدید با مسیر قبلی فرق دارد، اجازه بده
    if (msg.type === "route" && msg.value !== lastPathRef.current) {
      lastPathRef.current = msg.value;
      queueRef.current.push(msg);
      playNext();
      return;
    }
    // پیام تکراری اضافه نشود
    if (msg.type === "custom") {
      queueRef.current.push(msg);
      playNext();
      return;
    }
  };

  const playNext = () => {
    if (isPlayingRef.current) return;
    const next = queueRef.current.shift();
    if (!next) return;
    isPlayingRef.current = true;
    setCurrentMessage(next);
  };

  // پیام سفارشی (مثلاً ارور فرم) را به صف اضافه کن
  useEffect(() => {
    window.showIslandMessage = (msg, opts = {}) => {
      queueRef.current.push({
        type: "custom",
        value: msg,
        color: opts.color || "#ff6b81", // پیش‌فرض قرمز
        duration: opts.duration || 2.2,
      });
      playNext();
    };
    return () => {
      delete window.showIslandMessage;
    };
    // eslint-disable-next-line
  }, []);

  // اجرای انیمیشن برای پیام فعلی
  useEffect(() => {
    if (!currentMessage) return;
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
        return msgWidth + 32;
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
      delay:
        currentMessage.type === "route"
          ? 1.7
          : currentMessage.type === "custom"
          ? currentMessage.duration
          : 2,
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
  }, [currentMessage]);

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
          color:
            currentMessage.type === "custom"
              ? currentMessage.color || "#ff6b81"
              : "#fff",
        }}
      >
        {currentMessage.type === "custom"
          ? currentMessage.value
          : (() => {
              let key = currentMessage.value || "";
              if (key.length > 1 && key.endsWith("/")) key = key.slice(0, -1);
              return routeMessages[key.toLowerCase()] || "";
            })()}
      </span>
    </div>
  );
}
