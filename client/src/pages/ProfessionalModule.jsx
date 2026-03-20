import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, LayoutPanelLeft, ChevronRight, ChevronLeft, Hand, Zap, Shield, Play } from 'lucide-react';
import Camera from '../components/Camera';
import DFAVisualizer from '../components/DFAVisualizer';
import GestureChips from '../components/GestureChips';
import FeedbackOverlay from '../components/FeedbackOverlay';
import { useWebSocket } from '../hooks/useWebSocket';

const slides = [
  { id: 1, title: "Executive Overview", content: "AI Strategy for Q4 2026. Focus on real-time interface validation." },
  { id: 2, title: "Architecture Blueprint", content: "DFA engines provide 100% reliability in gesture sequence mapping." },
  { id: 3, title: "Market Penetration", content: "Targeting Education, Medical, and Enterprise sectors." }
];

const ProfessionalModule = () => {
  const { dfaState, config, history, sendGesture } = useWebSocket('professional');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Live session timer
  useEffect(() => {
    const interval = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGesture = (gesture) => {
    sendGesture(gesture);
    if (gesture === 'openPalm') setCurrentSlide(prev => (prev + 1) % slides.length);
    if (gesture === 'fist') setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24 relative overflow-hidden">
      <FeedbackOverlay state={dfaState} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
             <Briefcase className="w-4 h-4" /> Professional Interface 09
          </div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
            Touch-less <span className="text-gradient">Presentation Controller</span>
          </h1>
          <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-[10px] mt-2 italic">
            Sequence: [Open Palm] = Next → [Fist] = Prev → [Peace] = Highlight → [ThumbsUp] = OK
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Presentation Area */}
        <div className="lg:col-span-8 flex flex-col gap-10">
            <motion.div 
               key={currentSlide}
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -100 }}
               className="p-16 h-[500px] glass-morphism rounded-[3rem] border-2 border-white/5 bg-navy-light/40 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-2xl"
            >
                <div className="absolute top-0 right-0 p-16 -mr-24 -mt-24 bg-cyan-400/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-6 font-orbitron">Slide 0{currentSlide + 1} // Protocol Loaded</div>
                <h2 className="text-6xl font-black italic uppercase italic tracking-tighter text-white mb-10 max-w-2xl leading-tight">
                   {slides[currentSlide].title}
                </h2>
                <div className="text-xl font-medium text-white/40 max-w-xl leading-relaxed">
                   {slides[currentSlide].content}
                </div>
                <div className="absolute bottom-12 flex gap-4">
                    {slides.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-12 bg-cyan-400 glow-cyan shadow-[0_0_10px_#00F5FF]' : 'w-4 bg-white/10'}`}></div>
                    ))}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Camera moduleName="professional" onGestureUpdate={handleGesture} />
                <DFAVisualizer config={config} activeState={dfaState?.newState || config?.startState} />
            </div>
            <GestureChips history={history} />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-10">
            <div className="p-8 glass-morphism rounded-[3rem] border border-white/5 space-y-8 bg-navy-light/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                    <Hand className="w-24 h-24 text-cyan-400" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Control Protocol</div>
                <div className="space-y-4">
                    {[
                        { icon: ChevronRight, key: 'Open Palm', val: 'Next Sequence', color: 'cyan-400' },
                        { icon: ChevronLeft, key: 'Fist', val: 'Rollback Sequence', color: 'red-500' },
                        { icon: Zap, key: 'Peace Sign', val: 'Trigger Highlight', color: 'neon-green' },
                        { icon: Shield, key: 'Thumbs Up', val: 'Confirm Protocol', color: 'blue-500' }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-center p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-default group/item">
                            <div className={`p-4 rounded-xl bg-${item.color}/10 group-hover/item:scale-110 group-hover/item:bg-${item.color}/20 transition-all`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-black uppercase text-white/20 tracking-widest">{item.key}</div>
                                <div className="text-sm font-bold text-white/80 italic">{item.val}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 glass-morphism rounded-[3rem] border border-white/5 space-y-4 text-center bg-navy-deep relative overflow-hidden h-40 flex flex-col items-center justify-center">
                <div className="text-[40px] font-black text-white/5 uppercase italic absolute opacity-10">Timer Live</div>
                <div className="text-[10px] font-black uppercase text-cyan-400 tracking-widest mb-2 font-orbitron">Session Duration</div>
                <div className="text-5xl font-black italic italic tracking-tighter text-white">
                  {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:{String(elapsedSeconds % 60).padStart(2, '0')}
                  <span className="text-white/20">.{String(Math.floor(Math.random() * 99)).padStart(2, '0')}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModule;
