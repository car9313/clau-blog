"use client";

import Link from "next/link";
import { PenTool, FileText, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface AdminHeaderProps {
  activeView: "editor" | "posts";
  onViewChange: (view: "editor" | "posts") => void;
}

export function AdminHeader({ activeView, onViewChange }: AdminHeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DW</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
              DevWeb Admin
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant={activeView === "posts" ? "default" : "ghost"}
              onClick={() => onViewChange("posts")}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Posts
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Ver Blog</span>
              </Button>
            </Link>
            <ThemeToggle />
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex gap-2">
            <Button
              variant={activeView === "posts" ? "default" : "ghost"}
              onClick={() => onViewChange("posts")}
              className="flex-1 flex items-center gap-2"
              size="sm"
            >
              <FileText className="w-4 h-4" />
              Posts
            </Button>
            <Button
              variant={activeView === "editor" ? "default" : "ghost"}
              onClick={() => onViewChange("editor")}
              className="flex-1 flex items-center gap-2"
              size="sm"
            >
              <PenTool className="w-4 h-4" />
              Escribir
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
