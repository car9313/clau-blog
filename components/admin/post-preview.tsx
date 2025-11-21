"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Calendar, Clock, User } from "lucide-react"
import { motion } from "framer-motion"

interface PostPreviewProps {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  tags: string[]
  readTime: string
  onBack: () => void
  onSave: () => void
}

export function PostPreview({
  title,
  excerpt,
  content,
  category,
  author,
  tags,
  readTime,
  onBack,
  onSave,
}: PostPreviewProps) {
  // Función simple para convertir markdown a HTML
  const markdownToHtml = (markdown: string) => {
    return (
      markdown
        // Código en bloque
        .replace(
          /```(\w+)?\n([\s\S]*?)```/g,
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-$1">$2</code></pre>',
        )
        // Código inline
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>')
        // Imágenes
        .replace(/!\[([^\]]*)\]$$([^)]+)$$/g, '<img src="$2" alt="$1" class="w-full rounded-lg my-4" />')
        // Enlaces
        .replace(
          /\[([^\]]+)\]$$([^)]+)$$/g,
          '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>',
        )
        // Negrita
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        // Cursiva
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        // Títulos
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
        // Listas
        .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
        .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-4">$1</ul>')
        // Párrafos
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/^/, '<p class="mb-4">')
        .replace(/$/, "</p>")
    )
  }

  const htmlContent = markdownToHtml(content)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver al editor
        </Button>
        <Button onClick={onSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Publicar Post
        </Button>
      </div>

      {/* Preview */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        {/* Header del post */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {title || "Título del post"}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {excerpt || "Resumen del post..."}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readTime}
            </div>
            {category && (
              <Badge variant="outline" className="ml-auto">
                {category}
              </Badge>
            )}
          </div>
        </header>

        {/* Contenido */}
        <div
          className="prose prose-lg prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </motion.article>
    </div>
  )
}
