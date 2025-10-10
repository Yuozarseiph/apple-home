import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Home, ShoppingCart, MessageSquare, Shield, Info, HelpCircle, Book, Users, UserPlus, LogIn } from "lucide-react";

// --- LOGIC UNTOUCHED ---
// I've added an icon property to each route message. The core object remains the same.
const routeMessages = {
  "/": { text: "Home", icon: <Home size={18} /> },
  "/shop": { text: "Shop", icon: <ShoppingCart size={18} /> },
  "/contact": { text: "Contact", icon: <MessageSquare size={18} /> },
  "/terms": { text: "Terms", icon: <Shield size={18} /> },
  "/about": { text: "About", icon: <Info size={18} /> },
  "/faq": { text: "FAQ", icon: <HelpCircle size={18} /> },
  "/blog": { text: "Blog", icon: <Book size={18} /> },
  "/team": { text: "Team", icon: <Users size={18} /> },
  "/register": { text: "Register", icon: <UserPlus size={18} /> },
  "/login": { text: "Login", icon: <LogIn size={18} /> },
};

export default function DynamicIslandRouteNotifier() {
  const islandRef = useRef(null);
  const contentRef = useRef(null); // Renamed for clarity (contains icon and text)
  const tl = useRef(null);

  // --- LOGIC UNTOUCHED ---
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
        color: opts.color || "#00d5be", // Using your preferred green as default
        duration: opts.duration || 2.2,
      });
      playNext();
    };
    return () => {
      delete window.showIslandMessage;
    };
  }, []);
  // --- END OF UNTOUCHED LOGIC ---

  useEffect(() => {
    if (!currentMessage || !islandRef.current || !contentRef.current) return;
    
    // --- ANIMATION TWEAKS ---
    // The sequence is identical, but eases and properties are polished.
    tl.current = gsap.timeline({
      onComplete: () => {
        // --- LOGIC UNTOUCHED ---
        isPlayingRef.current = false;
        playNext();
      },
    });

    // Initial state: a small, hidden circle
    tl.current.set(islandRef.current, { width: 44, height: 44, scale: 0, opacity: 0 });
    tl.current.set(contentRef.current, { opacity: 0 });

    // 1. Pop into view as a circle
    tl.current.to(islandRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)", // A more playful ease
    });

    // 2. Expand to a pill shape
    tl.current.to(islandRef.current, {
      width: () => contentRef.current.offsetWidth + 32, // 16px padding on each side
      duration: 0.6,
      ease: "power4.inOut",
    }, "-=0.25");

    // 3. Fade in the content
    tl.current.to(contentRef.current, { 
      opacity: 1, 
      duration: 0.4,
      ease: "power2.out"
    }, "<");

    // 4. Wait
    const displayDuration = currentMessage.type === "custom" ? currentMessage.duration : 1.7;
    tl.current.to({}, { duration: displayDuration }); // Empty tween for delay

    // 5. Fade out the content
    tl.current.to(contentRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
    });

    // 6. Collapse back to a circle and fade out
    tl.current.to(islandRef.current, {
        width: 44,
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.in(1.7)",
    }, "-=0.25");

  }, [currentMessage]);

  // --- LOGIC UNTOUCHED (Route change listeners) ---
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
  // --- END OF UNTOUCHED LOGIC ---
  
  const currentRouteInfo = (() => {
    if (currentMessage.type === 'custom') return null;
    let path = currentMessage.value || "";
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    return routeMessages[path.toLowerCase()] || null;
  })();

  return (
    <div
      ref={islandRef}
      // --- VISUAL REDESIGN ---
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center rounded-full
      bg-black shadow-2xl shadow-white/5
      border border-white/10
      "
    >
      <div
        ref={contentRef}
        className="flex items-center gap-2.5 whitespace-nowrap px-4 text-white/90"
      >
        {currentMessage.type === 'custom' ? null : currentRouteInfo?.icon}
        <span
          className="font-medium text-base tracking-tight text-white/90"
          style={{
            color:
              currentMessage.type === "custom"
                ? currentMessage.color
                : undefined,
          }}
        >
          {currentMessage.type === "custom"
            ? currentMessage.value
            : currentRouteInfo?.text || ""}
        </span>
      </div>
    </div>
  );
}