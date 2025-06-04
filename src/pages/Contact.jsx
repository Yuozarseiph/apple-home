import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import {styles} from "../utils/Styles";


export default function Contact() {
  const titleRef = useRef();
  const formRef = useRef();
  const introRef = useRef();
  const nameLabelRef = useRef();
  const nameInputRef = useRef();
  const emailLabelRef = useRef();
  const emailInputRef = useRef();
  const msgLabelRef = useRef();
  const msgInputRef = useRef();
  const btnRef = useRef();
  const altRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      }
    );
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      nameLabelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.4, ease: "power2.out" }
    );
    gsap.fromTo(
      nameInputRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      emailLabelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.6, ease: "power2.out" }
    );
    gsap.fromTo(
      emailInputRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.7, ease: "power2.out" }
    );
    gsap.fromTo(
      msgLabelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.8, ease: "power2.out" }
    );
    gsap.fromTo(
      msgInputRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.9, ease: "power2.out" }
    );
    gsap.fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 1.1, ease: "back.out(1.7)" }
    );
    gsap.fromTo(
      altRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, delay: 1.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-image-iPhone bg-cover bg-center px-4 pb-[120px]">
      <div
        ref={formRef}
        className="relative w-full max-w-md rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl"
      >
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold text-center text-[#7EC8E3] mb-8 drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]"
        >
          Let’s talk.
        </h1>

        <form className="space-y-5">
          <p
            ref={introRef}
            className="text-lg text-center mb-8 text-blue-100 font-medium drop-shadow-[0_1px_8px_rgba(126,200,227,0.2)]"
          >
            Got a question or need support? We’re here to help. Reach out and
            we’ll get back to you soon.
          </p>

          <label
            ref={nameLabelRef}
            htmlFor="name"
            className="block text-lg mb-2 text-[#7EC8E3]"
          >
            Your Name
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            className={styles.inoutStyles}
            placeholder="Enter your name"
          />

          <label
            ref={emailLabelRef}
            htmlFor="email"
            className="block text-lg mb-2 text-[#7EC8E3]"
          >
            Your Email Address
          </label>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            className={styles.inoutStyles}
            placeholder="Enter your email"
          />

          <label
            ref={msgLabelRef}
            htmlFor="message"
            className="block text-lg mb-2 text-[#7EC8E3]"
          >
            What’s on your mind?
          </label>
          <textarea
            ref={msgInputRef}
            id="message"
            rows="4"
            className="resize-none w-full py-3 pl-5 mb-4 rounded-xl border-none bg-gradient-to-r from-[#4d4d4d2c] to-[#7ec8e31a] text-white placeholder:text-[#A6C8E3] shadow-lg shadow-[#7ec8e320] focus:outline-none focus:bg-gradient-to-r focus:from-[#7ec8e340] focus:to-[#fff1] focus:shadow-[0_0_0_2px_#7EC8E3,0_2px_24px_#7ec8e380] transition"
            placeholder="Your message"
          ></textarea>

          <button
            ref={btnRef}
            type="submit"
            className={styles.btnStyle + " w-full"}
          >
            Send Message
          </button>

          <p ref={altRef} className="text-blue-200 text-base text-center mt-6">
            Or reach us at{" "}
            <a href="mailto:support@applehome.com" className="underline">
              support@applehome.com
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
