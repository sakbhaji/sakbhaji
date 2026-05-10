import Link from 'next/link'
import { LayoutDashboard, ShoppingCart, BarChart3 } from 'lucide-react'

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t bg-white md:hidden">
      <Link href="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-600 hover:text-primary active:text-primary">
        <LayoutDashboard className="h-5 w-5" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link href="/orders" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-600 hover:text-primary active:text-primary">
        <ShoppingCart className="h-5 w-5" />
        <span className="text-[10px] font-medium">Orders</span>
      </Link>
      <Link href="/analytics" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-600 hover:text-primary active:text-primary">
        <BarChart3 className="h-5 w-5" />
        <span className="text-[10px] font-medium">Analytics</span>
      </Link>
    </nav>
  )
}
