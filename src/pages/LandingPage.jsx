import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Zap, ArrowDown, CheckCircle } from "lucide-react";
import CreativeButton from "../components/CreativeButton";
import bgimg from "../assets/bg-all.webp";
const GREEN_COLOR = "#00d5be";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
  },
};

const HeroSection = () => {
  const scrollToFeatures = () =>
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex items-center justify-center min-h-screen text-center px-4 overflow-hidden bg-black">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{ background: `radial-gradient(circle, ${GREEN_COLOR}11, transparent 70%)` }}
        animate={{ scale: [1, 1.5, 1], x: [0, 100, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{ background: `radial-gradient(circle, #6366f122, transparent 70%)` }}
        animate={{ scale: [1, 1.5, 1], y: [0, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      <motion.div
        className="relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
        >
          Welcome to <span style={{ color: GREEN_COLOR }}>Apple Home.</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-400"
        >
          A new way to build strength, together. Designed with care, built for connection.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register">
            <CreativeButton text="Create Account" />
          </Link>
          <motion.button
            onClick={scrollToFeatures}
            className="flex items-center gap-2 font-semibold text-gray-400 hover:text-white transition-colors"
            whileHover={{ gap: "12px" }}
          >
            Learn More <ArrowDown size={18} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: Zap, title: "Fast & Reliable", desc: "Experience lightning-fast performance and stability." },
    { icon: ShieldCheck, title: "Privacy First", desc: "Your data is safe, secure, and always under your control." },
    { icon: Users, title: "Community Driven", desc: "Connect and grow with a supportive, inspiring community." },
  ];
  return (
    <section id="features" className="container mx-auto py-24 px-4">
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="p-8 bg-gray-900 rounded-2xl border border-white/10 text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${GREEN_COLOR}22` }}
            >
              <feature.icon className="w-8 h-8" style={{ color: GREEN_COLOR }} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ValuesSection = () => {
  const values = [
    { title: "Designed for Your Life", desc: "Technology that adapts to your routines, making every day simpler and more intuitive." },
    { title: "Thoughtfully Connected", desc: "Products that work together seamlessly, creating a unified and powerful smart home experience." },
    { title: "Built to Empower", desc: "High-quality, reliable software and hardware that you can depend on, day in and day out." },
  ];
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInLeft}
          className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center border border-white/10"
        >
          <img src={bgimg} alt="" />
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-8 text-white">
            Our Core Values
          </motion.h2>
          <div className="space-y-6">
            {values.map((value, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex items-start gap-4">
                <CheckCircle size={24} className="mt-1 flex-shrink-0" style={{ color: GREEN_COLOR }} />
                <div>
                  <h4 className="text-xl font-semibold text-white">{value.title}</h4>
                  <p className="text-gray-400">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FinalCTASection = () => (
  <section className="container mx-auto py-24 px-4 text-center">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeInUp}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to connect your world?</h2>
      <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
        Join the Apple Home experience today and build a smarter, more connected life.
      </p>
      <Link to="/register">
        <CreativeButton text="Get Started Now" />
      </Link>
    </motion.div>
  </section>
);

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ValuesSection />
      <FinalCTASection />
    </div>
  );
}
