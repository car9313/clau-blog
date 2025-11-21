"use client";

import { useState, useMemo } from "react";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { ThemeToggle } from "@/components/theme-toggle";
import { CategoryTabs } from "@/components/category-tabs";
import { PostsGrid } from "@/components/posts-grid";
import { motion } from "framer-motion";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const categories = getAllCategories();

  const filteredPosts = useMemo(() => {
    return getPostsByCategory(activeCategory);
  }, [activeCategory]);

  const postCount = filteredPosts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header with theme toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-16">
          <motion.div
            className="flex items-center gap-3 animate-fade-in-delay-2 sm:hidden justify-center w-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </motion.div>

          <header className="text-center flex-1">
            <motion.h1
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              DevWeb Blog
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tu fuente de conocimiento sobre programación web moderna.
              Tutoriales, tips y las últimas tendencias en desarrollo frontend y
              backend.
            </motion.p>
          </header>
          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 animate-fade-in-delay-2">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Posts counter with animation */}
        <motion.div
          className="text-center mb-8"
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-slate-600 dark:text-slate-400">
            {activeCategory === "Todos" ? (
              <>
                Mostrando{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {postCount}
                </span>{" "}
                artículos
              </>
            ) : (
              <>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {postCount}
                </span>{" "}
                artículos en{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {activeCategory}
                </span>
              </>
            )}
          </p>
        </motion.div>

        {/* Posts grid with animations */}
        <PostsGrid posts={filteredPosts} activeCategory={activeCategory} />

        <motion.footer
          className="mt-20 text-center text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            &copy; 2024 DevWeb Blog. Compartiendo conocimiento sobre
            programación web.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
