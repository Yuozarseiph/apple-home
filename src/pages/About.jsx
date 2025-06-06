import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import instagram from "../assets/instagram.svg";
import github from "../assets/github.svg";
import telegram from "../assets/telegram.svg";

export default function About() {
  // Refs for animation targets
  const sections = useRef([]);

  // Set up GSAP animations
  useEffect(() => {
    sections.current.forEach((section, index) => {
      const direction = index % 2 === 0 ? -200 : 200; // left/right
      gsap.fromTo(
        section,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 2.5,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          ease: "power3.out",
        }
      );
    });

    return () => {
      // Optional cleanup
    };
  }, []);

  // Utility to assign ref with array support
  const setRef = (index) => (el) => {
    sections.current[index] = el;
  };

  return (
    <div className="bg-image-iPhone text-gray-800 min-h-screen pt-24 pb-[120px] px-6">
      {/* Hero Section */}
      <section
        ref={setRef(0)}
        className="max-w-5xl mx-auto text-center mb-12 bg-white/90 shadow-xl rounded-2xl p-10 border border-gray-200"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#00a4c4] mb-6 tracking-tight">
          About Apple Home
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          A new kind of experience. Designed for connection. Built with care.
          Apple Home is where technology meets life — and every detail has a purpose.
        </p>
      </section>

      {/* Purpose Section */}
      <section
        ref={setRef(1)}
        className="bg-white/90 shadow-lg rounded-2xl p-8 border border-gray-200 mx-auto max-w-4xl mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#00a4c4]">Our Purpose</h2>
        <p className="text-gray-700">
          Technology should help you live better — not get in the way. At Apple Home,
          we design products that simplify your daily routine, inspire creativity,
          and keep you connected to what matters most.
        </p>
      </section>

      {/* Two-column grid - ورود از چپ و راست جداگانه */}
      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
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
            ref={setRef(idx + 2)}
            className="bg-white/90 shadow-lg rounded-2xl p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#00a4c4]">{title}</h3>
            <p className="text-gray-700">{text}</p>
          </div>
        ))}
      </section>

      {/* Branding & Social Icons */}
      <section
        ref={setRef(4)}
        className="bg-white/90 shadow-lg rounded-2xl p-10 text-center border border-gray-200 mx-auto max-w-5xl mt-12 mb-12"
      >
        <h3 className="text-2xl font-bold mb-4 text-[#00a4c4]">Apple Home</h3>
        <p className="mb-6 text-sm text-gray-600">
          Our mission is to bring couples closer together through meaningful and empowering gymnastics lessons.
        </p>
        <div className="flex justify-center space-x-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00a4c4] transition-colors">
            <img src={instagram} alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00a4c4] transition-colors">
            <img src={github} alt="GitHub" className="w-6 h-6" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#00a4c4] transition-colors">
            <img src={telegram} alt="Telegram" className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        ref={setRef(5)}
        className="bg-white/90 shadow-lg rounded-2xl p-10 text-center border border-gray-200 mx-auto max-w-5xl mt-12 mb-12"
      >
        <h4 className="text-lg font-semibold mb-3 text-[#00a4c4]">Newsletter</h4>
        <p className="mb-6 text-sm text-gray-600">Subscribe to our newsletter to get the latest updates and offers.</p>
        <div className="flex flex-wrap sm:flex-nowrap justify-center gap-3 max-w-md mx-auto items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full py-3 pl-5 pr-3 rounded-full border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition-shadow shadow-sm"
          />
          <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
            Subscribe
          </button>
        </div>
      </section>

      {/* Copyright */}
      <section className="mt-10 text-center text-sm text-gray-600">
        <div>&copy; {new Date().getFullYear()} Apple Home. All rights reserved.</div>
        <div className="mt-4">
          Created by{" "}
          <a
            href="https://yuozarseiph.top"
            className="hover:text-[#00a4c4] transition-colors"
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
