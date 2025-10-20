import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
const termsSections = [
    { 
        id: "agreement", 
        title: "1. Agreement to Terms", 
        content: `By accessing or using the Apple Home services, devices, and software ("Services"), you agree to be bound by these Terms of Use ("Terms"). This agreement constitutes a legally binding contract between you and Apple Home Inc. If you do not agree to these Terms, you may not access or use our Services. We reserve the right to modify these terms at any time, and your continued use of the Services constitutes acceptance of such changes.` 
    },
    { 
        id: "privacy", 
        title: "2. Privacy", 
        content: `Your privacy is not an afterthought; it is a fundamental part of our design philosophy. Our comprehensive <a href='/privacy' class='font-semibold text-[#00d5be] hover:underline'>Privacy Policy</a>, which is an integral part of these Terms, explains in detail how we collect, use, and protect your personal data with on-device processing and end-to-end encryption. We encourage you to read it carefully to understand our commitment to protecting your information.` 
    },
    {
        id: "accounts",
        title: "3. User Accounts",
        content: `To access most features of the Services, you must create an Apple Home account. You are responsible for safeguarding your account credentials, including your password, and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to comply with this security obligation.`
    },
    { 
        id: "use", 
        title: "4. Use of Our Services", 
        content: `You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use the Services: in any way that violates any applicable national or international law; to exploit, harm, or attempt to exploit or harm minors; to transmit any advertising or promotional material without our prior written consent; or to engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services. Prohibited activities also include attempting to reverse-engineer, decompile, or otherwise discover the source code of our software.`
    },
    {
        id: "property",
        title: "5. Intellectual Property",
        content: `The Services and all of their original content, features, and functionality are and will remain the exclusive property of Apple Home Inc. and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Apple Home Inc. Any feedback you provide is non-confidential and shall become our sole property.`
    },
    {
        id: "termination",
        title: "6. Termination",
        content: `We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. All provisions of the Terms which by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`
    },
    { 
        id: "warranties", 
        title: "7. Disclaimers and Limitation of Liability", 
        content: `The Services are provided on an "AS IS" and "AS AVAILABLE" basis. Your use of the Services is at your sole risk. We expressly disclaim all warranties of any kind, whether express or implied. We do not warrant that the Services will meet your specific requirements, or that the service will be uninterrupted, timely, secure, or error-free. You expressly understand and agree that Apple Home Inc. shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages.` 
    },
    { 
        id: "questions", 
        title: "8. Contact Information", 
        content: `If you have any questions regarding these terms, please do not hesitate to contact us. We believe in transparency and are happy to provide clarity and answer any questions you may have. You can reach our legal team at <a href='mailto:legal@applehome.com' class='font-semibold text-[#00d5be] hover:underline'>legal@applehome.com</a>.`
    },
];

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    return <motion.div className="fixed top-0 left-0 right-0 h-1 origin-left z-50" style={{ scaleX, backgroundColor: '#00d5be' }} />;
}

export default function Terms() {
  const [activeSection, setActiveSection] = useState(termsSections[0].id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } 
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleLinkClick = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const GREEN_COLOR = "#00d5be";

  return (
    <>
      <ScrollProgressBar />
      <div className="min-h-screen bg-black text-gray-300 pt-24 pb-28 px-4 md:px-6">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-your-abstract-bg.jpg')] bg-cover bg-fixed opacity-10" />
        
        <div className="container max-w-6xl mx-auto grid lg:grid-cols-4 gap-12">
          <motion.aside 
            className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">On this page</h3>
            <ul className="space-y-1">
              {termsSections.map(section => (
                <li key={section.id}>
                  <button onClick={() => handleLinkClick(section.id)} className="w-full text-left px-4 py-2 rounded-md transition-all duration-300">
                    <span className={`relative ${activeSection === section.id ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
                      {section.title}
                      {activeSection === section.id && (
                        <motion.div 
                          className="absolute -bottom-1 left-0 w-full h-0.5" 
                          style={{ backgroundColor: GREEN_COLOR }}
                          layoutId="underline" 
                        />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>

          <main className="lg:col-span-3">
            <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Terms of Use</h1>
              <p className="text-lg text-gray-400 mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </motion.div>
            
            <div className="space-y-8">
                {termsSections.map(section => (
                    <motion.section 
                        key={section.id}
                        id={section.id}
                        ref={el => sectionRefs.current[section.id] = el}
                        className="p-8 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-white">{section.title}</h2>
                        <div 
                            className="prose prose-lg prose-invert max-w-none prose-p:text-gray-400"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    </motion.section>
                ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
