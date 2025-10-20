import React, { useState, cloneElement, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedFormItem = ({ label, children, index, icon, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const GREEN_COLOR = "#00d5be";

  const handleFocus = (e) => {
    setIsFocused(true);
    if (children.props.onFocus) children.props.onFocus(e);
  };
  const handleBlur = (e) => {
    setIsFocused(false);
    if (children.props.onBlur) children.props.onBlur(e);
  };

  const child = Children.only(children);
  const clonedChild = cloneElement(child, {
    ...child.props,
    onFocus: handleFocus,
    onBlur: handleBlur,
    className: `${child.props.className || ''} w-full p-3 ${icon ? 'pl-12' : ''} text-base text-white bg-gray-800 rounded-md focus:outline-none`,
  });

  const containerVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}};
  const labelVariants = { rest: { y: 0, color: "#9ca3af" }, focused: { y: -5, color: GREEN_COLOR }};

  return (
    <motion.div variants={containerVariants} className="w-full mb-6">
      <motion.label htmlFor={child.props.id} className="block text-sm mb-2 font-medium" variants={labelVariants} animate={isFocused ? "focused" : "rest"}>
        {label}
      </motion.label>
      <motion.div className="relative"
        animate={{ boxShadow: isFocused ? `0 0 0 2px ${GREEN_COLOR}, 0 0 15px ${GREEN_COLOR}66` : `0 0 0 0px #00000000`}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ borderRadius: '6px' }}
      >
        {icon && React.cloneElement(icon, { className: `absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused ? 'text-[#00d5be]' : 'text-gray-400'}` })}
        {clonedChild}
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedFormItem;
