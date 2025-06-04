import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import instagram from "../assets/instagram.svg";
import github from "../assets/github.svg";
import telegram from "../assets/telegram.svg";

// Utility hook for refs array
function useArrayRefs(length) {
  const refs = useRef([]);
  refs.current = Array(length)
    .fill()
    .map((_, i) => refs.current[i] || null);
  const setRef = useCallback(
    (i) => (el) => {
      refs.current[i] = el;
    },
    []
  );
  return [refs, setRef];
}

export default function About() {
  // تعداد refs مورد نیاز را مشخص کنید (در اینجا 15)
  const [refs, setRef] = useArrayRefs(15);

  useEffect(() => {
    const delays = [
      0.1, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7,
    ];
    refs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: delays[i] || 0,
          ease: "power2.out",
        }
      );
    });
  }, [refs]);

  return (
    <div className="bg-image-iPhone text-white min-h-screen pt-24 pb-[120px] px-6">
      {/* Main section with title and intro paragraph */}
      <section className="relative w-full max-w-5xl rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl mx-auto text-center mb-6">
        <h1
          ref={setRef(0)}
          className="text-4xl font-extrabold text-[#7EC8E3] mb-8 drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]"
        >
          About Apple Home
        </h1>
        <p
          ref={setRef(1)}
          className="text-lg mb-10 max-w-3xl mx-auto text-blue-100 font-medium drop-shadow-[0_1px_8px_rgba(126,200,227,0.2)]"
        >
          A new kind of experience. Designed for connection. Built with care.
          Apple Home is where technology meets life — and every detail has a
          purpose.
        </p>
      </section>

      {/* Section describing the company's purpose */}
      <section className="relative w-full max-w-4xl rounded-2xl p-8 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl mx-auto mt-4 mb-6">
        <h2
          ref={setRef(2)}
          className="text-2xl font-semibold mb-4 text-[#7EC8E3]"
        >
          Our Purpose
        </h2>
        <p ref={setRef(3)}>
          Technology should help you live better — not get in the way. At Apple
          Home, we design products that simplify your daily routine, inspire
          creativity, and keep you connected to what matters most.
        </p>
      </section>

      {/* Two-column grid describing "Who We Are" and "What Drives Us" */}
      <section className="mt-12 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {Object.entries({
          WhoWeAre: [
            "Who We Are",
            "We’re a team of designers, engineers, and thinkers who believe great technology starts with empathy. Every product we create begins with one question: How can this make life better?",
          ],
          WhatDrivesUs: [
            "What Drives Us",
            "We believe innovation isn’t just about speed or specs — it’s about how a product feels in your hands, how it fits into your life, and how it helps you do more of what you love.",
          ],
        }).map(([key, [title, text]], idx) => (
          <div
            key={key}
            ref={setRef(idx + 4)}
            className="relative w-full rounded-2xl p-6 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#7EC8E3]">
              {title}
            </h3>
            <p className="text-white">{text}</p>
          </div>
        ))}
      </section>

      {/* Branding and Social Icons (From Footer) */}
      <section className="relative w-full max-w-5xl rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl mx-auto mt-12 text-center mb-6">
        <h3 ref={setRef(6)} className="text-2xl font-bold mb-4 text-[#7EC8E3]">
          Apple Home
        </h3>
        <p
          ref={setRef(7)}
          className="mb-5 text-sm leading-relaxed text-gray-300"
        >
          Our mission is to bring couples closer together through meaningful and
          empowering gymnastics lessons.
        </p>

        <div ref={setRef(8)} className="flex justify-center space-x-5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="Instagram" className="w-7 h-7" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="GitHub" className="w-7 h-7" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            <img src={telegram} alt="Telegram" className="w-7 h-7" />
          </a>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative w-full max-w-5xl rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl mx-auto mt-12 text-center mb-6">
        <h4
          ref={setRef(9)}
          className="text-lg font-semibold mb-5 text-[#7EC8E3]"
        >
          Newsletter
        </h4>
        <p ref={setRef(10)} className="text-sm mb-5 text-gray-300">
          Subscribe to our newsletter to get the latest updates and offers.
        </p>

        <div className="flex justify-center space-x-2 max-w-md mx-auto gap-3 items-center flex-wrap sm:flex-nowrap">
          <input
            ref={setRef(11)}
            type="email"
            placeholder="Enter your email"
            className="w-full py-3 pl-6 pr-2 rounded-full border-none bg-gradient-to-r from-[#4d4d4d2c] to-[#7ec8e31a] text-white placeholder:text-[#A6C8E3] shadow-lg shadow-[#7ec8e320] focus:outline-none focus:bg-gradient-to-r focus:from-[#7ec8e340] focus:to-[#fff1] focus:shadow-[0_0_0_2px_#7EC8E3,0_2px_24px_#7ec8e380] transition"
          />
          <button
            ref={setRef(12)}
            className="bg-gradient-to-r from-[#7EC8E3] to-[#4d4d4d2c] text-white px-6 py-3 rounded-full font-bold border-none shadow-lg shadow-[#7ec8e340] backdrop-blur-lg transition hover:bg-gradient-to-l hover:from-white hover:to-[#7EC8E3] hover:text-[#222] hover:shadow-[0_0_32px_#7EC8E3,0_0_8px_#fff] focus:outline-none"
            type="button"
            // اگر gsap خواستی اضافه کنی مشابه لاگین میشه
          >
            Subscribe
          </button>
        </div>
      </section>

      {/* Copyright and Developer Credit */}
      <section className="mt-10 text-center text-sm text-[#7EC8E3]">
        <div ref={setRef(13)}>
          &copy; {new Date().getFullYear()} Apple Home. All rights reserved.
        </div>
        <div ref={setRef(14)} className="mt-4">
          Created by{" "}
          <a
            href="https://yuozarseiph.top"
            className="hover:text-[#7EC8E3] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yousef Shaker Ardakani
          </a>
          . All rights reserved.
        </div>
      </section>
    </div>
  );
}
