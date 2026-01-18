"use client";

import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductGrid({ products }) {
    // Split products into two columns for masonry effect
    const leftColumn = products.filter((_, i) => i % 2 === 0);
    const rightColumn = products.filter((_, i) => i % 2 !== 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-7xl mx-auto px-4 pb-20">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
                {leftColumn.map((product) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
                {rightColumn.map((product) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
