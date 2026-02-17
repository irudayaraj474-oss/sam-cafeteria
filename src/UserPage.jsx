import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserLayout from './components/user/UserLayout';
import UserHero from './components/user/UserHero';
import MenuDisplay from './components/user/MenuDisplay';
import CartView from './components/user/CartView';
import OrderStatusView from './components/user/OrderStatusView';
import Modal from './components/admin/Modal';
import TableSelection from './TableSelection';
import { cn } from './lib/utils';
import supabase from '../supabase';

const UserPage = ({ menuItems, orderHistory, onPlaceOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState('landing');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  // Sync view state with current URL path
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path === '/menu') setView('menu');
    else if (path === '/tables') setView('tables');
    else if (path === '/status') setView('status');
    else setView('landing');
  }, [location.pathname]);

  // Handle view updates via router
  const handleSetView = (newView) => {
    const path = newView === 'landing' ? '/' : `/${newView}`;
    navigate(path);
  };


  // Sync current order status if it exists in orderHistory
  useEffect(() => {
    if (currentOrder) {
      const updatedOrder = orderHistory.find(o => o.id === currentOrder.id);
      if (updatedOrder) {
        setCurrentOrder(updatedOrder);
      }
    }
  }, [orderHistory, currentOrder]);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(i => i.quantity > 0));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = async (paymentMethod = 'UPI') => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.05;
    const newOrder = {
      items: cartItems,
      total: totalAmount.toFixed(0),
      table_number: selectedTable || Math.floor(Math.random() * 20) + 1,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'UPI' ? 'paid' : 'pending',
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([newOrder])
      .select();

    if (error) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error.message}${error.details ? ' - ' + error.details : ''}`);
      return;
    }

      if (data && data[0]) {
      onPlaceOrder(data[0]);
      setCurrentOrder(data[0]);
      setCartItems([]);
      setIsCartOpen(false);
      handleSetView('status');
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTableConfirmed = (tableId) => {
    setSelectedTable(tableId);
    handleSetView('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (target) => {
    if (target === 'Home') {
      setSelectedTable(null);
      handleSetView('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'Menu') {
      handleSetView('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'My Orders') {
      handleSetView('status');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'About') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <UserLayout 
      cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)} 
      onOpenCart={() => setIsCartOpen(true)}
      showNavAndFooter={view === 'menu' || view === 'status'}
      onNavigate={handleNavigate}
    >
      {view === 'landing' && (
        <div className="animate-fade-in text-center">
          <UserHero 
            onSearch={setSearchTerm} 
            onBrowseMenu={() => handleSetView('tables')}
          />
        </div>
      )}

      {view === 'tables' && (
        <div className="animate-fade-in">
          <TableSelection 
            onBackToHome={() => handleSetView('landing')} 
            onTableConfirmed={handleTableConfirmed} 
          />
        </div>
      )}

      {view === 'menu' && (
        <div className="animate-fade-in">
          {/* Menu Header with Back Button */}
          <div className="max-w-7xl mx-auto px-6 pt-24 pb-8 flex items-center justify-between">
            <button 
              onClick={() => handleSetView('tables')}
              className="text-paragraph hover:text-white flex items-center gap-2 transition-all group"
            >
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">←</span>
              <span>Change Table ({selectedTable})</span>
            </button>
            <div className="text-right">
              <span className="text-primary font-bold text-sm uppercase tracking-widest">Digital Menu</span>
            </div>
          </div>
          
          <MenuDisplay 
            menuItems={menuItems} 
            onAddToCart={handleAddToCart} 
            searchTerm={searchTerm} 
            onSearch={setSearchTerm}
          />

        </div>
      )}

      {view === 'status' && (
        <div className="animate-fade-in">
          <OrderStatusView 
            currentOrder={currentOrder} 
            orderHistory={orderHistory.filter(o => o.status !== 'completed')}
            onSelectOrder={setCurrentOrder}
          />
          <div className="flex justify-center pb-20">
             <button 
              onClick={() => handleSetView('menu')}
              className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-bold"
             >
                Back to Menu
             </button>
          </div>
        </div>
      )}

      <CartView 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </UserLayout>
  );
};

export default UserPage;
