import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Components
import CreativeButton from "../components/CreativeButton";
import BannerSlider from "../components/BannerSlider";

// GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Sample Data
const valuesData = [
  {
    title: "Designed for You",
    desc: "Every lesson is crafted to help you grow stronger — together, and at your own pace.",
  },
  {
    title: "Thoughtfully Made",
    desc: "Gentle on the body, powerful in results. Because fitness should feel good.",
  },
  {
    title: "Built to Last",
    desc: "High-quality programs that adapt with you, from the first step to the final stretch.",
  },
];

const featuresData = [
  {
    title: "Apple Ecosystem",
    desc: "Seamless integration with all your Apple devices.",
  },
  {
    title: "Community",
    desc: "Connect and grow with a supportive community.",
  },
  {
    title: "Privacy First",
    desc: "Your data is safe and secure with us.",
  },
  {
    title: "Fast & Reliable",
    desc: "Experience lightning-fast performance.",
  },
];

export default function LandingPage() {
  // Refs
  const heroRef = useRef();
  const valuesTitleRef = useRef();
  const valueCardsRef = useRef([]);
  const featuresTitleRef = useRef();
  const featureCardsRef = useRef([]);
  const followTitleRef = useRef();
  const followDescRef = useRef();
  const followBtnRef = useRef();

  // Animate Element - ساده و بدون تکرار
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

  // Setup Animations
  useEffect(() => {
    animateElement(heroRef.current, -100);
    animateElement(valuesTitleRef.current, -100);
    animateElement(featuresTitleRef.current, -100);
    animateElement(followTitleRef.current, -100);
    animateElement(followDescRef.current, -100);
    animateElement(followBtnRef.current, -100);

    valueCardsRef.current.forEach((card, i) => {
      animateElement(card, i % 2 === 0 ? -100 : 100);
    });

    featureCardsRef.current.forEach((card, i) => {
      animateElement(card, i % 2 === 0 ? -100 : 100);
    });

    return () => {};
  }, []);

  // Utility to assign ref array
  const setValueCardRef = (i) => (el) => {
    valueCardsRef.current[i] = el;
  };

  const setFeatureCardRef = (i) => (el) => {
    featureCardsRef.current[i] = el;
  };

  const scrollToValues = () => {
    const el = document.getElementById("values");
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <div className="overflow-x-hidden select-none text-white min-h-screen font-sans flex align-center justify-center pb-[120px] px-1 overflow-hidden">
      {/* Banner Slider */}
      <div className="xl:w-[80%] w-full max-w-[1400px] h-fit">
        <section className="flex items-center justify-center h-full mb-10">
          <div className="relative w-full h-full mt-10 rounded-4xl overflow-hidden">
            <BannerSlider />
          </div>
        </section>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="flex flex-col items-center justify-center p-12 rounded-4xl w-full text-center px-4 bg-white/90 backdrop-blur-sm"
        >
          <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-4 text-[#00a4c4] leading-tight">
            Welcome to Apple Home.
          </h1>
          <p className="text-sm md:text-md lg:text-lg xl:text-xl mb-6 max-w-2xl mx-auto text-gray-700">
            A new way to build strength, together. Designed with care, built for
            connection.
          </p>
          <button onClick={scrollToValues}>
            <CreativeButton text={"Read More"} />
          </button>
        </section>

        <div className="h-12" />

        {/* Get Started Section */}
        <section className="flex flex-col items-center justify-center p-12 rounded-4xl w-full text-center bg-white/90 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#00a4c4] mb-4">
              Get Started
            </h2>
            <p className="mb-6 text-blue-900">
              Ready to join the Apple Home experience? Create your account and
              start your journey today.
            </p>
            <Link to="/register" className="inline-block">
              <CreativeButton text={"Create Account"} />
            </Link>
          </div>
        </section>

        <div className="h-12" />

        {/* Features Section */}
        <section className="flex flex-col items-center justify-center p-12 rounded-4xl w-full text-center bg-white/90 backdrop-blur-sm">
          <h2
            ref={featuresTitleRef}
            className="text-4xl font-bold mb-10 text-[#00a4c4]"
          >
            Features
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {featuresData.map(({ title, desc }, i) => (
              <div
                key={i}
                ref={setFeatureCardRef(i)}
                className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center border border-[#00a4c4]/20 hover:border-[#00a4c4] transition-all hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold text-[#00a4c4] mb-2">
                  {title}
                </h3>
                <p className="text-gray-700 text-sm text-center">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-12" />

        {/* Our Values */}
        <section
          id="values"
          className="flex flex-col items-center justify-center p-12 rounded-4xl w-full text-center bg-white/90 backdrop-blur-sm"
        >
          <h2
            ref={valuesTitleRef}
            className="text-4xl font-bold mb-10 text-[#00a4c4]"
          >
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {valuesData.map(({ title, desc }, i) => (
              <div
                key={i}
                ref={setValueCardRef(i)}
                className="bg-white rounded-xl p-6 shadow-lg border border-[#00a4c4]/20 hover:border-[#00a4c4] hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-semibold text-[#00a4c4] mb-2">
                  {title}
                </h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-12" />

        {/* Follow Us */}
        <section className="flex flex-col items-center justify-center p-12 rounded-4xl w-full text-center bg-white/90 backdrop-blur-sm">
          <h2
            ref={followTitleRef}
            className="text-3xl font-bold mb-4 text-[#00a4c4]"
          >
            Stay in the Loop
          </h2>
          <p
            ref={followDescRef}
            className="mb-6 text-gray-700 max-w-lg mx-auto"
          >
            Be the first to know about new features, updates, and how others are
            using Apple Home.
          </p>
          <a
            ref={followBtnRef}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <CreativeButton text={"Follow Me"} />
          </a>
        </section>
      </div>
    </div>
  );
}
