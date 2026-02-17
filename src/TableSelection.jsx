import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ArrowRight, ArrowLeft, CheckCircle2, Map as MapIcon, Info } from 'lucide-react';
import { cn } from './lib/utils';
import GlassCard from './components/admin/GlassCard';

const TableSelection = ({ onBackToHome, onTableConfirmed }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleConfirmTable = () => {
    if (selectedTable) {
      setShowSuccess(true);
    }
  };

  const handleViewMenu = () => {
    onTableConfirmed(selectedTable);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 text-paragraph hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold">Back to Welcome</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-2">Select Your Table</h1>
            <p className="text-paragraph">Where are you sitting today? 👋</p>
          </div>
          
          <div className="hidden md:block w-32" /> {/* Spacer */}
        </div>

        {/* Cafeteria Layout Preview */}
        <GlassCard className="mb-12 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <MapIcon className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-xl">Cafeteria Layout</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-1">Window Side</div>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map(id => (
                  <div key={id} className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all",
                    selectedTable === id ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-110" : "bg-white/5 text-paragraph border-white/10"
                  )}>T{id}</div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-bold text-secondary/60 uppercase tracking-widest pl-1 text-center">Center Area</div>
              <div className="flex gap-3 justify-center">
                {[5, 6, 7, 8].map(id => (
                  <div key={id} className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all",
                    selectedTable === id ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-110" : "bg-white/5 text-paragraph border-white/10"
                  )}>T{id}</div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-bold text-blue-400/60 uppercase tracking-widest pl-1 text-right">Entrance</div>
              <div className="flex gap-3 justify-end">
                {[9, 10, 11, 12].map(id => (
                  <div key={id} className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all",
                    selectedTable === id ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-110" : "bg-white/5 text-paragraph border-white/10"
                  )}>T{id}</div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Table Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
          {tables.map((tableId) => (
            <button
              key={tableId}
              onClick={() => setSelectedTable(tableId)}
              className={cn(
                "group relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-4",
                selectedTable === tableId 
                  ? "bg-primary/20 border-primary shadow-2xl shadow-primary/10 scale-105" 
                  : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300",
                selectedTable === tableId ? "bg-primary text-white scale-110 rotate-3" : "bg-white/5 text-paragraph group-hover:scale-110"
              )}>
                🪑
              </div>
              <div>
                <span className={cn(
                  "font-black text-xl tracking-tight transition-colors",
                  selectedTable === tableId ? "text-white" : "text-paragraph"
                )}>
                  Table {tableId}
                </span>
              </div>
              
              {selectedTable === tableId && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              )}
            </button>
          ))}
        </div>

        {/* Confirm Action */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleConfirmTable}
            disabled={!selectedTable}
            className={cn(
              "px-12 py-5 rounded-2xl font-black text-xl flex items-center gap-3 transition-all shadow-2xl",
              selectedTable 
                ? "bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/20" 
                : "bg-white/5 text-paragraph/30 border border-white/10 cursor-not-allowed"
            )}
          >
            {selectedTable ? `Confirm Table ${selectedTable}` : 'Select a Table to Continue'}
            {selectedTable && <ArrowRight className="w-6 h-6 animate-pulse" />}
          </button>
          <div className="flex items-center gap-2 text-paragraph/50 text-sm">
            <Info className="w-4 h-4" />
            <span>Select the table where you are currently seated.</span>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccess(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-card border border-primary/30 rounded-[40px] p-10 text-center shadow-2xl shadow-primary/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-24 h-24 bg-secondary/20 text-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Table {selectedTable} Reserved!</h3>
                <p className="text-paragraph text-lg mb-10 leading-relaxed">
                  Your table is confirmed. Ready to discover our delicious menu? 🧇☕
                </p>
                <button 
                  onClick={handleViewMenu}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                  View Digital Menu <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TableSelection;
