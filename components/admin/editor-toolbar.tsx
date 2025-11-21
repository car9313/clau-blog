"use client"

import { Button } from "@/components/ui/button"
import { Code, ImageIcon, Bold, Italic, List, Link2 } from "lucide-react"

interface EditorToolbarProps {
  onInsertCode: () => void
  onInsertImage: () => void
  onFormat: (type: string) => void
}

export function EditorToolbar({ onInsertCode, onInsertImage, onFormat }: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Formato de texto */}
      <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormat("bold")}
          className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Negrita (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormat("italic")}
          className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Cursiva (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </Button>
      </div>

      {/* Enlaces y listas */}
      <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormat("link")}
          className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Insertar enlace"
        >
          <Link2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormat("list")}
          className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Lista"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      {/* Medios */}
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onInsertCode}
          className="h-8 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
          title="Insertar código"
        >
          <Code className="w-4 h-4" />
          <span className="text-xs hidden sm:inline">Código</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onInsertImage}
          className="h-8 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
          title="Insertar imagen"
        >
          <ImageIcon className="w-4 h-4" />
          <span className="text-xs hidden sm:inline">Imagen</span>
        </Button>
      </div>
    </div>
  )
}
