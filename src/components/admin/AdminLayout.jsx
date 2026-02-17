import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children, activeTab, setActiveTab, onLogout, onNavigateKitchen, isMuted, setIsMuted }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  return (
    <div className="min-h-screen bg-background text-white flex font-sans overflow-x-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth <= 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45"
          />
        )}
      </AnimatePresence>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (window.innerWidth <= 1024) setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        onLogout={onLogout}
        onNavigateKitchen={onNavigateKitchen}
      />
      
      <main 
        className="grow flex flex-col transition-all duration-300 ease-in-out relative min-w-0"
        style={{ 
          paddingLeft: window.innerWidth > 1024 ? (isSidebarOpen ? 260 : 80) : 0 
        }}
      >
        <AdminNavbar 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
        
        {/* Vibrant Background Accents */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10 animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        <div className="p-4 md:p-8 pb-12 grow relative z-10">


          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
