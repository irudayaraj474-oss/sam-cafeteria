import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Trash2, 
  History, 
  MoreVertical 
} from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '../../lib/utils';

const UserManagementView = ({ users, onToggleStatus, onDeleteUser, onViewHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl font-bold">User Management</h1>
        <p className="text-paragraph mt-1">Manage student accounts and monitor their activity.</p>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="relative group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph group-focus-within:text-primary transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search users by name or Student ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </GlassCard>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <GlassCard key={user.id} className="relative group overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 border border-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
                  <p className="text-paragraph text-xs mt-0.5">{user.email}</p>
                </div>
              </div>
              <div className={cn(
                "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                user.status === 'active' ? "text-secondary border-secondary/20 bg-secondary/10" : "text-red-500 border-red-500/20 bg-red-500/10"
              )}>
                {user.status}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-paragraph">Student ID</span>
                <span className="text-white font-medium">{user.studentId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-paragraph">Total Orders</span>
                <span className="text-white font-medium">{user.orders} orders</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
              <button 
                onClick={() => onViewHistory(user)}
                className="flex-grow flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm font-medium"
              >
                <History className="w-4 h-4 text-primary" /> History
              </button>
              <button 
                onClick={() => onToggleStatus(user.id)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-xl transition-all border",
                  user.status === 'active' 
                    ? "text-orange-500 border-orange-500/20 hover:bg-orange-500/10" 
                    : "text-secondary border-secondary/20 hover:bg-secondary/10"
                )}
                title={user.status === 'active' ? "Block User" : "Unblock User"}
              >
                {user.status === 'active' ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => onDeleteUser(user.id)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-red-500 border border-red-500/20 hover:bg-red-500/10 transition-all"
                title="Delete User"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </GlassCard>
        ))}

        {filteredUsers.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center gap-3 text-paragraph">
             <Users className="w-12 h-12 opacity-20" />
             <p>No users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementView;
