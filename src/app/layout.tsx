import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SakBhaji Dashboard',
  description: 'Admin dashboard for SakBhaji WhatsApp vegetable delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <MobileNav />
        </div>
      </body>
    </html>
  )
}
