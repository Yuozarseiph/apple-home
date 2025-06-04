// components/AnimatedFormContainer.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const AnimatedFormContainer = ({
  title,
  intro,
  children,
  button,
  altText,
  onSubmit,
}) => {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const introRef = useRef(null);
  const btnRef = useRef(null);
  const altRef = useRef(null);

  useEffect(() => {
    if (!formRef.current) return;

    // Initial setup
    gsap.set([titleRef.current, formRef.current, introRef.current], {
      opacity: 0,
    });
    gsap.set([btnRef.current, altRef.current], { opacity: 0 });

    // Timeline animation
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.1,
    })
      .to(
        formRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "<+0.1"
      )
      .to(
        introRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        },
        "<+0.2"
      )
      .to(
        btnRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "<+0.1"
      )
      .to(
        altRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "<+0.2"
      );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4 pb-[120px]">
      <div
        ref={formRef}
        className="relative w-full max-w-md rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
      >
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold text-center text-[#7EC8E3] mb-8 drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]"
        >
          {title}
        </h1>

        <p
          ref={introRef}
          className="text-lg text-center mb-8 text-blue-100 font-medium drop-shadow-[0_1px_8px_rgba(126,200,227,0.2)]"
        >
          {intro}
        </p>

        <form className="space-y-5" onSubmit={onSubmit}>
          {children}
          <button ref={btnRef} type="submit" className={button.className}>
            {button.text}
          </button>
        </form>

        <p
          ref={altRef}
          className="text-blue-200 text-base text-center mt-6"
          dangerouslySetInnerHTML={{ __html: altText }}
        />
      </div>
    </div>
  );
};

export default AnimatedFormContainer;
