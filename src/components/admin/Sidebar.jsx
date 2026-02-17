import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  BarChart3, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChefHat
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'kitchen', label: 'Kitchen Display', icon: ChefHat },
];

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, onLogout, onNavigateKitchen }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-card/80 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col transition-all duration-300 ease-in-out",
        !isOpen && "items-center"
      )}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
          <UtensilsCrossed className="text-white w-6 h-6" />
        </div>
        {isOpen && (
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-bold text-xl tracking-tight"
          >
            SMART CAFÉ
          </motion.h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="grow px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'kitchen') {
                  onNavigateKitchen();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-paragraph hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
              {!isOpen && (
                <div className="absolute left-full ml-6 px-2 py-1 bg-card border border-white/10 rounded-md text-sm text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Toggle */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-4 p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-paragraph"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
