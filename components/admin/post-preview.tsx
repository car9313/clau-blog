"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Calendar, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import ReactMarkdown from 'react-markdown'

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
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                    <ReactMarkdown
                        components={{
                            code(props) {
                                const { children, className, node, ...rest } = props
                                const match = /language-(\w+)/.exec(className || '')
                                const code = String(children).replace(/\n$/, '')

                                // Determinar si es código inline o bloque
                                const isInline = !className || !match

                                if (!isInline && match) {
                                    return (
                                        <CodeBlock
                                            code={code}
                                            language={match[1]}
                                            {...rest}
                                        />
                                    )
                                }

                                return (
                                    <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-sm" {...rest}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </motion.article>
        </div>
    )
}