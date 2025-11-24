'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'

interface CodeInserterProps {
  onInsert: (code: string, language: string) => void
  onClose: () => void
}

const languages = [
  'javascript', 'typescript', 'jsx', 'tsx', 'python', 'java',
  'cpp', 'c', 'csharp', 'php', 'ruby', 'go', 'rust', 'swift',
  'html', 'css', 'scss', 'sql', 'json', 'yaml', 'markdown', 'bash'
]

export function CodeInserter({ onInsert, onClose }: CodeInserterProps) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [fileName, setFileName] = useState('')

  const handleInsert = () => {
    if (code.trim()) {
      onInsert(code, language)
    }
  }

  return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Insertar Código</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  Lenguaje
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  Nombre del archivo (opcional)
                </label>
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="ej: component.tsx"
                    className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Código
              </label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Pega o escribe tu código aquí..."
                className="min-h-[300px] font-mono text-sm"
                style={{ tabSize: 2 }}
              />
            </div>

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
      </div>
  )
}