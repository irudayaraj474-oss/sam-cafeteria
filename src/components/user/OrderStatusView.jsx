import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  ChefHat, 
  CheckCircle2, 
  MapPin, 
  PackageCheck,
  ChevronRight
} from 'lucide-react';
import GlassCard from '../admin/GlassCard';
import { cn } from '../../lib/utils';

const steps = [
  { id: 'pending', label: 'Order Placed', icon: ClipboardList, desc: 'We have received your order' },
  { id: 'preparing', label: 'Preparing', icon: ChefHat, desc: 'Chef is working its magic' },
  { id: 'ready', label: 'Ready', icon: CheckCircle2, desc: 'Hot and ready for pickup' },
  { id: 'completed', label: 'Completed', icon: PackageCheck, desc: 'Enjoy your delicious meal!' },
];

const OrderStatusView = ({ currentOrder, orderHistory, onSelectOrder }) => {
  const currentStepIndex = steps.findIndex(s => s.id === (currentOrder?.status || 'pending'));

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Order List Header */}
      <h2 className="text-2xl font-bold text-white mb-6">Your Orders</h2>
      
      {/* Order List (Horizontal Scroll) */}
      {orderHistory && orderHistory.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide mb-12">
          {orderHistory.map((order) => (
            <button
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className={cn(
                "flex-shrink-0 w-64 bg-white/5 border rounded-2xl p-4 transition-all text-left group relative overflow-hidden",
                currentOrder?.id === order.id ? "border-primary/50 bg-primary/10" : "border-white/10 hover:bg-white/10"
              )}
            >
              {currentOrder?.id === order.id && (
                <div className="absolute top-0 right-0 p-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-paragraph uppercase font-bold">Order #{(order?.id || '').toString().slice(-4)}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider",
                  order?.status === 'completed' ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                )}>
                  {order?.status || 'pending'}
                </span>
              </div>
              <p className="text-white font-bold truncate mb-1">
                {(order?.items || []).map(i => i.name).join(', ')}
              </p>
              <div className="flex justify-between items-center text-paragraph text-xs">
                <span>{order.time}</span>
                <span className="text-white font-black group-hover:text-primary transition-colors">₹{order.total}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {currentOrder ? (
        <>
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl font-black text-white">Order Status</h1>
            <p className="text-paragraph">Order ID: <span className="text-primary font-bold">#{currentOrder.id.toString().slice(-4)}</span></p>
          </div>

          <GlassCard className="p-8 md:p-12 relative overflow-hidden">
            {/* Animated Background Line */}
            <div className="absolute left-[54px] md:left-[86px] top-24 bottom-24 w-1 bg-white/5 -z-10" />
            <motion.div 
              className="absolute left-[54px] md:left-[86px] top-24 w-1 bg-primary -z-10 origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: currentStepIndex / (steps.length - 1) }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ height: 'calc(100% - 192px)' }}
            />

            <div className="space-y-12">
              {steps.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const isPending = idx > currentStepIndex;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex gap-6 md:gap-10 items-start">
                    <div className="relative">
                       <motion.div 
                        initial={false}
                        animate={{ 
                          scale: isCurrent ? 1.2 : 1,
                          backgroundColor: isPending ? 'rgba(255,255,255,0.05)' : '#7F5AF0'
                        }}
                        className={cn(
                          "w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border-2 transition-all shadow-xl",
                          isCurrent && "border-primary shadow-primary/40 ring-4 ring-primary/10",
                          isPending && "border-white/10",
                          isCompleted && "border-primary/50 shadow-primary/10"
                        )}
                       >
                          <Icon className={cn(
                            "w-6 h-6 md:w-8 md:h-8",
                            isPending ? "text-paragraph" : "text-white"
                          )} />
                       </motion.div>
                    </div>

                    <div className="flex-grow pt-2 md:pt-4">
                       <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "font-black text-lg md:text-xl",
                            isPending ? "text-paragraph" : "text-white"
                          )}>
                            {step.label}
                          </h3>
                          {isCurrent && (
                            <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest animate-pulse border border-secondary/20">
                              Current Status
                            </span>
                          )}
                       </div>
                       <p className="text-paragraph text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <div className="mt-12 text-center">
             <GlassCard className="inline-flex flex-col md:flex-row items-center gap-6 py-4 px-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-paragraph text-[10px] font-bold uppercase">Pickup Location</p>
                    <p className="text-white font-bold text-sm">Counter #1 - Main Hall</p>
                  </div>
                </div>
                <div className="hidden md:block w-[1px] h-10 bg-white/10"></div>
                <button className="text-primary font-black text-sm flex items-center gap-2 hover:gap-3 transition-all group">
                  View Receipt <ChevronRight className="w-4 h-4" />
                </button>
             </GlassCard>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-paragraph">Select an order to view its status.</p>
        </div>
      )}
    </div>
  );
};

export default OrderStatusView;
