import { useState, useEffect } from 'react';
import UserPage from './UserPage';
import supabase from '../supabase';

import AdminPage from './AdminPage';

import KitchenPage from './KitchenPage';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname.toLowerCase();
    console.log('Detecting route for path:', path);
    
    if (params.has('admin') || path.startsWith('/admin') || path === '/adminpage' || path === '/adminpage.jsx') return 'admin';
    if (path.startsWith('/kitchen')) return 'kitchen';
    
    return 'home';
  });

  // Global State shared between panels
  const [menuItems, setMenuItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch data from Supabase on load
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('id', { ascending: false });
      
      if (ordersError) console.error('Error fetching orders:', ordersError);
      else if (orders) setOrderHistory(orders);

      // Fetch Menu Items
      const { data: menu, error: menuError } = await supabase
        .from('menu_items')
        .select('*')
        .order('name', { ascending: true });
      
      if (menuError) console.error('Error fetching menu:', menuError);
      else if (menu) setMenuItems(menu);
    };

    fetchData();

    // Subscribe to real-time order updates
    const orderSubscription = supabase
      .channel('orders_realtime')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, payload => {
        console.log('Order update received:', payload);
        if (payload.eventType === 'INSERT') {
          setOrderHistory(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setOrderHistory(prev => prev.map(order => 
            order.id === payload.new.id ? payload.new : order
          ));
        } else if (payload.eventType === 'DELETE') {
          setOrderHistory(prev => prev.filter(order => order.id !== payload.old.id));
        }
      })
      .subscribe();

    // Subscribe to real-time menu updates
    const menuSubscription = supabase
      .channel('menu_realtime')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'menu_items' 
      }, payload => {
        console.log('Menu update received:', payload);
        if (payload.eventType === 'INSERT') {
          setMenuItems(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setMenuItems(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setMenuItems(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    // Auto-refresh fallback (Polling every 10 seconds)
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/admin') || path === '/adminpage') setCurrentPage('admin');
      else if (path.startsWith('/kitchen')) setCurrentPage('kitchen');
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      supabase.removeChannel(orderSubscription);
      supabase.removeChannel(menuSubscription);
      clearInterval(intervalId);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status. Please try again.');
      return;
    }

    // Local state update is handled by Realtime subscription, but optimistic update is good for UI
    setOrderHistory(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  const markOrderAsPaid = async (orderId) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'completed', payment_status: 'paid' })
      .eq('id', orderId);

    if (error) {
      console.error('Error marking order as paid:', error);
      alert('Failed to mark as paid. Please try again.');
      return;
    }

    setOrderHistory(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'completed', payment_status: 'paid' } : order
    ));
    console.log(`Order ${orderId} marked as paid and completed`);
  };

  const handlePlaceOrder = (newOrder) => {
    // Optimistic update, actual insert happens in UserPage with Supabase
    setOrderHistory(prev => [newOrder, ...prev]);
  };

  const handleSetPage = (page) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
  };

  const handleBackToHome = () => {
    handleSetPage('home');
  };

  const handleNavigateKitchen = () => {
     handleSetPage('kitchen');
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {currentPage === 'home' && (
        <UserPage 
          menuItems={menuItems}
          orderHistory={orderHistory}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentPage === 'admin' && (
        <AdminPage 
          onBackToHome={handleBackToHome}
          orderHistory={orderHistory}
          setOrderHistory={setOrderHistory}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          onNavigateKitchen={handleNavigateKitchen}
          updateOrderStatus={updateOrderStatus}
          markOrderAsPaid={markOrderAsPaid}
        />
      )}

      {currentPage === 'kitchen' && (
        <KitchenPage 
          orderHistory={orderHistory}
          onUpdateStatus={updateOrderStatus}
          onBack={() => handleSetPage('admin')}
        />
      )}

    </div>
  );
}

export default App;