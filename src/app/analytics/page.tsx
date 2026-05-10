'use client';

import { BarChart3, Users, TrendingDown } from 'lucide-react'
import { useOrders } from '@/hooks/useOrders'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'

export default function AnalyticsPage() {
  const { orders } = useOrders();

  // Calculate Revenue Over Time (Last 7 Days)
  const revenueData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toDateString();
      
      const dayOrders = orders.filter(o => 
        new Date(o.created_at).toDateString() === dateStr && o.status !== 'cancelled'
      );
      
      const revenue = dayOrders.reduce((sum, o) => sum + o.total, 0);
      
      data.push({
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: revenue
      });
    }
    return data;
  }, [orders]);

  // Calculate Top Selling Items
  const topItems = useMemo(() => {
    const itemCounts: Record<string, number> = {};
    
    orders.forEach(order => {
      const items = Array.isArray(order.items) ? order.items : [];
      items.forEach(item => {
        if (!itemCounts[item.name]) itemCounts[item.name] = 0;
        itemCounts[item.name] += item.qty || 1;
      });
    });

    return Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4); // Top 4
  }, [orders]);

  const maxItemCount = topItems.length > 0 ? topItems[0].count : 1;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Sales Analytics */}
        <div className="col-span-1 md:col-span-2 rounded-xl border bg-white shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Revenue Over Time (Last 7 Days)</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value}`} dx={-10} />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip 
                  formatter={(value: number) => [`₹${value}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(142.1 76.2% 36.3%)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl border bg-white shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Top Selling Items</h3>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-5 flex-1 mt-2">
            {topItems.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.count} units</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${(item.count / maxItemCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {topItems.length === 0 && <p className="text-sm text-muted-foreground">No items sold yet.</p>}
          </div>
        </div>

        {/* Customer Engagement */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-xl border bg-white shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Customer Engagement Tracker</h3>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 flex flex-col justify-between hover:border-primary transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">VIP Customers</p>
                  <p className="text-2xl font-bold mt-1">45</p>
                </div>
                <div className="p-2 bg-green-100 text-green-800 rounded-full">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <button className="mt-4 text-xs font-medium text-primary hover:underline self-start">Send Offers &rarr;</button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col justify-between hover:border-yellow-400 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Inactive (7+ days)</p>
                  <p className="text-2xl font-bold mt-1">112</p>
                </div>
                <div className="p-2 bg-yellow-100 text-yellow-800 rounded-full">
                  <TrendingDown className="h-4 w-4" />
                </div>
              </div>
              <button className="mt-4 text-xs font-medium text-yellow-600 hover:underline self-start">Send Reminder &rarr;</button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col justify-between hover:border-red-400 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Churned (15+ days)</p>
                  <p className="text-2xl font-bold mt-1">38</p>
                </div>
                <div className="p-2 bg-red-100 text-red-800 rounded-full">
                  <TrendingDown className="h-4 w-4" />
                </div>
              </div>
              <button className="mt-4 text-xs font-medium text-red-600 hover:underline self-start">Send Discount Coupon &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
