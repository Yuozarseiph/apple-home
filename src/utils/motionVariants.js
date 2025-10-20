export const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3
    }
  }
};

export const itemVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export const hoverTapVariant = {
  hover: { scale: 1.1, boxShadow: "0 0 20px #7ec8e3" },
  tap: { scale: 0.95 }
};

export const linkVariant = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const socialIconVariant = {
  hover: (dir) => ({
    scale: 1.3,
    rotate: dir,
    transition: { type: "spring", stiffness: 300 }
  })
};
