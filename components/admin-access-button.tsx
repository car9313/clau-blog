"use client"

import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AdminAccessButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <Link href="/admin">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Shield className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          <span className="hidden sm:inline font-medium">Admin</span>
        </Button>
      </Link>

      {showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
          Panel de Administración
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
        </div>
      )}
    </div>
  )
}
