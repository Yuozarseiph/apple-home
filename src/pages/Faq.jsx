import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Faq() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: 12,
      transition: { duration: 0.3 },
    },
  };

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

  const [openIndex, setOpenIndex] = useState(null);
  const cardRefs = useRef([]);
  const answerRefs = useRef([]);
  const titleRef = useRef();

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: "power2.out" }
      );
    }
    cardRefs.current.forEach((el, i) => {
      if (el)
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.2 + i * 0.13,
            ease: "power2.out",
          }
        );
    });
  }, []);

  // Animate open/close of answers (smooth)
  useEffect(() => {
    answerRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (openIndex === i) {
        gsap.fromTo(
          ref,
          { height: 0, opacity: 0, marginTop: 0 },
          {
            height: ref.scrollHeight,
            opacity: 1,
            marginTop: 12,
            duration: 0.5,
            ease: "power1.inOut",
            display: "block",
          }
        );
      } else {
        gsap.to(ref, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 0.4,
          ease: "power1.inOut",
          display: "none",
        });
      }
    });
  }, [openIndex]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4 pt-24 pb-[120px]">
      <section className="max-w-5xl mx-auto w-full">
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold text-center text-[#7EC8E3] mb-10 drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]"
        >
          Got questions? We’ve got answers.
        </h1>

        <div className="space-y-6">
          {faqItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl cursor-pointer select-none transition hover:scale-105"
            >
              <h2
                role="button"
                tabIndex={0}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="text-2xl font-semibold mb-0 text-[#7EC8E3] flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(openIndex === i ? null : i);
                  }
                }}
              >
                {item.question}
                <span className="ml-4 text-white text-xl select-none">
                  {openIndex === i ? "−" : "+"}
                </span>
              </h2>
              <div
                ref={(el) => (answerRefs.current[i] = el)}
                id={`faq-answer-${i}`}
                aria-labelledby={`faq-question-${i}`}
                className="overflow-hidden text-white transition-all duration-300"
                style={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                  marginTop: openIndex === i ? 12 : 0,
                  display: openIndex === i ? "block" : "none",
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
