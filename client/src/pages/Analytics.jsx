import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Shield, Database, LayoutPanelTop, BarChart, PieChart } from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
    const lineData = {
        labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        datasets: [{
            label: 'Gesture Accuracy',
            data: [92, 95, 94, 98, 97, 99, 99.2],
            borderColor: '#00F5FF',
            backgroundColor: 'rgba(0, 245, 255, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    const barData = {
        labels: ['Education', 'Medical', 'Professional'],
        datasets: [{
            label: 'Protocol Completions',
            data: [45, 32, 28],
            backgroundColor: ['rgba(0, 245, 255, 0.5)', 'rgba(57, 255, 20, 0.5)', 'rgba(59, 130, 246, 0.5)'],
            borderColor: ['#00F5FF', '#39FF14', '#3B82F6'],
            borderWidth: 2
        }]
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-10">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="flex items-center gap-3 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                     <BarChart3 className="w-4 h-4" /> Cognitive Analytics 05
                  </div>
                  <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
                    System <span className="text-gradient">Performance</span> Metrics
                  </h1>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                   { icon: Activity, label: 'Success Rate', val: '98.5%', color: 'cyan-400', hex: '#00F5FF' },
                   { icon: Shield, label: 'Protocols Validated', val: '1,420', color: 'neon-green', hex: '#39FF14' },
                   { icon: Database, label: 'Latency Pulse', val: '42ms', color: 'blue-500', hex: '#3B82F6' },
                   { icon: TrendingUp, label: 'Accuracy Peak', val: '99.8%', color: 'purple-500', hex: '#A855F7' }
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass-morphism p-8 rounded-[2rem] border border-white/5 bg-navy-light/40 flex flex-col justify-between h-full group hover:border-cyan-400/20 transition-all`}
                    >
                        <div className={`p-4 rounded-xl bg-${item.color}/10 w-fit mb-6 group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-6 h-6" style={{ color: item.hex }} />
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white italic tracking-tighter mb-2">{item.val}</div>
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">{item.label}</div>
                        </div>
                    </motion.div>
                ))}

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="p-10 glass-morphism rounded-[3rem] border border-white/5 bg-navy-light/40 space-y-8">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Real-time Accuracy Divergence</div>
                    <div className="h-[400px]">
                        <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }} />
                    </div>
                </div>

                <div className="p-10 glass-morphism rounded-[3rem] border border-white/5 bg-navy-light/40 space-y-8">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Protocol Distribution by Module</div>
                    <div className="h-[400px] flex items-center justify-center">
                        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }} />
                    </div>
                </div>
            </div>

            <div className="p-10 glass-morphism rounded-[3rem] border border-white/5 bg-navy-light/40 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400">System Integrity</div>
                    <h3 className="text-3xl font-black uppercase italic italic tracking-tighter">AI Gesture Models are Operating at Peak Efficiency</h3>
                    <p className="text-white/40 font-medium leading-relaxed max-w-xl">
                        Our underlying neural processing of 21 landmark points across three domain-specific DFA engines has achieved sub-100ms latency across all tested hardware configurations.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-6 py-2 bg-navy-deep rounded-full border border-white/5 text-[9px] font-black uppercase text-white/20">Protocol: V7.2 Secure</div>
                        <div className="px-6 py-2 bg-navy-deep rounded-full border border-white/5 text-[9px] font-black uppercase text-white/20">Sync: Local + Edge</div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 aspect-video glass-morphism rounded-[2rem] border border-cyan-400/20 flex items-center justify-center p-8 bg-black relative overflow-hidden group/chart">
                     <div className="text-6xl font-black text-cyan-400 italic italic tracking-tighter drop-shadow-[0_0_20px_#00F5FF]">Peak Performance <TrendingUp className="w-8 h-8 group-hover:translate-x-4 transition-transform" /></div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
