"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            onMouseEnter={() => setHoveredTab(category)}
            onMouseLeave={() => setHoveredTab(null)}
            className={`
              relative px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 z-10 whitespace-nowrap
              ${
                activeCategory === category
                  ? "text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              }
            `}
          >
            {/* Background activo */}
            {activeCategory === category && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Background hover */}
            {hoveredTab === category && activeCategory !== category && (
              <motion.div
                layoutId="hoverTab"
                className="absolute inset-0 bg-slate-100 dark:bg-slate-700 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}

            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
