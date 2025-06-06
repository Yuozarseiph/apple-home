import React, { useRef, useEffect } from "react";
import gsap from "gsap";

// آدرس عکس‌ها از assets
import iphone16pro from "../../assets/iPhone16/ip16pro.png"; // تصویر اول
import iphoneSE from "../../assets/iPhone16/ip16e.png"; // تصویر دوم
import iphone16 from "../../assets/iPhone16/ip16.png"; // تصویر سوم

const iphones = [
  {
    name: "iPhone 16 Pro",
    img: iphone16pro,
    desc: "The most advanced iPhone ever. Titanium design, A18 Pro chip, ProMotion display, and the best camera system.",
    color: "#f0f0f0", // پس‌زمینه روشن ولی شبیه به titanium
  },
  {
    name: "iPhone 16E (2024)",
    img: iphoneSE,
    desc: "Compact, powerful, and affordable. Classic design with modern performance for everyone.",
    color: "#fafafa", // پس‌زمینه روشن برای SE
  },
  {
    name: "iPhone 16",
    img: iphone16,
    desc: "All-new iPhone 16. Dynamic Island, dual camera, and all-day battery in a sleek new design.",
    color: "#f5f5f5", // خاکستری بسیار روشن برای iPhone 16
  },
];

export default function Iphone16Category() {
  const cardRefs = useRef([]);

  // Animate cards on mount
  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.2 + i * 0.18,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-image-iPhone min-h-screen pt-24 pb-[120px] px-4 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#00a4c4] mb-12 text-center drop-shadow-[0_2px_16px_rgba(0,164,196,0.2)]">
          iPhone 16 Series
        </h1>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
          {iphones.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className="w-full max-w-sm rounded-2xl shadow-xl border border-gray-200 bg-white/90 backdrop-blur-sm flex flex-col items-center p-7 transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Image Container */}
              <div
                className="w-full h-60 flex justify-center mb-6"
                style={{
                  background: item.color,
                  borderRadius: 24,
                  padding: 16,
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="max-h-64 object-contain drop-shadow-md"
                  style={{ background: "transparent" }}
                  draggable={false}
                />
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-[#00a4c4] mb-2 text-center">
                {item.name}
              </h2>
              <p className="text-center text-gray-700 mb-4">{item.desc}</p>

              {/* Button */}
              <button className="mt-auto px-6 py-2 rounded-full bg-gradient-to-r from-[#00a4c4] to-[#b554d5] hover:from-[#008aa9] hover:to-[#a24ccf] text-white font-bold shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[#00a4c4]/50">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}