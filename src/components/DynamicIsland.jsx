import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const routeMessages = {
  "/": "Home",
  "/shop": "Shop",
  "/contact": "Contact",
  "/terms": "Terms",
  "/about": "About",
  "/faq": "FAQ",
  "/blog": "Blog",
  "/team": "Team",
  "/register": "Register",
  "/login": "Login",
};

export default function DynamicIslandRouteNotifier() {
  const islandRef = useRef(null);
  const messageRef = useRef(null);
  const tl = useRef(null);

  const queueRef = useRef([]);
  const isPlayingRef = useRef(false);
  const lastPathRef = useRef(window.location.pathname);

  const [currentMessage, setCurrentMessage] = useState({
    type: "route",
    value: window.location.pathname,
  });

  const enqueueMessage = (msg) => {
    if (msg.type === "route") {
      if (msg.value !== lastPathRef.current) {
        lastPathRef.current = msg.value;
        queueRef.current.push(msg);
        playNext();
      }
    } else if (msg.type === "custom") {
      queueRef.current.push(msg);
      playNext();
    }
  };

  const playNext = () => {
    if (isPlayingRef.current) return;

    const nextMsg = queueRef.current.shift();
    if (!nextMsg) return;

    isPlayingRef.current = true;
    setCurrentMessage(nextMsg);
  };

  useEffect(() => {
    window.showIslandMessage = (msg, opts = {}) => {
      queueRef.current.push({
        type: "custom",
        value: msg,
        color: opts.color || "#ff6b81",
        duration: opts.duration || 2.2,
      });
      playNext();
    };
    return () => {
      delete window.showIslandMessage;
    };
  }, []);

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
      width: () => messageRef.current.offsetWidth + 32,
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
      delay: currentMessage.type === "custom" ? currentMessage.duration : 1.7,
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
  }, [currentMessage]);

  useEffect(() => {
    const handleRouteChange = () => {
      enqueueMessage({ type: "route", value: window.location.pathname });
    };

    window.addEventListener("popstate", handleRouteChange);

    const originalPush = history.pushState;
    const originalReplace = history.replaceState;

    history.pushState = function (...args) {
      originalPush.apply(this, args);
      window.dispatchEvent(new Event("popstate"));
    };
    history.replaceState = function (...args) {
      originalReplace.apply(this, args);
      window.dispatchEvent(new Event("popstate"));
    };

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      history.pushState = originalPush;
      history.replaceState = originalReplace;
    };
  }, []);

  useEffect(() => {
    if (!islandRef.current || !messageRef.current) return;

    const initTl = gsap.timeline();
    initTl.set(messageRef.current, { opacity: 0, y: 20 });
    initTl.set(islandRef.current, {
      width: 40,
      height: 40,
      borderRadius: "50%",
      paddingLeft: 0,
      paddingRight: 0,
      scale: 1,
      opacity: 1,
    });
    initTl.to(islandRef.current, {
      width: () => messageRef.current.offsetWidth + 32,
      height: 40,
      borderRadius: "20px",
      paddingLeft: 16,
      paddingRight: 16,
      duration: 0.5,
      ease: "power2.out",
    });
    initTl.to(
      messageRef.current,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "<"
    );
  }, []);

  return (
    <div
      ref={islandRef}
      className="fixed top-4 left-0 right-0 mx-auto z-50 flex items-center justify-center cursor-pointer select-none rounded-full min-h-[44px] min-w-[44px] px-5 font-semibold text-[1.05rem]
      bg-gray-900/60 backdrop-blur-md border border-gray-700/30 shadow-lg
      hover:bg-gray-800/30 transition-colors duration-300"
      onClick={() =>
        enqueueMessage({ type: "route", value: window.location.pathname })
      }
    >
      <span
        ref={messageRef}
        className={`relative whitespace-nowrap select-none font-medium text-[1.08rem] px-1 tracking-tight ${
          currentMessage.type === "custom" ? "" : "text-white"
        }`}
        style={{
          color:
            currentMessage.type === "custom"
              ? currentMessage.color || "#ff6b81"
              : undefined,
        }}
      >
        {currentMessage.type === "custom"
          ? currentMessage.value
          : (() => {
              let path = currentMessage.value || "";
              if (path.length > 1 && path.endsWith("/"))
                path = path.slice(0, -1);
              return routeMessages[path.toLowerCase()] || "";
            })()}
      </span>
    </div>
  );
}
