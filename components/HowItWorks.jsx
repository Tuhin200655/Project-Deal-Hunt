"use client";

import { motion } from "framer-motion";
import { Search, Bell, TrendingDown } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Paste URL",
    description: "Copy the product link from any online store and paste it here.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: TrendingDown,
    title: "Track Price",
    description: "We monitor the price 24/7 and record price history.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Bell,
    title: "Get Alerted",
    description: "Receive an instant email notification when the price drops.",
    color: "bg-pink-100 text-pink-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start saving money in three simple steps. No complicated setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${step.color}`}
              >
                <step.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Decorative number */}
              <div className="absolute top-4 right-6 text-6xl font-black opacity-5 select-none pointer-events-none">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
