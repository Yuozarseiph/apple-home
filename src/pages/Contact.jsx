// pages/Contact.jsx
import React from "react";
import AnimatedFormContainer from "../components/AnimatedFormContainer";
import AnimatedFormItem from "../components/AnimatedFormItem";
import { styles } from "../utils/Styles";
import CreativeButton from "../components/CreativeButton";

export default function Contact() {
  // Optional: handle contact form submission with DynamicIsland
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (typeof window.showIslandMessage === "function") {
      window.showIslandMessage("Your message has been sent!", {
        color: "#4ade80",
        duration: 2.5,
      });
    }
  };

  return (
    <AnimatedFormContainer
      title="Let’s talk."
      intro="Got a question or need support? We’re here to help. Reach out and we’ll get back to you soon."
      altText='Or reach us at <a href="mailto:support@applehome.com" class="underline hover:text-[#00a4c4] transition-colors">support@applehome.com</a>'
      onSubmit={handleContactSubmit}
    >
      {/* Full Name */}
      <AnimatedFormItem label="Your Name" index={0}>
        <input
          type="text"
          id="name"
          className={`${styles.inoutStyles} pl-5`}
          placeholder="Enter your name"
        />
      </AnimatedFormItem>

      {/* Email */}
      <AnimatedFormItem label="Your Email Address" index={1}>
        <input
          type="email"
          id="email"
          className={`${styles.inoutStyles} pl-5`}
          placeholder="Enter your email"
        />
      </AnimatedFormItem>

      {/* Message */}
      <AnimatedFormItem label="What’s on your mind?" index={2}>
        <textarea
          rows="4"
          className={`${styles.inoutStyles} rounded-xl resize-none pl-5 pr-4`}
          placeholder="Your message"
        ></textarea>
      </AnimatedFormItem>

      {/* Submit Button */}
      <div className="mt-6">
        <CreativeButton text="Send Message" />
      </div>
    </AnimatedFormContainer>
  );
}