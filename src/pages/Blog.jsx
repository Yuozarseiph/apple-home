import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../assets/bg-all.webp"

// GSAP plugin registration
gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Set up GSAP animations for blog cards
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }

    cardRefs.current.forEach((card, index) => {
      const direction = index % 2 === 0 ? -100 : 100;

      gsap.fromTo(
        card,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          ease: "power3.out",
        }
      );
    });

    return () => {
      // Optional cleanup
    };
  }, []);

  // Utility to assign ref with array support
  const setCardRef = (index) => (el) => {
    cardRefs.current[index] = el;
  };

  return (
    <div className="bg-image-iPhone text-gray-800 min-h-screen py-20 pb-[120px] pt-30">
      <section className="container mx-auto px-6">
        {/* Title */}
        <h1
          ref={sectionRef}
          className="text-4xl font-extrabold mb-12 text-center text-[#00a4c4] drop-shadow-[0_2px_16px_rgba(0,164,196,0.4)]"
        >
          Discover the Experience
        </h1>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div
            ref={setCardRef(0)}
            className="max-w-sm bg-white/80 border border-gray-200 rounded-xl shadow-lg"
          >
            <Link to="/blog/designing-for-connection">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={bg}
                alt="bg-all.webp"
              />
            </Link>
            <div className="p-6">
              <Link to="/blog/designing-for-connection">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                  Designing for Connection
                </h5>
              </Link>
              <p className="mb-4 text-gray-700">
                How thoughtful design brings people closer — and makes every interaction feel more natural, more human.
              </p>
              <Link
                to="/blog/designing-for-connection"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full hover:from-blue-600 hover:to-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
              >
                Read more
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={setCardRef(1)}
            className="max-w-sm bg-white/80 border border-gray-200 rounded-xl shadow-lg"
          >
            <Link to="/blog/the-future-of-everyday-tech">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={bg}
                alt=""
              />
            </Link>
            <div className="p-6">
              <Link to="/blog/the-future-of-everyday-tech">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                  The Future of Everyday Tech
                </h5>
              </Link>
              <p className="mb-4 text-gray-700">
                Technology should evolve with you. We explore how smart, sustainable design is shaping the home of tomorrow — today.
              </p>
              <Link
                to="/blog/the-future-of-everyday-tech"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full hover:from-blue-600 hover:to-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
              >
                Read more
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={setCardRef(2)}
            className="max-w-sm bg-white/80 border border-gray-200 rounded-xl shadow-lg"
          >
            <Link to="/blog/strength-through-simplicity">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={bg}
                alt=""
              />
            </Link>
            <div className="p-6">
              <Link to="/blog/strength-through-simplicity">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                  Strength Through Simplicity
                </h5>
              </Link>
              <p className="mb-4 text-gray-700">
                The most powerful experiences are often the simplest. Here’s how we build products that empower without overwhelming.
              </p>
              <Link
                to="/blog/strength-through-simplicity"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full hover:from-blue-600 hover:to-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
              >
                Read more
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}