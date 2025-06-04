import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function Terms() {
  const titleRef = useRef();
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: "power2.out" }
      );
    }
    sectionRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3 + i * 0.18,
            ease: "power2.out",
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-image-iPhone min-h-screen pt-24 pb-[120px] px-6 text-white">
      <section
        className="relative w-full max-w-4xl rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl mx-auto text-center mb-6"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold text-[#7EC8E3] mb-8 drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]"
        >
          Terms of Use
        </h1>
        <p className="mb-8 text-lg text-blue-100 font-medium drop-shadow-[0_1px_8px_rgba(126,200,227,0.2)] max-w-3xl mx-auto">
          Welcome to Apple Home. These Terms of Use govern your access to and
          use of our website, services, and products.
        </p>
      </section>

      <section
        className="relative w-full max-w-3xl rounded-2xl p-8 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl mx-auto mt-4 mb-6 text-left"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
          1. About This Agreement
        </h3>
        <p className="mb-6 text-white">
          By using our website or purchasing any product from us, you agree to
          be bound by these Terms of Use. Please read them carefully before
          proceeding.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
          2. Your Privacy Matters
        </h3>
        <p className="mb-6 text-white">
          We take your privacy seriously. Our{" "}
          <a href="/privacy" className="underline text-[#7EC8E3]">
            Privacy Policy
          </a>{" "}
          explains how we collect, use, and protect your personal information.
          By using our services, you consent to those practices.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
          3. How You Can Use Our Site
        </h3>
        <p className="mb-6 text-white">
          You may use our website for personal, non-commercial purposes only.
          Any unauthorized use, including scraping, redistribution, or
          modification of content without permission is strictly prohibited.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
          4. No Warranties. No Guarantees.
        </h3>
        <p className="mb-6 text-white">
          The website and its content are provided “as is” and “as available,”
          without warranties of any kind, either express or implied. We do not
          guarantee continuous or secure access to the site.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
          5. Questions?
        </h3>
        <p className="mb-4 text-white">
          If you have any questions about these Terms of Use, feel free to reach
          out to us at{" "}
          <a
            href="mailto:support@applehome.com"
            className="underline text-[#7EC8E3]"
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
