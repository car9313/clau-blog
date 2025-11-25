'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
    code: string
    language: string
    fileName?: string
}

export function CodeBlock({ code, language, fileName }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Error al copiar: ', err)
            // Fallback para navegadores más antiguos
            const textArea = document.createElement('textarea')
            textArea.value = code
            document.body.appendChild(textArea)
            textArea.select()
            try {
                document.execCommand('copy')
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (fallbackErr) {
                console.error('Fallback copy failed: ', fallbackErr)
            }
            document.body.removeChild(textArea)
        }
    }

    // Fallback simple si react-syntax-highlighter falla
    const renderFallbackCode = () => (
        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded overflow-x-auto text-sm font-mono whitespace-pre-wrap">
            <code>{code}</code>
        </pre>
    )

    const renderCodeWithHighlighter = () => {
        try {
            // Importación dinámica para evitar errores en build
            const { Prism: SyntaxHighlighter } = require('react-syntax-highlighter')
            const { coldarkDark } = require('react-syntax-highlighter/dist/esm/styles/prism')

            return (
                <SyntaxHighlighter
                    language={language}
                    style={coldarkDark}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                    }}
                    showLineNumbers
                    wrapLines
                >
                    {code}
                </SyntaxHighlighter>
            )
        } catch (error) {
            console.warn('react-syntax-highlighter failed, using fallback:', error)
            return renderFallbackCode()
        }
    }

    return (
        <div className="relative my-6 rounded-lg border bg-zinc-950 group">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700">
                <div className="flex items-center gap-2">
                    {fileName && (
                        <span className="text-sm text-zinc-400">{fileName}</span>
                    )}
                    <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-300">
                        {language}
                    </span>
                </div>
                <Button
                    variant="ghost" // Cambiado de "link" a "ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="h-8 px-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all duration-200 flex items-center gap-2"
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4" />
                            <span className="text-xs">Copiado!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" />
                            <span className="text-xs">Copiar</span>
                        </>
                    )}
                </Button>
            </div>
            {renderCodeWithHighlighter()}
        </div>
    )
}