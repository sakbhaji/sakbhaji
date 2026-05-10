'use client';

import { ShoppingCart, IndianRupee, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { useOrders } from '@/hooks/useOrders'

export default function Dashboard() {
  const { orders, kpis } = useOrders();

  // Get the 5 most recent orders for the overview
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Orders Today</h3>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{kpis.totalOrdersToday}</div>
          <p className="text-xs text-muted-foreground">Live from Supabase (Mock)</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Revenue Today</h3>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">₹{kpis.revenueToday}</div>
          <p className="text-xs text-muted-foreground">Based on current orders</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Pending Deliveries</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{kpis.pendingDeliveries}</div>
          <p className="text-xs text-muted-foreground">Require attention</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Customers</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{kpis.activeCustomers}</div>
          <p className="text-xs text-muted-foreground">Unique numbers today</p>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-white shadow-sm">
          <div className="p-6 border-b">
            <h3 className="font-semibold leading-none tracking-tight">Recent Orders</h3>
            <p className="text-sm text-muted-foreground mt-2">Latest orders received via WhatsApp.</p>
          </div>
          <div className="p-6 pt-4">
            <div className="space-y-6">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{order.naam}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                        {(Array.isArray(order.items) ? order.items : []).map(item => `${item.qty}${item.unit ? item.unit : ''} ${item.name}`).join(', ')}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">₹{order.total}</div>
                  </div>
                ))
              )}
            </div>
            <Link href="/orders" className="mt-8 inline-flex text-sm text-primary hover:underline font-medium">
              View all orders &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
