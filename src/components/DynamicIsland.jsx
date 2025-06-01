import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function DynamicIsland() {
  const islandRef = useRef();
  const timeRef = useRef();
  const dateRef = useRef();
  const tl = useRef();

  const playAnimation = () => {
    tl.current.restart();
  };

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true, repeat: 0 });

    // حالت اولیه: دایره کوچک بسته
    tl.current.set(islandRef.current, {
      width: 40,
      height: 40,
      borderRadius: "100px",
      paddingLeft: 0,
      paddingRight: 0,
      scale: 1,
      opacity: 1,
    });

    // انیمیشن باز شدن با اندازه داینامیک بر اساس محتوا
    tl.current.to(islandRef.current, {
      width: () => {
        const timeWidth = timeRef.current.offsetWidth;
        const dateWidth = dateRef.current.offsetWidth;
        const padding = 16 + 12; // paddingLeft + paddingRight
        // بزرگترین عرض محتوا + padding
        return Math.max(timeWidth, dateWidth) + padding;
      },
      height: 40,
      borderRadius: "100px",
      paddingLeft: 16,
      paddingRight: 12,
      duration: 0.5,
      ease: "power2.out",
    });

    // نمایش زمان از پایین به بالا
    tl.current.fromTo(
      timeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );

    // مخفی شدن زمان به سمت بالا
    tl.current.to(timeRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.7,
      ease: "power2.in",
      delay: 2,
    });

    // نمایش تاریخ از پایین به بالا
    tl.current.fromTo(
      dateRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    );

    // مخفی شدن تاریخ به سمت پایین
    tl.current.to(dateRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.in",
      delay: 2,
    });

    // کوچک شدن و بسته شدن به دایره
    tl.current.to(islandRef.current, {
      width: 40,
      height: 40,
      borderRadius: "500px",
      paddingLeft: 0,
      paddingRight: 0,
      duration: 0.5,
      ease: "power2.in",
    });

    // تنظیم برای چرخه بعدی
    tl.current.set([timeRef.current, dateRef.current], { opacity: 0, y: 20 });

    // پخش اتوماتیک هر 60 ثانیه
    const interval = setInterval(() => {
      playAnimation();
    }, 60000);

    // اجرای اول هنگام mount
    playAnimation();

    return () => clearInterval(interval);
  }, []);

  const now = new Date();

  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div
      ref={islandRef}
      onClick={playAnimation}
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-full border-1 border-white/20 shadow-lg z-50 flex items-center justify-center px-4 py-2 cursor-pointer"
    >
      <span
        ref={timeRef}
        style={{
          position: "absolute",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {formattedTime}
      </span>
      <span
        ref={dateRef}
        style={{
          position: "absolute",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {formattedDate}
      </span>
    </div>
  );
}
