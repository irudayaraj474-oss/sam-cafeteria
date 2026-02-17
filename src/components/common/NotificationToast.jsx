import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const NotificationToast = ({ order, onDismiss }) => {
  if (!order) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
      exit={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
      className="fixed bottom-10 left-1/2 z-100 w-[90%] max-w-md bg-card/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-5 overflow-hidden"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0 animate-bounce">
          <ShoppingBag className="w-6 h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-white font-bold text-lg">New Order Placed!</h4>
            <button 
              onClick={onDismiss}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-paragraph"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-paragraph text-sm mb-3">
            Order <span className="text-white font-bold">#{order.id.toString().slice(-4)}</span> from 
            <span className="text-white font-bold ml-1">Table {order.table_number}</span>
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              Kitchen Ready
            </span>
            <span className="text-white font-black text-xl">₹{order.total}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar (Auto-dismiss timer visual) */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: 5, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-1 bg-primary"
      />
    </motion.div>
  );
};

export default NotificationToast;
