import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sorteador de Números - sorteio.com',
  description: 'Sorteie números aleatórios de forma rápida e fácil. Personalize intervalos, quantidade e opções avançadas.',
  keywords: 'sorteio, números, aleatório, sorteador, loteria',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
