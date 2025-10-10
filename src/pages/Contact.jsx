import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

// The custom components we've already redesigned
import AnimatedFormContainer from "../components/AnimatedFormContainer";
import AnimatedFormItem from "../components/AnimatedFormItem";
import CreativeButton from "../components/CreativeButton"; // Assuming the final version is used

// Note: The `inputStyles` const is no longer needed because AnimatedFormItem now handles all styling.
// The toast function can be kept as is, or replaced with a library like react-hot-toast.

const InfoBlock = ({ Icon, title, children }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
      <Icon className="text-[#00d5be]" size={24} />
    </div>
    <div>
      <h4 className="font-semibold text-white text-lg">{title}</h4>
      <div className="text-gray-400">{children}</div>
    </div>
  </div>
);


export default function Contact() {
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Your toast logic here
    console.log("Form submitted!");
  };

  return (
    // We use the page container from AnimatedFormContainer directly
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: The Form */}
          <AnimatedFormContainer
            title="Let’s talk."
            intro="Got a question or need support? We’re here to help."
            onSubmit={handleContactSubmit}
          >
            {/* The new AnimatedFormItem works seamlessly */}
            <AnimatedFormItem label="Your Name" index={0}>
              <input type="text" id="name" placeholder=" " />
            </AnimatedFormItem>

            <AnimatedFormItem label="Your Email Address" index={1}>
              <input type="email" id="email" placeholder=" " />
            </AnimatedFormItem>

            <AnimatedFormItem label="What’s on your mind?" index={2}>
              <textarea rows="4" id="message" placeholder=" " className="resize-none"></textarea>
            </AnimatedFormItem>

            <div className="mt-8">
              {/* Using the redesigned CreativeButton */}
              <CreativeButton text="Send Message" type="submit" />
            </div>
          </AnimatedFormContainer>

          {/* Right Column: Contact Info */}
          <motion.div 
            className="pt-16"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="space-y-8">
              <InfoBlock Icon={Mail} title="Email Us">
                <p>Our team is here to help.</p>
                <a href="mailto:support@applehome.com" className="text-[#00d5be] hover:underline">support@applehome.com</a>
              </InfoBlock>
              <InfoBlock Icon={MapPin} title="Find Us">
                <p>123 Innovation Drive,</p>
                <p>Tech City, 12345</p>
              </InfoBlock>
              <InfoBlock Icon={Phone} title="Call Us">
                <p>Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+123456789" className="text-[#00d5be] hover:underline">+1 (23) 456-789</a>
              </InfoBlock>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}