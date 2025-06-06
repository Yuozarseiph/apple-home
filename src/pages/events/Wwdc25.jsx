import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wwdcEvent } from "../../data/wwdc.jsx"; // ✅ این خط رو برگرداندم!

// ثبت ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Wwdc25() {
  const titleRef = useRef();
  const bannerRef = useRef();
  const descRef = useRef();
  const highlightsRef = useRef([]);
  const calendarRef = useRef();

  // Animate element with scroll detection
  const animateElement = (el, direction = -100) => {
    if (!el) return;

    gsap.fromTo(
      el,
      { x: direction, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  };

  // Setup animations
  useEffect(() => {
    if (titleRef.current) animateElement(titleRef.current, -100);
    if (bannerRef.current) animateElement(bannerRef.current, 0);
    if (descRef.current) animateElement(descRef.current, -100);
    if (calendarRef.current) animateElement(calendarRef.current, 100);

    highlightsRef.current.forEach((el, i) => {
      animateElement(el, i % 2 === 0 ? -100 : 100);
    });

    return () => {};
  }, []);

  return (
    <div className="bg-image-iPhone min-h-screen pt-24 pb-[120px] px-4 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Banner Image */}
          <div
            ref={bannerRef}
            className="w-full mb-6 rounded-[5rem] overflow-visible shadow-lg"
          >
            {wwdcEvent.banner}
          </div>

          {/* Title & Subtitle */}
          <div ref={titleRef} className="flex flex-col items-center mb-2">
            <div className="mb-2">{wwdcEvent.logo}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#00a4c4] drop-shadow-[0_2px_16px_rgba(0,164,196,0.2)] text-center">
              {wwdcEvent.title}
            </h1>
            <h2 className="text-lg md:text-2xl font-semibold text-white mt-2 text-center">
              {wwdcEvent.subtitle}
            </h2>
            <div className="mt-2 text-base md:text-lg text-[#FFD60A] font-bold">
              {wwdcEvent.date}
            </div>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="mt-4 mb-6 text-center text-white max-w-2xl"
          >
            {wwdcEvent.description}
          </p>

          {/* Calendar Button */}
          <a
            ref={calendarRef}
            href={wwdcEvent.calendarLink}
            className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-[#00a4c4] to-[#b554d5] hover:from-[#008aa9] hover:to-[#a24ccf] text-white font-bold shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[#00a4c4]/50"
            target="_blank"
            rel="noopener noreferrer"
          >
            {wwdcEvent.calendarIcon}
            <span className="ml-2">{wwdcEvent.calendarText}</span>
          </a>
        </div>

        {/* Highlights Section */}
        <section className="mt-10">
          <h3 className="text-2xl font-bold text-[#00a4c4] mb-6 text-center">
            Highlights
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {wwdcEvent.highlights.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => (highlightsRef.current[i] = el)}
                className="flex items-start gap-5 p-6 rounded-2xl bg-white/90 border border-gray-200 shadow-md backdrop-blur-sm hover:shadow-xl transition-all"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xl font-semibold text-[#00a4c4] mb-1">
                    {item.title}
                  </div>
                  <div className="text-gray-700">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}