import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import {styles} from "../utils/Styles";

const btnStyle = styles.btnStyle;


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
    // icon: <FaApple className="text-3xl text-[#7EC8E3]" />,
    title: "Apple Ecosystem",
    desc: "Seamless integration with all your Apple devices.",
  },
  {
    // icon: <FaUsers className="text-3xl text-[#7EC8E3]" />,
    title: "Community",
    desc: "Connect and grow with a supportive community.",
  },
  {
    // icon: <FaLock className="text-3xl text-[#7EC8E3]" />,
    title: "Privacy First",
    desc: "Your data is safe and secure with us.",
  },
  {
    // icon: <FaRocket className="text-3xl text-[#7EC8E3]" />,
    title: "Fast & Reliable",
    desc: "Experience lightning-fast performance.",
  },
];

export default function LandingPage() {
  const heroRef = useRef();
  const heroTitleRef = useRef();
  const heroDescRef = useRef();
  const heroBtnRef = useRef();
  const valuesTitleRef = useRef();
  const valueCardsRef = useRef([]);
  const featuresTitleRef = useRef();
  const featureCardsRef = useRef([]);
  const followTitleRef = useRef();
  const followDescRef = useRef();
  const followBtnRef = useRef();

  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      heroTitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
    );
    gsap.fromTo(
      heroDescRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      heroBtnRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)", delay: 0.6 }
    );
    // Values section animation
    gsap.fromTo(
      valuesTitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    valueCardsRef.current.forEach((el, i) => {
      if (el)
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.4 + i * 0.15,
            ease: "power3.out",
          }
        );
    });
    // Features section animation
    gsap.fromTo(
      featuresTitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    featureCardsRef.current.forEach((el, i) => {
      if (el)
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.4 + i * 0.12,
            ease: "power3.out",
          }
        );
    });
    // Follow section animation
    gsap.fromTo(
      followTitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      followDescRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(
      followBtnRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)", delay: 0.7 }
    );
  }, []);

  const scrollToValues = () => {
    const el = document.getElementById("values");
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-image-iPhone select-none bg-black text-white min-h-screen font-sans pb-[120px]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="flex flex-col items-center justify-center min-h-screen text-center px-4"
      >
        <h1
          ref={heroTitleRef}
          className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold mb-4"
        >
          Welcome to Apple Home.
        </h1>
        <p
          ref={heroDescRef}
          className="text-sm md:text-md lg:text-lg xl:text-xl mb-6 max-w-2xl"
        >
          A new way to build strength, together. Designed with care, built for
          connection.
        </p>
        <button
          ref={heroBtnRef}
          onClick={scrollToValues}
          className={btnStyle}
        >
          Learn More
        </button>
      </section>

      {/* Get Started Section */}
      <section className="py-10 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-white/10 rounded-2xl shadow-lg p-8 backdrop-blur-xl border border-white/20">
          <h2 className="text-3xl font-bold text-[#7EC8E3] mb-4">
            Get Started
          </h2>
          <p className="mb-6 text-blue-100">
            Ready to join the Apple Home experience? Create your account and
            start your journey today.
          </p>
          <Link
            to="/register"
            className={btnStyle}
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2
          ref={featuresTitleRef}
          className="text-4xl font-bold mb-10 text-[#7EC8E3]"
        >
          Features
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {featuresData.map((f, i) => (
            <div
              key={f.title}
              ref={(el) => (featureCardsRef.current[i] = el)}
              className="bg-black/20 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center transition hover:scale-105"
            >
              {/* <div className="mb-3">{f.icon}</div> */}
              <h3 className="text-xl font-semibold text-[#7EC8E3] mb-2">
                {f.title}
              </h3>
              <p className="text-white text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section id="values" className="py-20 px-6 text-center">
        <h2 ref={valuesTitleRef} className="text-4xl font-bold mb-10">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {valuesData.map(({ title, desc }, i) => (
            <div
              key={i}
              ref={(el) => (valueCardsRef.current[i] = el)}
              className="backdrop-blur-md bg-black/10 shadow-lg p-6 rounded-xl transition hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-[#7EC8E3] mb-2">
                {title}
              </h3>
              <p className="text-white">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Follow Us */}
      <section className="py-16 text-center text-white">
        <h2 ref={followTitleRef} className="text-3xl font-bold mb-4">
          Stay in the Loop
        </h2>
        <p ref={followDescRef} className="mb-6">
          Be the first to know about new features, updates, and how others are
          using Apple Home.
        </p>
        <a
          ref={followBtnRef}
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className={btnStyle}
        >
          Follow Me
        </a>
      </section>
    </div>
  );
}
