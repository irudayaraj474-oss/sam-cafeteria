import React from 'react';
import { 
  Download, 
  TrendingUp, 
  BarChart, 
  PieChart as PieChartIcon, 
  Calendar as CalendarIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import GlassCard from './GlassCard';
import StatCard from './StatCard';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#7F5AF0', '#2CB67D', '#3B82F6', '#F59E0B', '#EF4444'];

const ReportsView = ({ orderHistory = [] }) => {
  const safeOrders = Array.isArray(orderHistory) ? orderHistory : [];
  const activeOrders = safeOrders.filter(o => o?.status !== 'cancelled');
  const totalRevenue = activeOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  const avgOrderValue = totalRevenue / (activeOrders.length || 1);
  const newCustomers = new Set(activeOrders.map(o => o.id)).size; // Simplified, assumes guest/unique IDs

  // 1. Process Weekly Sales Data (Last 7 Days)
  const getSalesData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString(); 
    });

    return last7Days.map(date => {
      const dayRevenue = activeOrders
        .filter(o => {
          const dateVal = o.created_at || o.timestamp || o.date;
          if (!dateVal) return false;
          const dateObj = new Date(dateVal);
          if (isNaN(dateObj.getTime())) return false;
          return dateObj.toLocaleDateString() === date;
        })
        .reduce((sum, o) => sum + parseFloat(o.total), 0);
      
      const dateObj = new Date(date);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); 
      
      return { 
        name: dayName, 
        revenue: dayRevenue, 
        profit: dayRevenue * 0.4 // Estimating 40% profit margin
      };
    });
  };

  const salesData = getSalesData();

  // 2. Process Category Data
  const getCategoryData = () => {
    const categoryCounts = {};
    safeOrders.forEach(order => {
       if (order?.items && Array.isArray(order?.items)) {
          order.items.forEach(item => {
             const cat = item?.category || 'Other';
             categoryCounts[cat] = (categoryCounts[cat] || 0) + (item?.quantity || 1);
          });
       }
    });

    return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  };

  const categoryData = getCategoryData().length > 0 ? getCategoryData() : [{ name: 'No Data', value: 1 }];

  const exportData = () => {
    const csv = "Date,Order ID,Table,Total,Status,Payment Method,Payment Status\n" + 
                orderHistory.map(o => `${o.date},${o.id},${o.table_number},${o.total},${o.status},${o.payment_method},${o.payment_status}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'canteen_sales_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-paragraph mt-1">Analyze your sales performance and customer trends (Live Data).</p>
        </div>
        <button 
          onClick={exportData}
          className="bg-white/5 border border-white/10 hover:border-primary/50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all group shadow-lg"
        >
          <Download className="w-5 h-5 group-hover:text-primary transition-colors" /> Export to Excel
        </button>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={TrendingUp} trend="up" trendValue={14} color="primary" />
        <StatCard title="Avg. Order Value" value={`₹${avgOrderValue.toFixed(2)}`} icon={BarChart} trend="neutral" trendValue={0} color="secondary" />
        <StatCard title="Total Orders" value={activeOrders.length} icon={CalendarIcon} trend="up" trendValue={10} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Revenue vs Profit */}
        <GlassCard>
          <h3 className="text-white text-xl font-bold mb-8">Weekly Performance (Last 7 Days)</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a1b2" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a1b2" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#242629', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="revenue" fill="#7F5AF0" radius={[4, 4, 0, 0]} barSize={30} name="Revenue" />
                <Bar dataKey="profit" fill="#2CB67D" radius={[4, 4, 0, 0]} barSize={30} name="Est. Profit (40%)" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Category Distribution */}
        <GlassCard>
          <h3 className="text-white text-xl font-bold mb-8">Sales by Category</h3>
          <div className="h-[350px] w-full flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#242629', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 flex-wrap justify-center">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-paragraph text-sm">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ReportsView;
