import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  CheckCheck, 
  XCircle,
  Calendar,
  ClipboardList,
  CreditCard,
  Banknote
} from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '../../lib/utils';

const OrderManagementView = ({ orderHistory, onUpdateStatus, onMarkPaid }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'pending', 'preparing', 'ready', 'completed', 'cancelled'];

  const filteredOrders = (orderHistory || []).filter(order => {
    const orderId = order?.id?.toString() || '';
    const tableNum = order?.table_number?.toString() || '';
    const matchesSearch = orderId.includes(searchTerm) || tableNum.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || order?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'preparing': return <ChefHat className="w-4 h-4" />;
      case 'ready': return <CheckCircle2 className="w-4 h-4" />;
      case 'completed': return <CheckCheck className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return "text-orange-500 bg-orange-500/10 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]";
      case 'preparing': return "text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]";
      case 'ready': return "text-green-500 bg-green-500/10 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]"; // Changed to green for ready
      case 'completed': return "text-paragraph bg-white/5 border-white/10"; // Dimmed for completed
      case 'cancelled': return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-paragraph bg-white/5 border-white/10";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-3xl font-bold">Order Management</h1>
          <p className="text-paragraph mt-1">Track and manage incoming orders in real-time.</p>
        </div>
      </div>

      {/* Filters */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center sticky top-4 z-30 backdrop-blur-xl bg-black/40">
        <div className="relative flex-grow group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph group-focus-within:text-primary transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Table..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-paragraph/50"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border flex-shrink-0",
                statusFilter === status 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-white/5 text-paragraph hover:bg-white/10 hover:text-white border-white/10"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div 
              key={order?.id} 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group flex flex-col lg:flex-row gap-6 lg:items-center"
            >
              {/* Left: ID & Context */}
              <div className="flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center min-w-[140px] gap-2">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-black text-2xl tracking-tight">#{order?.id?.toString().slice(-4)}</span>
                  </div>
                  <span className="text-paragraph text-xs flex items-center gap-1.5 mt-1 bg-white/5 px-2 py-1 rounded-lg w-fit">
                    <Clock className="w-3 h-3" /> {order?.time || 'Now'}
                  </span>
                </div>
                <div className="lg:mt-2">
                  <span className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-white font-bold text-sm flex items-center gap-2">
                    🍽️ Table {order?.table_number}
                  </span>
                </div>
              </div>

              {/* Middle: Items */}
              <div className="flex-grow bg-black/20 rounded-xl p-4 border border-white/5">
                <div className="flex flex-wrap gap-2">
                  {(order?.items || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <span className="text-primary font-bold text-xs">x{item.quantity}</span>
                      <span className="text-white text-sm font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
                {order.note && (
                   <p className="text-paragraph text-xs mt-3 italic flex items-center gap-1">
                      <span className="text-orange-500 font-bold">Note:</span> {order.note}
                   </p>
                )}
              </div>

              {/* Right: Payment & Status */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 min-w-[200px] justify-between lg:justify-center">
                
                <div className="text-right">
                  <div className="text-white font-black text-xl">₹{order?.total}</div>
                  <div className="flex items-center gap-2 justify-end mt-1">
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border flex items-center gap-1",
                      order?.payment_method === 'UPI' ? "text-blue-400 border-blue-400/30 bg-blue-400/10" : "text-green-400 border-green-400/30 bg-green-400/10"
                    )}>
                       {order?.payment_method === 'UPI' ? <CreditCard className="w-2.5 h-2.5" /> : <Banknote className="w-2.5 h-2.5" />}
                       {order?.payment_method}
                    </span>
                    <span className={cn(
                      "text-[10px] font-black uppercase px-1.5 py-0.5 rounded border",
                      order?.payment_status === 'paid' ? "text-secondary border-secondary/30 bg-secondary/10" : "text-orange-500 border-orange-500/30 bg-orange-500/10"
                    )}>
                      {order?.payment_status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   <div className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all shadow-lg",
                      getStatusColor(order?.status)
                    )}>
                      {getStatusIcon(order?.status)}
                      {order?.status}
                    </div>
                    
            {/* Only show action for non-completed/cancelled */}
            {['pending', 'preparing', 'ready'].includes(order?.status) && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onMarkPaid(order.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-green-500/20 transition-all hover:scale-105"
                >
                  Paid & Complete
                </button>
                <div className="relative group/actions">
                  <select 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  >
                    {statuses.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors border border-white/10">
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-paragraph opacity-50">
            <ClipboardList className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagementView;
