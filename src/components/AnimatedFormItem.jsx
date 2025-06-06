// components/AnimatedFormItem.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const AnimatedFormItem = ({ label, children, index }) => {
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!labelRef.current || !inputRef.current) return;

    // Initial setup
    gsap.set([labelRef.current, inputRef.current], { opacity: 0 });

    // Animate with delay based on index
    const labelDelay = 0.4 + index * 0.2;
    const inputDelay = 0.5 + index * 0.2;

    gsap.to(labelRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay: labelDelay,
      ease: "power2.out",
    });

    gsap.to(inputRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay: inputDelay,
      ease: "power2.out",
    });
  }, [index]);

  return (
    <div>
      <label
        ref={labelRef}
        htmlFor={`input-${index}`}
        className="block text-lg mb-2 text-[#00a4c4] font-medium"
      >
        {label}
      </label>
      <div ref={inputRef}>{children}</div>
    </div>
  );
};

export default AnimatedFormItem;