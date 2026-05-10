import { Order } from '@/types'
import { X, MapPin, Phone, User, ShoppingCart, IndianRupee } from 'lucide-react'

interface OrderDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDrawer({ order, isOpen, onClose }: OrderDrawerProps) {
  if (!isOpen || !order) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">{order.id}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Customer</h3>
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm font-medium">{order.naam}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm">{order.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm leading-relaxed">{order.address}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Items</h3>
            <div className="border rounded-lg divide-y">
              {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{item.qty} {item.unit}</span>
                    <p className="text-xs text-muted-foreground">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Payment Summary</h3>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items Total</span>
                <span>₹{(Array.isArray(order.items) ? order.items : []).reduce((sum, item) => sum + (item.price || 0), 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span>₹{order.delivery_charge}</span>
              </div>
              {order.jhola && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jhola (Bag) Included</span>
                  <span className="text-primary font-medium">Yes</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                <span>Total Amount</span>
                <span className="flex items-center"><IndianRupee className="h-4 w-4 mr-0.5" />{order.total}</span>
              </div>
            </div>
          </div>

        </div>
        
        {/* Actions Footer */}
        <div className="p-4 border-t bg-slate-50 flex gap-2">
          <button className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
            Send WhatsApp Reminder
          </button>
        </div>
      </div>
    </>
  )
}
