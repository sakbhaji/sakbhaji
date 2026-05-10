import Link from 'next/link'
import { LayoutDashboard, ShoppingCart, BarChart3, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">SakBhaji</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/orders" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary">
          <ShoppingCart className="h-5 w-5" />
          Orders
        </Link>
        <Link href="/analytics" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary">
          <BarChart3 className="h-5 w-5" />
          Analytics
        </Link>
      </nav>
      <div className="border-t p-4">
        <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary">
          <Settings className="h-5 w-5" />
          Settings / Logout
        </Link>
      </div>
    </aside>
  )
}
