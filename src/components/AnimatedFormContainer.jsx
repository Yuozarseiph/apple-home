// components/AnimatedFormContainer.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const AnimatedFormContainer = ({
  title,
  intro,
  children,
  altText,
  onSubmit,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const introRef = useRef(null);
  const btnRef = useRef(null);
  const altRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial state
    gsap.set([titleRef.current, formRef.current, introRef.current], {
      opacity: 0,
      y: 30,
    });
    if (btnRef.current) gsap.set(btnRef.current, { opacity: 0, scale: 0.95 });
    if (altRef.current) gsap.set(altRef.current, { opacity: 0, y: 20 });

    // Animate in sequence
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        introRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<+0.2"
      )
      .to(
        formRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "<+0.2"
      );

    if (btnRef.current) {
      tl.to(
        btnRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "<+0.3"
      );
    }

    if (altRef.current) {
      tl.to(
        altRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "<+0.4"
      );
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4 pb-[120px]">
      <div
        ref={containerRef}
        className="relative w-full max-w-md rounded-2xl p-10 shadow-2xl border border-gray-200/40 bg-white/90 backdrop-blur-sm text-gray-800"
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold text-center text-[#00a4c4] mb-8 drop-shadow-[0_2px_16px_rgba(0,164,196,0.2)]"
        >
          {title}
        </h1>

        {/* Intro Text */}
        <p
          ref={introRef}
          className="text-lg text-center mb-8 text-gray-700 font-medium"
        >
          {intro}
        </p>

        {/* Form Fields */}
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="space-y-5"
          autoComplete="off"
        >
          {children}
        </form>

        {/* Button - Wrap with ref for animation */}
        <div ref={btnRef} className="mt-6">
          {React.Children.map(children, (child) =>
            child?.type === "button" ? child : null
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedFormContainer;
