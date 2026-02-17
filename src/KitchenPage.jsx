import React, { useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  BellRing,
  CheckCheck,
  ArrowRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const KitchenPage = ({ orderHistory = [], onUpdateStatus, onBack, isMuted, setIsMuted }) => {
  // ... (rest of the logic remains same)
  const safeOrders = Array.isArray(orderHistory) ? orderHistory : [];
  // Filter out cancelled orders
  const activeOrders = safeOrders.filter(o => o.status !== 'cancelled');

  const columns = [
    { id: 'pending', label: 'Pending', icon: BellRing, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'preparing', label: 'Preparing', icon: ChefHat, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'ready', label: 'Ready to Serve', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'completed', label: 'Completed', icon: CheckCheck, color: 'text-paragraph', bg: 'bg-white/5', border: 'border-white/10' },
  ];

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'pending') return 'preparing';
    if (currentStatus === 'preparing') return 'ready';
    if (currentStatus === 'ready') return 'completed';
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-6 pb-20 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ChefHat className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold tracking-tight">Kitchen Display</h1>
            <p className="text-paragraph text-xs md:text-sm">Live Order Tracking</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Mute Toggle */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all border",
              isMuted ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-white/5 text-white border-white/10 hover:bg-white/10"
            )}
            title={isMuted ? "Unmute Notifications" : "Mute Notifications"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
          </button>

          <button 
            onClick={onBack}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-medium text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[calc(100vh-200px)]">
        {columns.map(col => {
          const ordersInCol = activeOrders.filter(o => o.status === col.id);
          
          return (
            <div key={col.id} className="flex flex-col min-h-[300px] h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Column Header */}
              <div className={cn("p-4 border-b border-white/5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md", col.bg)}>
                <div className="flex items-center gap-2">
                  <col.icon className={cn("w-5 h-5", col.color)} />
                  <span className="font-bold text-lg">{col.label}</span>
                </div>
                <span className="bg-black/20 px-2.5 py-0.5 rounded-lg text-sm font-bold">
                  {ordersInCol.length}
                </span>
              </div>

              {/* Orders List */}
              <div className="flex-grow p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                  {ordersInCol.map(order => (
                    <motion.div
                      key={order.id}
                      layoutId={order.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={cn(
                        "p-4 rounded-xl border relative group",
                        "bg-[#1a1b1e] hover:bg-[#202124] transition-all duration-200",
                        col.border
                      )}
                    >
                      {/* Order Header */}
                      <div className="flex justify-between items-start mb-3">
                         <div>
                           <div className="flex items-baseline gap-2">
                             <span className="text-xl font-black text-white">#{order.id.toString().slice(-4)}</span>
                             <span className="text-xs font-medium text-paragraph bg-white/5 px-1.5 py-0.5 rounded">T-{order.table_number}</span>
                           </div>
                           <span className="text-[10px] text-paragraph flex items-center gap-1 mt-1 uppercase font-bold tracking-widest">
                             <Clock className="w-3 h-3" /> {order.time}
                           </span>
                         </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 mb-4">
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <span className={cn("font-bold min-w-[20px]", col.color)}>
                              {item.quantity}x
                            </span>
                            <span className="text-white/90 leading-snug">{item.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Notes */}
                      {order.note && (
                        <div className="bg-orange-500/10 border border-orange-500/20 p-2 rounded-lg mb-4">
                          <p className="text-orange-400 text-[10px] italic">"{order.note}"</p>
                        </div>
                      )}

                      {/* Actions */}
                      {col.id !== 'completed' && (
                        <button
                          onClick={() => onUpdateStatus(order.id, getNextStatus(col.id))}
                          className={cn(
                            "w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all",
                            "bg-white/5 hover:bg-white/10 text-white border border-white/10 group-hover:border-primary/50 group-hover:text-primary"
                          )}
                        >
                          {col.id === 'pending' && "Start Cooking"}
                          {col.id === 'preparing' && "Mark Ready"}
                          {col.id === 'ready' && "Mark Delivered"}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                  {ordersInCol.length === 0 && (
                     <div className="text-center py-12 opacity-20">
                        <col.icon className="w-10 h-10 mx-auto mb-2" />
                        <p className="text-sm">No orders</p>
                     </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenPage;
