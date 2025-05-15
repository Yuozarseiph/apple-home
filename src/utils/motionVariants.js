// Parent container variant for animating child elements with delay
export const containerVariant = {
  hidden: { opacity: 0 }, // Initial state: invisible
  visible: {
    opacity: 1, // Final state: visible
    transition: {
      staggerChildren: 0.25, // Delay between each child animation
      delayChildren: 0.3     // Wait before starting children animations
    }
  }
};

// Variant for items inside the container (like cards, list items, etc.)
export const itemVariant = {
  hidden: { y: 40, opacity: 0 }, // Start lower and transparent
  visible: (i) => ({             // Can receive a custom index (i) if needed
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

// Generic variant for scaling and glowing elements on hover/tap (e.g. buttons)
export const hoverTapVariant = {
  hover: { scale: 1.1, boxShadow: "0 0 20px #7ec8e3" }, // Slight scale and glow
  tap: { scale: 0.95 } // Slight shrink on click/tap
};

// Variant for links or small interactive elements
export const linkVariant = {
  hover: { scale: 1.05 }, // Slight scale on hover
  tap: { scale: 0.95 }    // Shrink on click
};

// Variant for social icons with direction-based rotation
export const socialIconVariant = {
  hover: (dir) => ({
    scale: 1.3,
    rotate: dir, // Rotate in the direction passed (e.g. 10, -10)
    transition: { type: "spring", stiffness: 300 }
  })
};
