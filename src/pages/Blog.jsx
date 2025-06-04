import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Blog() {
  const titleRef = useRef();
  const cardRefs = useRef([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: "power2.out" }
      );
    }
    cardRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
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
    <div className="bg-image-iPhone text-white min-h-screen py-20 pb-[120px] pt-30">
      <section className="container mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold mb-12 text-center text-[#7EC8E3] drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]"
        >
          Discover the Experience
        </h1>
        <div className="grid md:grid-cols-3 gap-12">
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="relative w-full rounded-2xl p-8 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
              Designing for Connection
            </h3>
            <p className="mb-6 text-white">
              How thoughtful design brings people closer — and makes every
              interaction feel more natural, more human.
            </p>
            <Link
              to="/blog/designing-for-connection"
              className="text-[#7EC8E3]"
            >
              Read more
            </Link>
          </div>
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="relative w-full rounded-2xl p-8 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
              Strength Through Simplicity
            </h3>
            <p className="mb-6 text-white">
              The most powerful experiences are often the simplest. Here’s how
              we build products that empower without overwhelming.
            </p>
            <Link
              to="/blog/strength-through-simplicity"
              className="text-[#7EC8E3]"
            >
              Read more
            </Link>
          </div>
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className="relative w-full rounded-2xl p-8 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#7EC8E3]">
              The Future of Everyday Tech
            </h3>
            <p className="mb-6 text-white">
              Technology should evolve with you. We explore how smart,
              sustainable design is shaping the home of tomorrow — today.
            </p>
            <Link
              to="/blog/the-future-of-everyday-tech"
              className="text-[#7EC8E3]"
            >
              Read more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
