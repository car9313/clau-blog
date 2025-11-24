'use client'

import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './code-block'
import { useTheme } from 'next-themes'

interface MarkdownContentProps {
    content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    return (
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none animate-fade-in-up animation-delay-300">
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
                            <code
                                className={`px-1.5 py-0.5 rounded text-sm ${isDark
                                    ? 'bg-zinc-800 text-zinc-100'
                                    : 'bg-gray-200 text-gray-800'
                                    }`}
                                {...rest}
                            >
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}