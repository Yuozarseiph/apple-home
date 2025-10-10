import React, {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

// Added more questions as requested
const faqItems = [
    { question: "What is Apple Home?", answer: "Apple Home is where our technology meets your everyday life, designed to simplify routines and inspire creativity." },
    { question: "Is Apple Home right for me?", answer: "Absolutely. Whether you're just getting started or deep into the ecosystem, Apple Home adapts to your needs." },
    { question: "How do I get started?", answer: "Just choose your device from the Shop, complete your purchase, and follow the simple setup instructions." },
    { question: "What about privacy?", answer: "Your privacy is paramount. All data is processed on-device whenever possible, and we use end-to-end encryption for all cloud services. You are in control of your data." },
    { question: "Can I connect third-party devices?", answer: "Yes. We support a wide range of Matter-compatible smart home devices, allowing you to build a connected home that works for you." },
    { question: "What if I change my mind?", answer: "No problem. You can return it within 14 days — no questions asked. Full details are in our Terms of Use." },
    { question: "What is the warranty policy?", answer: "All our products come with a one-year limited warranty and 90 days of complimentary technical support. You can also purchase extended coverage." },
];

const FaqItem = ({ item, isOpen, onClick }) => {
  const GREEN_COLOR = "#00d5be";
  
  const itemVariants = {
    closed: { backgroundColor: "rgba(17, 24, 39, 0)" }, // bg-gray-900 (transparent to show page bg)
    open: { backgroundColor: "rgba(31, 41, 55, 1)" },   // bg-gray-800
  };

  return (
    <motion.div
      layout
      className="rounded-xl overflow-hidden border border-white/10"
      variants={itemVariants}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
    >
      {/* Coloured indicator bar */}
      <motion.div 
        layout 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{backgroundColor: GREEN_COLOR}}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      
      <motion.header
        layout
        onClick={onClick}
        className="p-6 flex justify-between items-center cursor-pointer select-none"
      >
        <h2 className="text-lg font-semibold text-white">{item.question}</h2>
        <motion.div 
            className="flex-shrink-0 ml-4"
            animate={{ rotate: isOpen ? 180 : 0 }} 
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronDown className="text-gray-500" />
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-400 leading-relaxed">{item.answer}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-28 px-4 md:px-6">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Frequently Asked Questions
            </h1>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              Everything you need to know. If you can't find your answer here, feel free to reach out.
            </p>
        </motion.div>

        <motion.div 
            layout 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
          {faqItems.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* --- Contact Us CTA --- */}
        <motion.div 
            className="text-center mt-16 p-8 bg-gray-900 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
        >
            <MessageSquare size={32} className="mx-auto text-[#00d5be] mb-4"/>
            <h3 className="text-2xl font-bold text-white mb-2">Can't find your answer?</h3>
            <p className="text-gray-400 mb-6">Our team is always here to help. Get in touch with us.</p>
            <Link to="/contact">
                <motion.button 
                    className="font-semibold text-black px-6 py-2 rounded-lg"
                    style={{backgroundColor: '#00d5be'}}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00d5be66" }}
                >
                    Contact Us
                </motion.button>
            </Link>
        </motion.div>
      </div>
    </div>
  );
}