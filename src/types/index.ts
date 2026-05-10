export interface OrderItem {
  name: string;
  qty: number;
  unit?: string;
  price?: number;
}

export interface Order {
  id: string;
  phone: string;
  naam: string;
  address: string;
  items: OrderItem[];
  total: number;
  delivery_charge: number;
  jhola: boolean;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  created_at: string;
}
