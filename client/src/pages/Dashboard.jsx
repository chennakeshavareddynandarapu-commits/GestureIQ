import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Microscope, Briefcase, Camera as CameraIcon, Info, HelpCircle, Activity, Play, Zap, Shield, Database, LayoutPanelTop, BarChart3, Settings } from 'lucide-react';
import Camera from '../components/Camera';
import DFAVisualizer from '../components/DFAVisualizer';
import GestureChips from '../components/GestureChips';
import Walkthrough from '../components/Walkthrough';
import { useWebSocket } from '../hooks/useWebSocket';

const Dashboard = () => {
  const [selectedModule, setSelectedModule] = useState('education');
  const { dfaState, config, history, sendGesture, resetDfa } = useWebSocket(selectedModule);
  const [demoMode, setDemoMode] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  useEffect(() => {
    if (demoMode) {
      const demoSequence = ['pointing', 'thumbsUp'];
      let i = 0;
      const interval = setInterval(() => {
        sendGesture(demoSequence[i % demoSequence.length]);
        i++;
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [demoMode, sendGesture]);

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12 pb-24 relative overflow-hidden">
      {/* Dynamic Glow Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 relative z-10">
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
             <Shield className="w-4 h-4 shadow-[0_0_10px_#00F5FF]" /> Secure Interface Active
          </div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
            System <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-[10px] mt-2 italic">
            Monitoring active DFA state transitions in real-time
          </p>
        </motion.div>

        <div className="flex gap-4 p-2 glass-morphism rounded-3xl border border-white/5 shadow-2xl">
          <button 
             onClick={() => setDemoMode(!demoMode)}
             className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${demoMode ? 'bg-cyan-400 text-navy-deep shadow-[0_0_20px_#00F5FF]' : 'text-cyan-400 hover:bg-white/5'}`}
          >
            <Play className={`w-4 h-4 ${demoMode ? 'fill-navy-deep' : ''}`} /> {demoMode ? 'Demo Active' : 'Start Simulation'}
          </button>
          <button 
             onClick={resetDfa}
             className="flex items-center gap-3 px-8 py-3 glass-morphism rounded-2xl font-black text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            <Database className="w-4 h-4" /> Reset Brain
          </button>
          <button 
             onClick={() => setShowWalkthrough(true)}
             className="flex items-center gap-3 px-8 py-3 glass-morphism rounded-2xl font-black text-xs uppercase tracking-widest text-white/60 hover:text-cyan-400 transition-colors border border-white/5"
          >
            <Info className="w-4 h-4" /> Mechanism FAQ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        <div className="lg:col-span-12 space-y-10">
            {/* Module Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { id: 'education', icon: Brain, label: 'Education Module', desc: 'Science quiz automation' },
                    { id: 'medical', icon: Microscope, label: 'Medical Training', desc: 'Anatomy identification' },
                    { id: 'professional', icon: Briefcase, label: 'Professional Dev', desc: 'Presentation controller' }
                ].map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setSelectedModule(m.id)}
                        className={`p-8 rounded-[2rem] border-2 transition-all duration-500 text-left relative overflow-hidden group ${selectedModule === m.id ? 'bg-cyan-400/10 border-cyan-400/40' : 'bg-navy-light/40 border-white/5 hover:border-white/10'}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                             <div className={`p-4 rounded-2xl ${selectedModule === m.id ? 'bg-cyan-400 text-navy-deep shadow-[0_0_15px_#00F5FF]' : 'bg-white/5 text-white/40'} group-hover:scale-110 transition-transform`}>
                                <m.icon className="w-6 h-6" />
                             </div>
                             {selectedModule === m.id && (
                                <div className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-[8px] font-black uppercase tracking-widest">Active</div>
                             )}
                        </div>
                        <h3 className={`text-xl font-black italic uppercase tracking-tighter mb-2 ${selectedModule === m.id ? 'text-white' : 'text-white/60'}`}>{m.label}</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">{m.desc}</p>
                        {selectedModule === m.id && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Camera Feed */}
        <div className="lg:col-span-7 flex flex-col gap-10">
            <Camera moduleName={selectedModule} onGestureUpdate={sendGesture} />
            <GestureChips history={history} />
        </div>

        {/* DFA Visualiser */}
        <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="h-full">
              <DFAVisualizer config={config} activeState={dfaState?.newState || config?.startState} lastGesture={dfaState?.lastGesture} />
            </div>
            
            {/* Sequence Progress */}
            <div className="glass-morphism p-8 rounded-[2rem] border border-white/5 space-y-6 bg-navy-light/20 relative group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap className="w-24 h-24 text-cyan-400" />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-black uppercase tracking-widest">Protocol Progress</span>
                    </div>
                    <span className="text-sm font-black text-cyan-400 italic">{(dfaState?.progress * 100 || 0).toFixed(0)}%</span>
                </div>
                <div className="w-full h-3 bg-navy-deep rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                       initial={{ width: 0 }}
                       animate={{ width: `${(dfaState?.progress || 0) * 100}%` }}
                       className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_#00F5FF]"
                    />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20 italic">
                    <span>Initial State</span>
                    <span>Accept Terminal</span>
                </div>
            </div>
        </div>
      </div>

      {/* Info Panel Toggle */}
      <section className="py-12 px-12 glass-morphism rounded-[3rem] border-2 border-cyan-400/5 bg-gradient-to-br from-cyan-400/[0.02] to-transparent">
          <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="p-10 bg-cyan-400/10 rounded-[3rem] border border-cyan-400/20 group hover:scale-110 transition-all duration-500">
                   <Info className="w-16 h-16 text-cyan-400 group-hover:rotate-12 transition-transform" />
               </div>
               <div className="flex-1 space-y-6">
                   <h2 className="text-3xl font-black italic uppercase tracking-tighter">Why Deterministic Finite Automata?</h2>
                   <p className="text-white/40 leading-relaxed font-medium">
                      Standard gesture detection is prone to false triggers. GestureIQ uses <span className="text-white">DFA validation</span> to ensure that only specific, intentional <span className="text-white">sequences</span> of gestures result in system actions. This provides a robust, reliable, and secure human-machine interface for critical applications.
                   </p>
                   <div className="flex gap-6">
                       <div className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                           <Database className="w-3 h-3 text-cyan-400" /> Zero False Positive
                       </div>
                       <div className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                           <Shield className="w-3 h-3 text-neon-green" /> Sequence Encrypted
                       </div>
                   </div>
               </div>
          </div>
      </section>

      {/* Nav Sidebar Mockup */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-[100] hidden xl:flex">
          {[
            { to: '/', icon: LayoutPanelTop, label: 'Home' },
            { to: '/dashboard', icon: Database, label: 'Dash' },
            { to: '/analytics', icon: BarChart3, label: 'Stats' },
            { to: '/admin', icon: Settings, label: 'Admin' }
          ].map((item, i) => (
            <Link key={i} to={item.to} className="group relative flex items-center justify-center">
                <div className="w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center border border-white/5 hover:border-cyan-400/40 hover:scale-110 transition-all duration-500 hover:bg-cyan-400 group-hover:text-navy-deep group-hover:shadow-[0_0_20px_#00F5FF]">
                    <item.icon className="w-6 h-6" />
                </div>
                <div className="absolute left-20 px-4 py-2 bg-navy-deep text-cyan-400 font-black uppercase tracking-widest text-[8px] rounded-lg opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all pointer-events-none mb-4 whitespace-nowrap">
                    {item.label}
                </div>
            </Link>
          ))}
      </div>
      <Walkthrough isOpen={showWalkthrough} onClose={() => setShowWalkthrough(false)} />
    </div>
  );
};

export default Dashboard;
