// src/pages/Team.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

// Assets
import man from "../assets/man.svg";

const teamMembers = [
  {
    id: 1,
    name: "Yousof Shaker Ardakani",
    role: "Co-founder & Chief Experience Officer",
    description:
      "Yousof leads with vision and purpose — building experiences that bring people together through thoughtful design and intuitive technology.",
    imgSrc: man,
    alt: "Yousof Shaker Ardakani",
    socials: {
      linkedin: "https://linkedin.com/in/yousofshaker",   
      twitter: "https://twitter.com/yousofshaker",   
    },
  },
];

function SocialIcon({ type, url }) {
  const icons = {
    linkedin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[#00a4c4] hover:text-[#0077b6] transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5v5.5h-3v-10h3v1.25c.847-1.522 3-1.625 3 1.452v7.298z" />
      </svg>
    ),
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[#00a4c4] hover:text-[#0077b6] transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482A13.944 13.944 0 011.671 3.15a4.916 4.916 0 001.523 6.563 4.9 4.9 0 01-2.224-.616v.06a4.918 4.918 0 003.941 4.827 4.904 4.904 0 01-2.217.084 4.92 4.92 0 004.588 3.417A9.867 9.867 0 010 19.54a13.936 13.936 0 007.548 2.209c9.056 0 14.009-7.507 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
      </svg>
    ),
  };
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className="mx-2"
    >
      {icons[type]}
    </a>
  );
}

export default function Team() {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Animate on scroll - utility function
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
    if (sectionRef.current) animateElement(sectionRef.current, -100);

    cardRefs.current.forEach((card, i) => {
      animateElement(card, i % 2 === 0 ? -100 : 100);
    });

    return () => {};
  }, []);

  return (
    <div className="overflow-x-hidden text-gray-800 min-h-screen pt-24 pb-[120px] px-6">
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative w-full max-w-5xl rounded-2xl p-10 shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-sm mx-auto text-center mb-6"
      >
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold text-[#00a4c4] mb-8 drop-shadow-[0_2px_16px_rgba(0,164,196,0.2)]"
        >
          Meet the Minds Behind Apple Home
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-center text-gray-700 font-medium mb-10">
          We’re a team of designers, engineers, and thinkers who believe great technology starts with empathy.
        </p>
      </section>

      {/* Team Members Grid */}
      <section className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
        {teamMembers.map(({ id, name, role, description, imgSrc, alt, rotate, socials }, index) => (
          <div
            key={id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="relative w-full rounded-2xl p-8 shadow-xl border border-gray-200 bg-white/90 backdrop-blur-sm flex flex-col items-center text-center hover:shadow-2xl transition-all"
          >
            <img
              src={imgSrc}
              alt={alt}
              style={{ transform: `rotate(${rotate}deg)` }}
              className="rounded-full mb-4 w-32 h-32 object-cover border-4 border-[#00a4c4]/40 shadow-md"
            />
            <h3 className="text-2xl font-semibold mb-2 text-[#00a4c4]">{name}</h3>
            <p className="mb-4 text-gray-700">{role}</p>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex justify-center space-x-4">
              {Object.entries(socials).map(([type, url]) => (
                <SocialIcon key={type} type={type} url={url} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}