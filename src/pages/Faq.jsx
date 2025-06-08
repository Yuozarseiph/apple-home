import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ثبت ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const cardRefs = useRef([]);
  const answerRefs = useRef([]);
  const titleRef = useRef();

  // Animate title and cards on mount with scroll detection
  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // FAQ cards animations
    cardRefs.current.forEach((el, i) => {
      const direction = i % 2 === 0 ? -100 : 100;

      if (el) {
        gsap.fromTo(
          el,
          { x: direction, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => {};
  }, []);

  // Animate open/close of answers smoothly with GSAP
  useEffect(() => {
    answerRefs.current.forEach((ref, i) => {
      if (!ref) return;

      if (i !== openIndex) {
        gsap.to(ref, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 0.3,
          ease: "power1.inOut",
          onComplete: () => {
            ref.style.display = "none"; // Hide after animation
          },
        });
      }

      if (i === openIndex) {
        ref.style.display = "block"; // Make sure it's visible before measuring
        gsap.fromTo(
          ref,
          { height: 0, opacity: 0, marginTop: 0 },
          {
            height: ref.scrollHeight,
            opacity: 1,
            marginTop: 12,
            duration: 0.5,
            ease: "power1.inOut",
          }
        );
      }
    });
  }, [openIndex]);

  const faqItems = [
    {
      question: "What is Apple Home?",
      answer:
        "Apple Home is where our technology meets your everyday life. Designed to simplify routines, inspire creativity, and help you stay connected with what matters most.",
    },
    {
      question: "Is Apple Home right for me?",
      answer:
        "Absolutely. Whether you're just getting started or already deep into the ecosystem, Apple Home adapts to your needs — and grows with you.",
    },
    {
      question: "How do I get started?",
      answer:
        "Just choose your device from the Shop, complete your purchase, and follow the simple setup instructions. It takes minutes — not hours.",
    },
    {
      question: "What if I change my mind?",
      answer:
        "No problem. If you're not completely happy with your purchase, you can return it within 14 days — no questions asked. Full details are in our Terms of Use.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen overflow-x-hidden bg-cover bg-center px-6 pt-24 pb-[120px] text-gray-800">
      <section className="max-w-5xl mx-auto w-full">
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold text-center text-[#00a4c4] mb-10 drop-shadow-[0_2px_16px_rgba(0,164,196,0.2)]"
        >
          Got questions? We’ve got answers.
        </h1>

        <div className="space-y-6">
          {faqItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="relative w-full rounded-2xl p-8 shadow-xl border border-gray-200 bg-white/90 backdrop-blur-sm cursor-pointer select-none transition hover:shadow-2xl"
            >
              <h2
                role="button"
                tabIndex={0}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="text-2xl font-semibold mb-0 text-[#00a4c4] flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(openIndex === i ? null : i);
                  }
                }}
              >
                {item.question}
                <span className="ml-4 text-[#00a4c4] text-xl select-none transition-transform duration-300 transform-gpu will-change-transform"
                  style={{ transform: openIndex === i ? "rotate(0deg)" : "rotate(45deg)" }}>
                  +
                </span>
              </h2>
              <div
                ref={(el) => (answerRefs.current[i] = el)}
                id={`faq-answer-${i}`}
                aria-labelledby={`faq-question-${i}`}
                className="overflow-hidden text-gray-700"
                style={{
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                }}
              >
                <p className="mt-4">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}