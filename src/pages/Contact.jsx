// pages/Contact.jsx
import React from "react";
import AnimatedFormContainer from "../components/AnimatedFormContainer";
import AnimatedFormItem from "../components/AnimatedFormItem";
import { styles } from "../utils/Styles";

export default function Contact() {
  // Add your own handleContactSubmit function if you want to show DynamicIsland messages
  // Example:
  // const handleContactSubmit = (e) => {
  //   e.preventDefault();
  //   if (typeof window.showIslandMessage === "function") {
  //     window.showIslandMessage("Your message has been sent!", { color: "#4ade80" });
  //   }
  // };

  return (
    <AnimatedFormContainer
      title="Let’s talk."
      intro="Got a question or need support? We’re here to help. Reach out and we’ll get back to you soon."
      button={{
        className: styles.btnStyle + " w-full",
        text: "Send Message",
      }}
      altText='Or reach us at <a href="mailto:support@applehome.com" class="underline">support@applehome.com</a>'
      // onSubmit={handleContactSubmit}
    >
      <AnimatedFormItem label="Your Name" index={0}>
        <input
          type="text"
          id="name"
          className={styles.inoutStyles + " pl-5"}
          placeholder="Enter your name"
        />
      </AnimatedFormItem>

      <AnimatedFormItem label="Your Email Address" index={1}>
        <input
          type="email"
          id="email"
          className={styles.inoutStyles + " pl-5"}
          placeholder="Enter your email"
        />
      </AnimatedFormItem>

      <AnimatedFormItem label="What’s on your mind?" index={2}>
        <textarea
          rows="4"
          className="resize-none w-full py-3 pl-5 pr-4 rounded-xl border-none bg-gradient-to-r from-[#4d4d4d2c] to-[#7ec8e31a] text-white placeholder:text-[#A6C8E3] shadow-lg shadow-[#7ec8e320] focus:outline-none focus:bg-gradient-to-r focus:from-[#7ec8e340] focus:to-[#fff1] focus:shadow-[0_0_0_2px_#7EC8E3,0_2px_24px_#7ec8e380] transition"
          placeholder="Your message"
        ></textarea>
      </AnimatedFormItem>
    </AnimatedFormContainer>
  );
}
