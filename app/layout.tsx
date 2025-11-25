import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "DevWeb Blog - Programación Web Moderna",
  description: "Tu fuente de conocimiento sobre programación web moderna",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="devweb-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
