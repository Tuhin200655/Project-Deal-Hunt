"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero({ children }) {
  const handleScrollDown = () => {
    // Scroll to the next section (the main content after the hero)
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-20 px-4 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium mb-6"
        >
          Made with ❤️ by Tuhin
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold text-gray-900 mb-4 tracking-tight"
        >
          Never Miss a Price Drop
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Track prices from any e-commerce site. Get instant alerts when prices
          drop. Save money effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>

      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 1 },
          y: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors cursor-pointer text-gray-500 hover:text-orange-500"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
