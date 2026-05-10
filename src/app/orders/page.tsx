'use client';

import { useState } from 'react'
import { Search, Filter, MoreHorizontal, ChevronDown } from 'lucide-react'
import { useOrders } from '@/hooks/useOrders'
import { Order } from '@/types'
import { OrderDrawer } from '@/components/dashboard/OrderDrawer'

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as Order['status']);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
          <select 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-slate-100 h-9 px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID, name, or phone..."
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Items</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredOrders.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="h-24 text-center text-muted-foreground">No orders found.</td>
                 </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group">
                    <td 
                      className="p-4 align-middle font-medium cursor-pointer text-primary hover:underline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {order.id}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium">{order.naam}</span>
                        <span className="text-xs text-muted-foreground">{order.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle max-w-[200px] truncate">
                      {(Array.isArray(order.items) ? order.items : []).map(item => `${item.qty}${item.unit ? item.unit : ''} ${item.name}`).join(', ')}
                    </td>
                    <td className="p-4 align-middle font-medium">₹{order.total}</td>
                    <td className="p-4 align-middle">
                      <div className="relative inline-block">
                        <select 
                          className={`appearance-none rounded-full border px-2.5 py-0.5 text-xs font-semibold pr-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            order.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1 h-3 w-3 opacity-50 pointer-events-none" />
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 h-8 w-8 p-0"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <OrderDrawer 
        order={selectedOrder} 
        isOpen={selectedOrder !== null} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  )
}
