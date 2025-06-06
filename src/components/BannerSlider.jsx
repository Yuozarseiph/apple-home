import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import CreativeButton from "./CreativeButton";
import slide1 from "../assets/slides/slide-1.png";
import slide2 from "../assets/slides/slide-2.jpg";
import slide3 from "../assets/slides/slide-3.jpg";

const sliderData = [
  {
    image: slide1,
    title: "Father’s Day",
    desc: "Find a gift for every kind of dad.",
    link: "/shop/iphone16",
    button: "Shop now",
    align: "center",
    textColor: "text-white",
    overlay: "from-black/80 via-black/40 to-transparent",
  },
  {
    image: slide2,
    title: "iPhone Family",
    desc: "Explore the latest iPhone lineup. Powerful, beautiful, and designed for everyone.",
    link: "/shop/iphone16",
    button: "Shop iPhone",
    align: "left",
    textColor: "text-white",
    overlay: "from-black/80 via-black/40 to-transparent",
  },
  {
    image: slide3,
    title: "Celebrate Creativity",
    desc: "WWDC is for everyone. Celebrate with us and unleash your creative potential.",
    link: "/about/wwdc",
    button: "Learn More",
    align: "right",
    textColor: "text-white",
    overlay: "from-black/80 via-black/40 to-transparent",
  },
];

function getContentPosition(align) {
  if (align === "left")
    return "left-8 md:left-16 bottom-1/4 items-start text-left -translate-x-0";
  if (align === "right")
    return "right-8 md:right-16 bottom-1/4 items-end text-right translate-x-0";
  return "left-1/2 bottom-1/4 -translate-x-1/2 items-center text-center";
}

function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef([]);
  const intervalRef = useRef();
  const animating = useRef(false);
  const [paused, setPaused] = useState(false);

  // Animation logic
  const goToSlide = useCallback(
    (next, direction = 1) => {
      if (animating.current || next === current) return;
      animating.current = true;
      const currEl = slideRefs.current[current];
      const nextEl = slideRefs.current[next];
      if (!currEl || !nextEl) return;

      gsap.to(currEl, {
        x: direction === 1 ? "-60%" : "60%",
        autoAlpha: 0,
        zIndex: 1,
        rotateY: direction === 1 ? -45 : 45,
        scale: 0.92,
        duration: 0.45,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        nextEl,
        {
          x: direction === 1 ? "60%" : "-60%",
          autoAlpha: 0,
          zIndex: 2,
          rotateY: direction === 1 ? 45 : -45,
          scale: 0.92,
        },
        {
          x: "0%",
          autoAlpha: 1,
          zIndex: 2,
          rotateY: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => {
            animating.current = false;
            setCurrent(next);
          },
        }
      );
    },
    [current]
  );

  // Auto slide
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      goToSlide((current + 1) % sliderData.length, 1);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [current, paused, goToSlide]);

  // Initial state
  useEffect(() => {
    sliderData.forEach((_, idx) => {
      const el = slideRefs.current[idx];
      if (!el) return;
      gsap.set(el, {
        x: idx === current ? "0%" : "100%",
        autoAlpha: idx === current ? 1 : 0,
        zIndex: idx === current ? 2 : 1,
        rotateY: 0,
        scale: 1,
      });
    });
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        goToSlide((current - 1 + sliderData.length) % sliderData.length, -1);
      } else if (e.key === "ArrowRight") {
        goToSlide((current + 1) % sliderData.length, 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goToSlide]);

  // Manual navigation
  const handlePrev = () => {
    if (!animating.current)
      goToSlide((current - 1 + sliderData.length) % sliderData.length, -1);
  };
  const handleNext = () => {
    if (!animating.current) goToSlide((current + 1) % sliderData.length, 1);
  };

  return (
    <div
      className="relative w-full h-[50vh] overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ perspective: 1200 }}
    >
      {/* Prev/Next Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-[#7EC8E3] rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition"
        onClick={handlePrev}
        aria-label="Previous Slide"
        tabIndex={0}
        style={{ fontSize: 28, fontWeight: "bold" }}
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-[#7EC8E3] rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition"
        onClick={handleNext}
        aria-label="Next Slide"
        tabIndex={0}
        style={{ fontSize: 28, fontWeight: "bold" }}
      >
        &#8594;
      </button>
      {sliderData.map((slide, idx) => (
        <div
          key={idx}
          ref={(el) => (slideRefs.current[idx] = el)}
          className="absolute top-0 left-0 w-full h-full transition-all duration-700"
          style={{
            pointerEvents: idx === current ? "auto" : "none",
            zIndex: idx === current ? 2 : 1,
            willChange: "transform, opacity",
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            draggable={false}
            style={{
              userSelect: "none",
              transition: "filter 0.7s cubic-bezier(.4,2,.6,1)",
            }}
          />
          {/* حذف هاله روی اسلاید */}
          {/* <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlay}`} /> */}
          <div
            className={`absolute ${getContentPosition(
              slide.align
            )} w-full max-w-2xl px-4 flex flex-col gap-2`}
          >
            <h2
              className={`text-3xl md:text-5xl font-extrabold mb-4 ${slide.textColor}`}
              style={{
                textShadow:
                  "0 4px 32px #000a, 0 2px 8px #000a, 0 1px 1px #000a",
              }}
            >
              {slide.title}
            </h2>
            <p
              className={`text-lg md:text-2xl mb-6 ${slide.textColor}`}
              style={{
                textShadow:
                  "0 2px 16px #000a, 0 1px 1px #000a, 0 0px 8px #000a",
              }}
            >
              {slide.desc}
            </p>
            <Link to={slide.link}>
              <CreativeButton text={slide.button} />
            </Link>
          </div>
        </div>
      ))}
      {/* Indicator Dots */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-3 z-10">
        {sliderData.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            className={`block w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-[#7EC8E3] shadow-[0_0_8px_#7EC8E3]"
                : "bg-white/40"
            }`}
            onClick={() =>
              !animating.current && goToSlide(idx, idx > current ? 1 : -1)
            }
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
