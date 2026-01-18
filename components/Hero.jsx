"use client";

import { motion } from "framer-motion";
import { ChevronDown, TrendingDown, Bell } from "lucide-react";

export default function Hero({ children }) {
  const handleScrollDown = () => {
    // Scroll to the next section (the main content after the hero)
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-20 px-4 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto text-center w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200 text-violet-700 px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-sm"
        >
          Made with ❤️ by Tuhin
        </motion.div>

        <div className="relative inline-block">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 mb-6 tracking-tight pb-2"
          >
            Never Miss a <br className="hidden md:block" /> Price Drop
          </motion.h2>

          {/* Floating Element 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden md:flex absolute -left-32 top-10 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 items-center gap-3 rotate-[-12deg]"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Price Drop!</div>
              <div className="text-sm font-bold text-gray-900">-25% Off</div>
            </div>
          </motion.div>

          {/* Floating Element 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden md:flex absolute -right-24 bottom-10 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 items-center gap-3 rotate-[12deg]"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">New Alert</div>
              <div className="text-sm font-bold text-gray-900">In Stock</div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Track prices from any e-commerce site. Get instant alerts when prices
          drop. Save money effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-20"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors cursor-pointer text-gray-500 hover:text-violet-600"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
