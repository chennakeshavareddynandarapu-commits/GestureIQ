import { motion, AnimatePresence } from 'framer-motion';
import { History, MoveRight, ChevronRight } from 'lucide-react';

const GestureChips = ({ history }) => {
  return (
    <div className="flex items-center gap-4 bg-navy-light/40 glass-morphism p-6 rounded-3xl border border-white/5 relative overflow-hidden h-28 group">
      <div className="flex flex-col gap-1 mr-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
            <History className="w-3 h-3" /> History
        </div>
        <div className="text-xl font-black text-white/80 uppercase italic">Recent Trail</div>
      </div>

      <div className="flex items-center gap-2">
        <AnimatePresence mode="popLayout">
          {history.length === 0 ? (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-[10px] font-bold text-white/20 uppercase tracking-widest"
             >
               Waiting for input...
             </motion.div>
          ) : (
            history.map((gesture, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1 - i * 0.15, x: 0, scale: 1 - i * 0.05 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className={`px-6 py-3 rounded-2xl border-2 font-black uppercase italic tracking-tighter text-sm flex items-center gap-2 ${i === 0 ? 'bg-cyan-400 text-navy-deep border-cyan-400 glow-cyan' : 'bg-white/5 text-white/40 border-white/5'}`}
              >
                {gesture}
                {i < history.length - 1 && <ChevronRight className="w-3 h-3 opacity-20" />}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Decorative scanline */}
      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400/20 group-hover:left-full transition-all duration-1000"></div>
    </div>
  );
};

export default GestureChips;
