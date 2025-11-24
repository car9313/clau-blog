import { Button } from "@/components/ui/button"
import { Code, ImageIcon, Bold, Italic, List, Link2, Quote, Heading1 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EditorToolbarProps {
  onInsertCode: () => void
  onInsertImage: () => void
  onFormat: (type: string) => void
}

export function EditorToolbar({ onInsertCode, onInsertImage, onFormat }: EditorToolbarProps) {
  const formattingOptions = [
    { type: "bold", icon: Bold, label: "Negrita", shortcut: "Ctrl+B" },
    { type: "italic", icon: Italic, label: "Cursiva", shortcut: "Ctrl+I" },
    { type: "link", icon: Link2, label: "Enlace", shortcut: "Ctrl+K" },
    { type: "list", icon: List, label: "Lista", shortcut: "Ctrl+Shift+L" },
    { type: "heading", icon: Heading1, label: "Título", shortcut: "Ctrl+Shift+1" },
    { type: "quote", icon: Quote, label: "Cita", shortcut: "Ctrl+Shift+Q" },
  ]

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Botones de formato */}
        {formattingOptions.map((option) => (
          <Tooltip key={option.type}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFormat(option.type)}
                className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <option.icon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{option.label} ({option.shortcut})</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Separador */}
        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Botones de medios */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onInsertCode}
              className="h-8 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
            >
              <Code className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">Código</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Insertar bloque de código</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onInsertImage}
              className="h-8 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">Imagen</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Insertar imagen</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}