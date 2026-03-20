import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Shield, Zap, Target, ArrowRight, Play, X } from 'lucide-react';

const steps = [
  { 
    title: "Detect", 
    icon: Camera, 
    color: "cyan-400",
    desc: "MediaPipe extraction system identifies 21 hand landmarks in real-time from the ocular sensor (webcam). Each joint coordinate is mapped with sub-millisecond precision." 
  },
  { 
    title: "Validate", 
    icon: Shield, 
    color: "neon-green",
    desc: "The landmark stream is sent to our backend DFA engine. The Deterministic Finite Automaton ensures that only approved gesture sequences can progress the system state." 
  },
  { 
    title: "Act", 
    icon: Zap, 
    color: "blue-500",
    desc: "Upon reaching an ACCEPT terminal state, the system executes the mapped protocol command (Next Slide, Answer Quiz, etc.) with verified intent." 
  }
];

const Walkthrough = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-navy-deep/90 backdrop-blur-3xl"
        >
            <div className="max-w-4xl w-full glass-morphism rounded-[4rem] border border-white/5 bg-navy-light/60 p-16 relative overflow-hidden group">
                <div className="absolute top-8 right-8 cursor-pointer p-4 hover:scale-125 transition-transform" onClick={onClose}>
                    <X className="w-8 h-8 text-white/40 hover:text-white" />
                </div>

                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/2 space-y-10">
                        <div className="px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 rounded-full text-[9px] font-black uppercase tracking-[0.4em] w-fit">
                            System Mechanism Walkthrough
                        </div>
                        <h2 className="text-6xl font-black italic uppercase italic tracking-tighter leading-none">
                            Phase <span className="text-gradient">0{activeStep + 1}</span>
                        </h2>
                        
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase tracking-tighter text-white">{steps[activeStep].title}</h3>
                            <p className="text-white/40 font-medium leading-relaxed italic">{steps[activeStep].desc}</p>
                        </div>

                        <div className="flex gap-4 pt-10">
                            {steps.map((_, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setActiveStep(i)}
                                    className={`h-2 rounded-full transition-all duration-500 ${activeStep === i ? 'w-16 bg-cyan-400 glow-cyan shadow-[0_0_15px_#00F5FF]' : 'w-4 bg-white/10'}`}
                                />
                            ))}
                        </div>
                        
                        {activeStep < 2 ? (
                            <button 
                                onClick={() => setActiveStep(activeStep + 1)}
                                className="px-10 py-5 bg-cyan-400 text-navy-deep rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all mt-10"
                            >
                                Next Sequence <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button 
                                onClick={onClose}
                                className="px-10 py-5 bg-neon-green text-navy-deep rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all mt-10"
                            >
                                Launch Interface <Play className="w-4 h-4 fill-navy-deep" />
                            </button>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 flex items-center justify-center relative">
                        <motion.div 
                           key={activeStep}
                           initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
                           animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                           className={`p-20 rounded-full bg-${steps[activeStep].color}/10 border-4 border-dashed border-${steps[activeStep].color}/20 relative group-hover:rotate-6 transition-transform duration-1000`}
                        >
                            <div className="p-12 bg-navy-deep rounded-full border-2 border-white/5 relative z-10">
                                {React.createElement(steps[activeStep].icon, { className: `w-24 h-24 text-${steps[activeStep].color} drop-shadow-[0_0_30px_rgba(0,245,255,0.4)]` })}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-full animate-pulse-slow"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Walkthrough;
