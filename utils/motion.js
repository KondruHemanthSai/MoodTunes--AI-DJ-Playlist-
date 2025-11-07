// Framer Motion animation variants and utilities for MoodTunes

export const fadeIn = (direction = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      delay,
    },
  },
});

export const slideUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

export const slideIn = (direction = 'left', delay = 0) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
    y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      delay,
    },
  },
});

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

export const musicWave = {
  animate: {
    height: [8, 24, 8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const spotifyGlow = {
  initial: {
    boxShadow: '0 0 0 rgba(29, 185, 84, 0)',
  },
  hover: {
    boxShadow: '0 8px 25px rgba(29, 185, 84, 0.3)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const pulseGreen = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const rotateAnimation = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Page transition variants
export const pageTransition = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Button hover effects
export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: 'easeInOut',
  },
};

// Card animations
export const cardHover = {
  y: -10,
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

// Spotify-specific animations
export const spotifyButton = {
  hover: {
    scale: 1.05,
    boxShadow: '0 8px 25px rgba(29, 185, 84, 0.3)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
};

export const playlistCard = {
  hover: {
    y: -4,
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(29, 185, 84, 0.5)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Loading animations
export const loadingSpinner = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const loadingDots = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};