import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Shield, Edit3, Save, Database, User, Play, AlertCircle, Terminal, HardDrive } from 'lucide-react';

const Admin = () => {
  const [jsonConfig, setJsonConfig] = useState(JSON.stringify({
    "name": "education",
    "states": ["S0", "S1", "S2", "S3", "ACCEPT", "REJECT"],
    "transitions": { "S0": { "pointing": "S1" } },
    "startState": "S0",
    "acceptStates": ["ACCEPT"]
  }, null, 2));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
               <Shield className="w-4 h-4 shadow-[0_0_10px_#FF453A]" /> Admin Protocol Restricted
            </div>
            <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
              System <span className="text-gradient">Control Center</span>
            </h1>
          </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
            {/* JSON Editor */}
            <div className="glass-morphism rounded-[3rem] border border-white/5 bg-navy-light/40 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 flex gap-4">
                    <button className="px-6 py-2 bg-cyan-400 text-navy-deep rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
                        <Save className="w-4 h-4" /> Save Sequence
                    </button>
                    <button className="px-6 py-2 glass-morphism text-white/40 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Test Protocol
                    </button>
                </div>
                <div className="p-8 border-b border-white/5 bg-navy-deep/40 flex items-center gap-4">
                    <div className="p-3 bg-cyan-400/10 rounded-xl">
                        <Edit3 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest">DFA Protocol Configuration Editor (JSON)</div>
                </div>
                <div className="p-8">
                    <textarea 
                        value={jsonConfig}
                        onChange={(e) => setJsonConfig(e.target.value)}
                        className="w-full h-[500px] bg-navy-deep/60 p-12 rounded-[2rem] border border-white/5 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-400/40 transition-all spellcheck-false"
                    />
                </div>
            </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
            {/* System Status */}
            <div className="p-8 glass-morphism rounded-[3rem] border border-white/5 bg-navy-light/40 space-y-8 relative overflow-hidden group">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Infrastructure Integrity</div>
                <div className="space-y-6">
                    {[
                        { icon: Database, name: 'Cloud Persistence', status: 'Online', color: 'neon-green', hex: '#39FF14' },
                        { icon: HardDrive, name: 'Local Cache', status: 'Syncing', color: 'cyan-400', hex: '#00F5FF' },
                        { icon: AlertCircle, name: 'Protocol Drift', status: '0.00%', color: 'blue-500', hex: '#3B82F6' }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-center">
                            <div className={`p-4 rounded-xl bg-${item.color}/10`}>
                                <item.icon className="w-5 h-5" style={{ color: item.hex }} />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-black uppercase text-white/20">{item.name}</div>
                                <div className={`text-sm font-bold uppercase italic ${item.status === 'Online' ? 'text-neon-green' : 'text-white/60'}`}>{item.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Auth/User List */}
            <div className="p-10 glass-morphism rounded-[3rem] border border-white/5 bg-navy-light/40 space-y-8 relative overflow-hidden group">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">User Session Logs</div>
                <div className="space-y-6">
                    {[
                        { user: 'admin_nexus', action: 'DFA Config Updated', time: '12m ago' },
                        { user: 'sys_root', action: 'Log Export Triggered', time: '1h ago' }
                    ].map((log, i) => (
                        <div key={i} className="flex gap-6 items-start">
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <User className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold text-white mb-1">{log.user}</div>
                                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest italic">{log.action}</div>
                                <div className="text-[8px] font-black text-white/10 uppercase mt-2 tracking-widest">{log.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button className="w-full p-8 glass-morphism rounded-[2rem] border border-red-500/10 text-red-500 font-black uppercase italic italic tracking-tighter bg-red-500/5 hover:bg-red-500/10 transition-all">
                Emergency System Lockdown
            </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
