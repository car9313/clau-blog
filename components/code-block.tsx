'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
    code: string
    language: string
    fileName?: string
}

export function CodeBlock({ code, language, fileName }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const { theme } = useTheme()

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Estilos diferentes para modo claro y oscuro
    const isDark = theme === 'dark'
    const syntaxStyle = isDark ? coldarkDark : prism

    // Colores para modo claro
    const lightColors = {
        background: 'bg-gray-50',
        border: 'border-gray-200',
        headerBackground: 'bg-gray-100',
        headerBorder: 'border-gray-200',
        languageBadge: 'bg-gray-200 text-gray-700',
        fileName: 'text-gray-600',
        button: 'text-gray-500 hover:text-gray-700'
    }

    // Colores para modo oscuro
    const darkColors = {
        background: 'bg-zinc-900',
        border: 'border-zinc-700',
        headerBackground: 'bg-zinc-800',
        headerBorder: 'border-zinc-700',
        languageBadge: 'bg-zinc-700 text-zinc-300',
        fileName: 'text-zinc-400',
        button: 'text-zinc-400 hover:text-zinc-100'
    }

    const colors = isDark ? darkColors : lightColors

    return (
        <div className={`relative my-6 rounded-lg border ${colors.background} ${colors.border}`}>
            {/* Header del bloque de código */}
            <div className={`flex items-center justify-between px-4 py-2 border-b ${colors.headerBorder} ${colors.headerBackground}`}>
                <div className="flex items-center gap-2">
                    {fileName && (
                        <span className={`text-sm ${colors.fileName}`}>
                            {fileName}
                        </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${colors.languageBadge}`}>
                        {language}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className={`h-8 px-2 ${colors.button}`}
                >
                    {copied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Código con sintaxis */}
            <SyntaxHighlighter
                language={language}
                style={syntaxStyle}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    border: 'none',
                    borderRadius: '0 0 0.5rem 0.5rem'
                }}
                showLineNumbers
                wrapLines
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}