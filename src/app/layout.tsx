import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import NeonCursor from '@/components/NeonCursor'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Interludeal - Portfolio',
  description: '웹서버보안프로그래밍 중간과제 - 개인 포트폴리오 사이트',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16`}
      >
        <NeonCursor />
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
