import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, CreditCard, Banknote } from 'lucide-react';
import { cn } from '../../lib/utils';
import GlassCard from '../admin/GlassCard';

const CartView = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [paymentMethod, setPaymentMethod] = React.useState('UPI');
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-card border-l border-white/10 h-full flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Your Cart</h3>
                    <p className="text-[10px] text-paragraph uppercase font-black tracking-widest">{cartItems.length} Items Selected</p>
                  </div>
               </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-paragraph hover:bg-red-500/10 hover:text-red-500 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 hover:border-primary/30 transition-all">
                      <div className="w-16 h-16 rounded-xl bg-background/50 flex items-center justify-center text-3xl overflow-hidden relative">
                        {item.image && item.image.startsWith('http') ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{item.image || "🍴"}</span>
                        )}
                      </div>
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                         <h4 className="text-white font-bold">{item.name}</h4>
                         <button onClick={() => onRemoveItem(item.id)} className="text-paragraph hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                      <p className="text-primary font-bold text-lg mt-1">₹{item.price}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-background/50 rounded-lg p-1 border border-white/5">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-white font-black">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                   <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-paragraph" />
                   </div>
                   <p className="text-paragraph font-medium">Your cart is feeling a bit light.<br />Add some deliciousness!</p>
                </div>
              )}
            </div>

            {/* Checkout Section */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/5 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-paragraph text-sm font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-paragraph text-sm font-medium">
                    <span>Tax (5%)</span>
                    <span className="text-white">₹{(total * 0.05).toFixed(0)}</span>
                  </div>
                  <div className="h-[1px] bg-white/10 my-2"></div>
                  <div className="flex justify-between text-white font-black text-2xl">
                    <span>Total</span>
                    <span className="text-primary">₹{(total * 1.05).toFixed(0)}</span>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3">
                  <p className="text-white font-bold text-sm uppercase tracking-widest">Select Payment Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('UPI')}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                        paymentMethod === 'UPI'
                          ? "bg-primary/20 border-primary text-white shadow-lg shadow-primary/10"
                          : "bg-white/5 border-white/10 text-paragraph hover:bg-white/10"
                      )}
                    >
                      <CreditCard className={cn("w-6 h-6", paymentMethod === 'UPI' ? "text-primary" : "text-paragraph")} />
                      <span className="text-xs font-bold font-display">UPI</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('Cash')}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                        paymentMethod === 'Cash'
                          ? "bg-secondary/20 border-secondary text-white shadow-lg shadow-secondary/10"
                          : "bg-white/5 border-white/10 text-paragraph hover:bg-white/10"
                      )}
                    >
                      <Banknote className={cn("w-6 h-6", paymentMethod === 'Cash' ? "text-secondary" : "text-paragraph")} />
                      <span className="text-xs font-bold font-display">CASH</span>
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => onCheckout(paymentMethod)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 group"
                >
                  Place Order <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartView;
