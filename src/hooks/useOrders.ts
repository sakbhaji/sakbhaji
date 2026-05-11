'use client';

import { useState, useEffect, useMemo } from 'react';
import { Order } from '@/types';
import { supabase } from '@/lib/supabase/client';

// Helper to ensure items is always an array, even if Supabase returns a JSON string or unexpected object
const normalizeOrder = (order: any): Order => {
  let parsedItems = [];
  try {
    if (order?.items && typeof order.items === 'string') {
      try {
        parsedItems = JSON.parse(order.items);
      } catch {
        // Handle plain text items coming from n8n webhook (e.g. "- Gajar: 9000kg - ₹1,44,000")
        parsedItems = order.items
          .split('\n')
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0 && !line.startsWith('Website:'))
          .map((line: string) => ({ name: line.replace(/^- /, ''), qty: 1 }));
      }
    } else if (order?.items && Array.isArray(order.items)) {
      parsedItems = order.items;
    }
  } catch (e) {
    console.error('Failed to parse items for order', order?.id || order?.order_id, e);
  }
  
  const realId = order?.id || order?.order_id;
  
  return {
    ...order,
    // Map the database primary key (whether 'id' or 'order_id') to the UI's expected 'id' property
    id: realId || `missing-id-${Math.random().toString(36).substring(2, 9)}`,
    items: Array.isArray(parsedItems) ? parsedItems : []
  } as Order;
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data and subscribe to real-time changes
  useEffect(() => {
    // 1. Fetch initial orders
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data) {
        setOrders(data.map(normalizeOrder));
      }
      setLoading(false);
    };

    fetchOrders();

    // 2. Subscribe to real-time changes
    const channel = supabase.channel('realtime-orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Realtime update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setOrders((prev) => [normalizeOrder(payload.new), ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setOrders((prev) =>
              prev.map((order) => {
                const targetId = payload.new.id || payload.new.order_id;
                return order.id === targetId ? normalizeOrder(payload.new) : order;
              })
            );
          } else if (payload.eventType === 'DELETE') {
            setOrders((prev) => prev.filter((order) => {
              const targetId = payload.old.id || payload.old.order_id;
              return order.id !== targetId;
            }));
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Computed KPIs
  const kpis = useMemo(() => {
    const today = new Date().toDateString();
    
    // Total Orders Today
    const ordersToday = orders.filter(
      (o) => o.created_at && new Date(o.created_at).toDateString() === today
    );
    const totalOrdersToday = ordersToday.length;

    // Revenue Today (sum of totals for delivered/processing/pending, ignoring cancelled)
    const revenueToday = ordersToday
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + Number(o.total || 0), 0);

    // Pending Deliveries
    const pendingDeliveries = orders.filter(
      (o) => o.status === 'pending' || o.status === 'processing'
    ).length;

    // Active Customers (Unique phone numbers today)
    const activeCustomers = new Set(ordersToday.map((o) => o.phone)).size;

    return {
      totalOrdersToday,
      revenueToday,
      pendingDeliveries,
      activeCustomers
    };
  }, [orders]);

  // Mutations
  const updateOrderStatus = async (id: string, newStatus: Order['status']) => {
    if (!id || id.startsWith('missing-id')) {
      console.error('Cannot update order: No valid ID found for this order.');
      alert('Error: This order does not have a valid ID in the database.');
      return;
    }

    // Optimistic UI update
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    // Find if the database is using 'order_id' or 'id'
    const targetOrder = orders.find(o => o.id === id) as any;
    const targetColumn = targetOrder?.order_id ? 'order_id' : 'id';

    // Actual database update
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq(targetColumn, id);

    if (error) {
      console.error('Failed to update status in Supabase:', error);
      alert('Failed to save status to database. Is realtime/RLS blocking it?');
      // Revert optimistic update by refetching or manual revert (omitted for simplicity)
    }
  };

  const addOrder = async (newOrder: Partial<Order>) => {
    const { error } = await supabase.from('orders').insert([newOrder]);
    if (error) console.error('Error adding order:', error);
    // Real-time subscription will handle updating the UI state automatically
  };

  return {
    orders,
    kpis,
    loading,
    updateOrderStatus,
    addOrder
  };
}

