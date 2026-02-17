import React from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Users as UsersIcon, 
  Clock, 
  Star,
  ArrowRight
} from 'lucide-react';
import StatCard from './StatCard';
import GlassCard from './GlassCard';
import { cn } from '../../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const DashboardView = ({ orderHistory = [], usersCount = 0, menuCount = 0 }) => {
  const safeOrders = Array.isArray(orderHistory) ? orderHistory : [];
  const totalRevenue = safeOrders.filter(o => o?.status !== 'cancelled').reduce((sum, order) => sum + (parseFloat(order?.total) || 0), 0);
  
  // Get today's orders
  const todayStr = new Date().toLocaleDateString();
  const todayOrders = safeOrders.filter(o => {
    const dateVal = o.created_at || o.timestamp || o.date;
    if (!dateVal) return false;
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) return false;
    return date.toLocaleDateString() === todayStr;
  });
  const totalOrdersToday = todayOrders.length;
  
  const pendingOrders = safeOrders.filter(o => ['pending', 'preparing', 'confirmed'].includes(o?.status)).length;

  // Process data for Revenue Chart (Last 7 Days)
  const getRevenueData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString(); // e.g., "10/24/2023"
    });

    return last7Days.map(date => {
      const dayRevenue = safeOrders
        .filter(o => {
          const dateVal = o.created_at || o.timestamp || o.date;
          if (!dateVal) return false;
          const dateObj = new Date(dateVal);
          if (isNaN(dateObj.getTime())) return false;
          return dateObj.toLocaleDateString() === date && o.status !== 'cancelled';
        })
        .reduce((sum, o) => sum + parseFloat(o.total), 0);
      
      const dateObj = new Date(date);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // "Mon"
      return { name: dayName, sales: dayRevenue, fullDate: date };
    });
  };

  const chartData = getRevenueData();

  // Process data for Best Selling Items
  const getBestSellingItems = () => {
    const itemCounts = {};
    safeOrders.forEach(order => {
      if (order?.items && Array.isArray(order?.items) && order?.status !== 'cancelled') {
        order.items.forEach(item => {
          if (!item?.name) return;
          itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.quantity || 1);
        });
      }
    });

    const sortedItems = Object.entries(itemCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([name, count]) => {
        // Calculate percentage relative to total items sold
        const totalItemsSold = Object.values(itemCounts).reduce((a, b) => a + b, 0);
        return {
          name,
          sales: Math.round((count / totalItemsSold) * 100) || 0,
          count,
          icon: "🍽️", // Generic icon, could map to category if available
          color: "bg-primary" // Dynamic colors could be added
        };
      });

    // Fallback if no data
    if (sortedItems.length === 0) return [
       { name: "No Data", sales: 0, icon: "—", color: "bg-white/10" }
    ];

    // Assign colors
    const colors = ["bg-primary", "bg-secondary", "bg-blue-500", "bg-orange-500"];
    return sortedItems.map((item, idx) => ({ ...item, color: colors[idx % colors.length] }));
  };

  const bestSelling = getBestSellingItems();

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-paragraph text-sm md:text-base mt-1">Good evening, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Orders (Today)" 
          value={totalOrdersToday} 
          icon={ShoppingBag} 
          trend="neutral" 
          trendValue={0} 
          color="primary"
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend="up" 
          trendValue={8} 
          color="secondary"
        />
        <StatCard 
          title="Pending Orders" 
          value={pendingOrders} 
          icon={Clock} 
          trend={pendingOrders > 5 ? "down" : "neutral"} 
          trendValue={pendingOrders} 
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <GlassCard className="lg:col-span-2 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white text-xl font-bold">Revenue Analytics (7 Days)</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary">
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="h-[300px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7F5AF0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7F5AF0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a1b2" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94a1b2" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#242629', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff' 
                  }}
                  itemStyle={{ color: '#7F5AF0' }}
                  labelStyle={{ color: '#94a1b2', marginBottom: '0.5rem' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#7F5AF0" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Best Selling Items */}
        <GlassCard>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white text-xl font-bold">Best Selling</h3>
          </div>
          <div className="space-y-6">
            {bestSelling.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="text-paragraph">{item.sales}% ({item.count || 0})</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                    style={{ width: `${item.sales}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity / Table Section */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white text-xl font-bold">Recent Orders</h3>
          <button className="text-sm text-paragraph hover:text-white transition-colors">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-paragraph text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Table</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {safeOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-white font-medium">#{order.id.toString().slice(-4)}</td>
                  <td className="px-6 py-4 text-paragraph">Table {order.table_number}</td>
                  <td className="px-6 py-4 text-white font-semibold">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-bold text-primary">{order.payment_method || 'UPI'}</span>
                       <span className={cn(
                         "text-[8px] font-black uppercase px-1 rounded border",
                         order.payment_status === 'paid' ? "border-secondary/30 text-secondary" : "border-orange-500/30 text-orange-500"
                       )}>
                         {order.payment_status || 'pending'}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      order.status === 'completed' && "bg-secondary/10 text-secondary border border-secondary/20",
                      order.status === 'preparing' && "bg-blue-500/10 text-blue-500 border border-blue-500/20",
                      order.status === 'pending' && "bg-orange-500/10 text-orange-500 border border-orange-500/20",
                      order.status === 'cancelled' && "bg-red-500/10 text-red-500 border border-red-500/20",
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-paragraph text-sm">{order.time}</td>
                </tr>
              ))}
              {safeOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-paragraph">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default DashboardView;
