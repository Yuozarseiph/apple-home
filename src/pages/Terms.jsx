import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ثبت ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Terms() {
  const titleRef = useRef();
  const sectionRefs = useRef([]);

  // Utility to assign ref array
  const setSectionRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  useEffect(() => {
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

    // Title animation
    if (titleRef.current) animateElement(titleRef.current, -100);

    // Section animations
    sectionRefs.current.forEach((section, i) => {
      const direction = i % 2 === 0 ? -100 : 100;
      animateElement(section, direction);
    });

    return () => {};
  }, []);

  return (
    <div className="bg-image-iPhone min-h-screen pt-24 pb-[120px] px-6 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative w-full max-w-4xl rounded-2xl p-10 shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-sm mx-auto text-center mb-6"
        ref={titleRef}
      >
        <h1 className="text-4xl font-extrabold text-[#00a4c4] mb-8 drop-shadow-[0_2px_16px_rgba(0,164,196,0.2)]">
          Terms of Use
        </h1>
        <p className="mb-8 text-lg text-gray-700 font-medium max-w-3xl mx-auto">
          Welcome to Apple Home. These Terms of Use govern your access to and use of our website, services, and products.
        </p>
      </section>

      {/* Content Section */}
      <section
        className="relative w-full max-w-3xl rounded-2xl p-8 shadow-xl border border-gray-200 bg-white/90 backdrop-blur-sm mx-auto mt-4 mb-6 text-left"
        ref={setSectionRef(1)}
      >
        <h3 className="text-2xl font-semibold mb-4 text-[#00a4c4]">1. About This Agreement</h3>
        <p className="mb-6 text-gray-700">
          By using our website or purchasing any product from us, you agree to be bound by these Terms of Use. Please read them carefully before proceeding.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#00a4c4]">2. Your Privacy Matters</h3>
        <p className="mb-6 text-gray-700">
          We take your privacy seriously. Our{" "}
          <a href="/privacy" className="underline text-[#00a4c4] hover:text-[#0077b6] transition-colors">
            Privacy Policy
          </a>{" "}
          explains how we collect, use, and protect your personal information.
          By using our services, you consent to those practices.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#00a4c4]">3. How You Can Use Our Site</h3>
        <p className="mb-6 text-gray-700">
          You may use our website for personal, non-commercial purposes only.
          Any unauthorized use, including scraping, redistribution, or modification of content without permission is strictly prohibited.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#00a4c4]">4. No Warranties. No Guarantees.</h3>
        <p className="mb-6 text-gray-700">
          The website and its content are provided “as is” and “as available,”
          without warranties of any kind, either express or implied. We do not
          guarantee continuous or secure access to the site.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#00a4c4]">5. Questions?</h3>
        <p className="mb-4 text-gray-700">
          If you have any questions about these Terms of Use, feel free to reach out to us at{" "}
          <a
            href="mailto:support@applehome.com"
            className="underline text-[#00a4c4] hover:text-[#0077b6] transition-colors"
          >
            support@applehome.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default Terms;