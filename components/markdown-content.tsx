
import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './code-block'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code({ children, className, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const code = String(children).replace(/\n$/, '')
            
            if (match) {
              return (
                <CodeBlock
                  code={code}
                  language={match[1]}
                  {...props}
                />
              )
            }
            
            return (
              <code 
                className="px-1.5 py-0.5 rounded text-sm"
                style={{
                  backgroundColor: 'var(--code-inline-bg)',
                  color: 'var(--code-inline-text)'
                }}
                {...props}
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