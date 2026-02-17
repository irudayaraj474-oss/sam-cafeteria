import { useState, useEffect } from 'react';
import supabase from '../supabase';
import AdminLayout from './components/admin/AdminLayout';
import DashboardView from './components/admin/DashboardView';
import MenuManagementView from './components/admin/MenuManagementView';
import OrderManagementView from './components/admin/OrderManagementView';
import UserManagementView from './components/admin/UserManagementView';
import ReportsView from './components/admin/ReportsView';
import Modal from './components/admin/Modal';
// Toast notifications can be added later if needed


const AdminPage = ({ 
  onBackToHome, 
  orderHistory, 
  setOrderHistory, 
  menuItems, 
  setMenuItems, 
  onNavigateKitchen, 
  updateOrderStatus, 
  markOrderAsPaid,
  isMuted,
  setIsMuted
}) => {
  const [activeTab, setActiveTab] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/menu')) return 'menu';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/users')) return 'users';
    if (path.includes('/reports')) return 'reports';
    return 'dashboard';
  });
  
  // Sync state with URL when tab changes
  const handleSetTab = (tab) => {
    setActiveTab(tab);
    const path = tab === 'dashboard' ? '/admin' : `/admin/${tab}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ tab }, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/menu')) setActiveTab('menu');
      else if (path.includes('/orders')) setActiveTab('orders');
      else if (path.includes('/users')) setActiveTab('users');
      else if (path.includes('/reports')) setActiveTab('reports');
      else setActiveTab('dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Modals state
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showUserHistoryModal, setShowUserHistoryModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Initial Menu Data - now passed as props from App.jsx

  const [users, setUsers] = useState([
    { id: 1, name: "Abtha", email: "abtha@canteen.com", studentId: "STUD001", status: "active", orders: 12 },
    { id: 2, name: "Rahul", email: "rahul@canteen.com", studentId: "STUD002", status: "active", orders: 8 },
    { id: 3, name: "Priya", email: "priya@canteen.com", studentId: "STUD003", status: "blocked", orders: 25 },
  ]);



  // updateOrderStatus is now passed as a prop

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price')),
      image: formData.get('image') || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      description: formData.get('description'),
      available: formData.get('available') === 'on'
    };

    if (editingItem) {
      const { data, error } = await supabase
        .from('menu_items')
        .update(itemData)
        .eq('id', editingItem.id)
        .select();

      if (error) {
        console.error('Error updating item:', error);
        alert('Failed to update item.');
        return;
      }
      if (data) setMenuItems(prev => prev.map(item => item.id === editingItem.id ? data[0] : item));
    } else {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([itemData])
        .select();

      if (error) {
        console.error('Error creating item:', error);
        alert('Failed to create item.');
        return;
      }
      if (data) setMenuItems(prev => [...prev, data[0]]);
    }
    setShowItemModal(false);
    setEditingItem(null);
  };

  const deleteMenuItem = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item.');
        return;
      }
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleAvailability = async (id) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    const { error } = await supabase
      .from('menu_items')
      .update({ available: !item.available })
      .eq('id', id);

    if (error) {
      console.error('Error toggling availability:', error);
      alert('Failed to update availability.');
      return;
    }

    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } : user
    ));
  };

  const deleteUser = (id) => {
    if (confirm("Delete this user permanently?")) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  return (
    <AdminLayout 
      activeTab={activeTab} 
      setActiveTab={handleSetTab} 
      onLogout={onBackToHome} 
      onNavigateKitchen={onNavigateKitchen}
      isMuted={isMuted}
      setIsMuted={setIsMuted}
    >
      {activeTab === 'dashboard' && (
        <DashboardView 
          orderHistory={orderHistory} 
          usersCount={users?.length || 0} 
          menuCount={menuItems?.length || 0} 
        />
      )}
      
      {activeTab === 'menu' && (
        <MenuManagementView 
          menuItems={menuItems || []} 
          onAddItem={() => { setEditingItem(null); setShowItemModal(true); }}
          onEditItem={(item) => { setEditingItem(item); setShowItemModal(true); }}
          onDeleteItem={deleteMenuItem}
          onToggleAvailability={toggleAvailability}
        />
      )}

      {activeTab === 'orders' && (
        <OrderManagementView 
          orderHistory={orderHistory || []} 
          onUpdateStatus={updateOrderStatus} 
          onMarkPaid={markOrderAsPaid}
        />
      )}

      {activeTab === 'users' && (
        <UserManagementView 
          users={users || []} 
          onToggleStatus={toggleUserStatus}
          onDeleteUser={deleteUser}
          onViewHistory={(user) => { setSelectedUser(user); setShowUserHistoryModal(true); }}
        />
      )}

      {activeTab === 'reports' && (
        <ReportsView orderHistory={orderHistory} />
      )}



      {/* Modals */}
      <Modal 
        isOpen={showItemModal} 
        onClose={() => setShowItemModal(false)}
        title={editingItem ? "Edit Food Item" : "Add New Food Item"}
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          <div className="space-y-2">
            <label className="text-paragraph text-sm font-medium">Item Name</label>
            <input type="text" name="name" defaultValue={editingItem?.name} required className="w-full bg-background/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-paragraph text-sm font-medium">Category</label>
              <select name="category" defaultValue={editingItem?.category || 'Veg'} className="w-full bg-background/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary">
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Drinks">Drinks</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-paragraph text-sm font-medium">Price (₹)</label>
              <input type="number" name="price" defaultValue={editingItem?.price} required className="w-full bg-background/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-paragraph text-sm font-medium">Image URL</label>
            <input type="text" name="image" defaultValue={editingItem?.image} placeholder="https://example.com/image.jpg" className="w-full bg-background/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-paragraph text-sm font-medium">Description</label>
            <textarea name="description" defaultValue={editingItem?.description} className="w-full bg-background/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary h-24 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="available" id="available" defaultChecked={editingItem ? editingItem.available : true} className="w-4 h-4 rounded accent-primary" />
            <label htmlFor="available" className="text-white text-sm">Available for ordering</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setShowItemModal(false)} className="px-6 py-2 rounded-xl text-paragraph font-medium hover:bg-white/5">Cancel</button>
            <button type="submit" className="px-8 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              {editingItem ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={showUserHistoryModal} 
        onClose={() => setShowUserHistoryModal(false)}
        title={`Order History: ${selectedUser?.name}`}
      >
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {orderHistory.filter(o => o.id % 2 === 0).length > 0 ? ( // Mocking user-specific orders
            orderHistory.slice(0, 3).map((o, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">#{o.id.toString().slice(-4)}</p>
                  <p className="text-paragraph text-xs">{o.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold">₹{o.total}</p>
                  <p className="text-secondary text-[10px] uppercase font-bold">{o.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-paragraph py-8">No order history available for this user.</p>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={() => setShowUserHistoryModal(false)} className="px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all">
            Close
          </button>
        </div>
      </Modal>

    </AdminLayout>
  );
};

export default AdminPage;
