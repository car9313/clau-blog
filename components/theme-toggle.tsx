"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Evitar hidration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const toggleTheme = () => {
    console.log("Current theme:", theme) // Para debug
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-500 transition-all duration-300" />
      ) : (
        <Moon className="h-4 w-4 text-slate-600 transition-all duration-300" />
      )}
      <span className="sr-only">{theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}</span>
    </Button>
  )
}
