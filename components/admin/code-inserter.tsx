"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Code, Copy } from "lucide-react"
import { motion } from "framer-motion"

interface CodeInserterProps {
  onInsert: (code: string, language: string) => void
  onClose: () => void
}

export function CodeInserter({ onInsert, onClose }: CodeInserterProps) {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [title, setTitle] = useState("")

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
    { value: "json", label: "JSON" },
    { value: "bash", label: "Bash" },
    { value: "sql", label: "SQL" },
    { value: "php", label: "PHP" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "yaml", label: "YAML" },
    { value: "markdown", label: "Markdown" },
  ]

  const handleInsert = () => {
    if (code.trim()) {
      onInsert(code, language)
    }
  }

  const exampleCode = {
    javascript: `function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}

console.log(saludar("Mundo"));`,
    typescript: `interface Usuario {
  id: number;
  nombre: string;
}

function obtenerUsuario(id: number): Usuario {
  return { id, nombre: "Juan" };
}`,
    python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`,
    css: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
    html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Página</title>
</head>
<body>
    <h1>Hola Mundo</h1>
</body>
</html>`,
  }

  const loadExample = () => {
    const example = exampleCode[language as keyof typeof exampleCode]
    if (example) {
      setCode(example)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-auto"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Insertar Código
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Configuración */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Lenguaje</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Título (opcional)</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ej: Función de ejemplo" />
              </div>
            </div>

            {/* Botones de ayuda */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadExample}>
                Cargar ejemplo
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(code)} disabled={!code}>
                <Copy className="w-4 h-4 mr-1" />
                Copiar
              </Button>
            </div>

            {/* Editor de código */}
            <div>
              <label className="text-sm font-medium mb-2 block">Código</label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Pega o escribe tu código aquí..."
                className="min-h-[300px] font-mono text-sm"
                style={{ tabSize: 2 }}
              />
            </div>

            {/* Preview */}
            {code && (
              <div>
                <label className="text-sm font-medium mb-2 block">Vista previa</label>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{language}</span>
                    {title && <span className="text-xs text-gray-300">{title}</span>}
                  </div>
                  <pre className="text-sm">
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleInsert} disabled={!code.trim()}>
                Insertar Código
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
