import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Info, Shield, CheckCircle2, Target, Microscope as MicroscopeIcon } from 'lucide-react';
import Camera from '../components/Camera';
import DFAVisualizer from '../components/DFAVisualizer';
import GestureChips from '../components/GestureChips';
import FeedbackOverlay from '../components/FeedbackOverlay';
import { useWebSocket } from '../hooks/useWebSocket';

const organs = [
  { id: 'heart', name: 'Cardiac Center', info: 'Pumps oxygenated blood. 4 primary chambers.', region: { top: '35%', left: '48%' } },
  { id: 'lungs', name: 'Pulmonary Matrix', info: 'Gas exchange protocols. High surface area.', region: { top: '30%', left: '35%' } },
  { id: 'brain', name: 'Neural Processor', info: 'Primary control unit. 86 billion neurons.', region: { top: '10%', left: '48%' } },
  { id: 'liver', name: 'Biosynthetic Hub', info: 'Metabolic synthesis and detoxification.', region: { top: '45%', left: '40%' } }
];

const MedicalModule = () => {
  const { dfaState, config, history, sendGesture } = useWebSocket('medical');
  const [selectedOrgan, setSelectedOrgan] = useState(null);

  const handleGesture = (gesture) => {
    sendGesture(gesture);
    if (gesture === 'okSign' && dfaState?.isAccepted) {
        // Confirm action
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24 relative overflow-hidden">
      <FeedbackOverlay state={dfaState} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 text-neon-green text-[10px] font-black uppercase tracking-[0.4em] mb-4">
             <Microscope className="w-4 h-4" /> Surgical Protocol 04
          </div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
            Anatomy <span className="text-gradient">Identification</span>
          </h1>
          <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-[10px] mt-2 italic">
            Sequence: [Point] to target → [Wait 2s] → [OK Sign] to confirm inspection
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Anatomy Visualizer */}
        <div className="lg:col-span-4 relative group">
            <div className="glass-morphism rounded-[3rem] border border-white/5 p-12 bg-navy-light/40 h-[700px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* SVG Human Fig Mockup */}
                    <svg viewBox="0 0 100 200" className="h-full opacity-20">
                        <path d="M50 20 L40 50 L30 150 L50 190 L70 150 L60 50 Z" fill="none" stroke="white" strokeWidth="2" />
                        <circle cx="50" cy="25" r="15" fill="none" stroke="white" strokeWidth="2" />
                    </svg>

                    {organs.map((organ) => (
                        <motion.button
                            key={organ.id}
                            style={{ top: organ.region.top, left: organ.region.left }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setSelectedOrgan(organ)}
                            className={`absolute p-4 rounded-full border-2 transition-all ${selectedOrgan?.id === organ.id ? 'bg-neon-green/20 border-neon-green shadow-green scale-125' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                        >
                            <Target className={`w-6 h-6 ${selectedOrgan?.id === organ.id ? 'text-neon-green' : 'text-white/20'}`} />
                        </motion.button>
                    ))}
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 p-8 glass-morphism rounded-3xl border border-white/5 text-center bg-navy-deep/80 backdrop-blur-3xl">
                    <AnimatePresence mode="wait">
                        {selectedOrgan ? (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key={selectedOrgan.id}>
                                <div className="text-[9px] font-black uppercase text-neon-green tracking-widest mb-1">Inspecting</div>
                                <div className="text-xl font-black uppercase italic tracking-tighter mb-2">{selectedOrgan.name}</div>
                                <div className="text-[10px] text-white/40 leading-relaxed font-medium uppercase italic">{selectedOrgan.info}</div>
                            </motion.div>
                        ) : (
                            <div className="text-[10px] text-white/20 font-black uppercase tracking-widest italic">Point and use OK Sign to Identify</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Camera moduleName="medical" onGestureUpdate={handleGesture} />
                <DFAVisualizer config={config} activeState={dfaState?.newState || config?.startState} />
            </div>
            <GestureChips history={history} />
            
            <div className="p-8 glass-morphism rounded-[3rem] border border-white/5 bg-navy-light/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                    <MicroscopeIcon className="w-32 h-32 text-neon-green" />
                </div>
                <div className="space-y-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Operational Feedback</div>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-2">
                             <div className="text-[10px] font-black uppercase text-white/20">Protocol Status</div>
                             <div className={`text-xl font-bold uppercase italic tracking-tighter ${dfaState?.isAccepted ? 'text-neon-green' : 'text-white/60'}`}>
                                {dfaState?.statusLabel || 'Awaiting Input'}
                             </div>
                        </div>
                        <div className="space-y-4">
                             <div className="flex justify-between text-[10px] font-black uppercase text-white/20">Validator Integrity</div>
                             <div className="w-full h-1.5 bg-navy-deep rounded-full overflow-hidden">
                                 <motion.div animate={{ width: '99%' }} className="h-full bg-neon-green shadow-green" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalModule;
