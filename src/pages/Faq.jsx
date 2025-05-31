import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="bg-image-iPhone text-white min-h-screen pt-24 pb-[120px] px-6 "
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { delay: 0.2 },
        },
      }}
    >
      <section className="max-w-5xl mx-auto">
        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold mb-10 text-center text-[#7EC8E3]"
        >
          Got questions? We’ve got answers.
        </motion.h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="position-relative backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl cursor-pointer select-none"
            >
              <h2
                role="button"
                tabIndex={0}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="text-2xl font-semibold mb-0 text-[#7EC8E3] flex justify-between items-center"
                onClick={() => toggleOpen(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleOpen(i);
                  }
                }}
              >
                {item.question}
                <span className="ml-4 text-white text-xl select-none">
                  {openIndex === i ? "−" : "+"}
                </span>
              </h2>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.p
                    key="content"
                    id={`faq-answer-${i}`}
                    aria-labelledby={`faq-question-${i}`}
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-white overflow-hidden"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
