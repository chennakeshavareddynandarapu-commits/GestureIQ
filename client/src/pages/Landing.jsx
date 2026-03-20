import React, { useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Brain, HandMetal, Microscope, Briefcase, ChevronRight, Play, Zap, Activity } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const DomainCard = ({ icon: Icon, title, description, color, link }) => (
    <motion.div
        whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
        className="glass-morphism p-10 rounded-[3rem] border border-white/5 transition-all duration-500 hover:border-cyan-400/20 group relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 p-12 -mr-16 -mt-16 bg-${color}/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-${color}/10 transition-colors`}></div>
        <div className="p-5 bg-navy-light rounded-[2rem] w-fit mb-8 shadow-2xl group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-navy-deep transition-all duration-500">
            <Icon className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black mb-4 uppercase italic tracking-tighter text-white">{title}</h3>
        <p className="text-white/40 leading-relaxed text-sm mb-10 max-w-[200px] font-medium">{description}</p>
        <Link to={link || '/dashboard'} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:translate-x-3 transition-transform">
            Initialize Module <ChevronRight className="w-4 h-4" />
        </Link>
    </motion.div>
);

const Landing = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#020410] overflow-hidden">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 120,
                    interactivity: { events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } } },
                    particles: {
                        color: { value: "#00F5FF" },
                        links: { color: "#00F5FF", distance: 150, enable: true, opacity: 0.2, width: 1 },
                        move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, outModes: { default: "out" } },
                        number: { density: { enable: true, area: 1200 }, value: 100 },
                        opacity: { value: 0.3 },
                        shape: { type: "circle" },
                        size: { value: { min: 1, max: 3 } }
                    }
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col justify-center items-center text-center pt-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'circOut' }}
                        className="space-y-10"
                    >
                        <div className="inline-flex items-center gap-2 py-3 px-8 glass-morphism border border-cyan-400/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 animate-pulse-slow">
                            <Zap className="w-4 h-4 fill-cyan-400" /> Universal Gesture-Based Intelligence
                        </div>

                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase italic max-w-6xl mx-auto flex flex-col items-center">
                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Gesture</span>
                            <span className="text-gradient">IQ Platform</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed uppercase tracking-wide">
                            The universal AI engine for real-time <span className="text-white">gesture-based learning</span> across education, medical training, and professional development.
                        </p>

                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-12">
                            <Link to="/dashboard" className="px-16 py-7 bg-cyan-400 text-navy-deep rounded-3xl font-black text-xl hover:scale-110 hover:-rotate-2 transition-all duration-500 flex items-center gap-4 shadow-[0_0_40px_rgba(0,245,255,0.4)] group">
                                Start Session <Play className="w-6 h-6 fill-navy-deep group-hover:scale-125 transition-transform" />
                            </Link>
                            <a href="#how-it-works" className="px-16 py-7 glass-morphism text-white rounded-3xl font-black text-xl hover:bg-white/10 transition-all duration-500 border border-white/5 uppercase tracking-widest flex items-center gap-4">
                                Mechanism <Activity className="w-5 h-5 text-cyan-400" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Performance Benchmarks */}
                    <div className="mt-32 w-full grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-white/5 py-12">
                         {[
                            { label: 'Latency', val: '< 100ms' },
                            { label: 'Accuracy', val: '99.2%' },
                            { label: 'Protocols', val: '250+' },
                            { label: 'Trigger Drift', val: '0.0%' }
                         ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl font-black text-white italic tracking-tighter mb-2">{item.val}</div>
                                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] font-orbitron">{item.label}</div>
                            </div>
                         ))}
                    </div>
                </section>

                {/* Domains Section */}
                <section className="py-40 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <DomainCard
                        icon={Brain}
                        title="Education"
                        description="AI-driven quizzes and navigation using intuitive hand sequences."
                        color="cyan-400"
                        link="/education"
                    />
                    <DomainCard
                        icon={Microscope}
                        title="Medical Training"
                        description="Precision anatomy identification with validated gesture confirmation."
                        color="neon-green"
                        link="/medical"
                    />
                    <DomainCard
                        icon={Briefcase}
                        title="Professional"
                        description="Touch-less presentation controller and soft skills trainer."
                        color="blue-500"
                        link="/professional"
                    />
                </section>

                {/* DFA Concept Section */}
                <section id="how-it-works" className="py-40 relative group">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-cyan-400/5 rounded-full blur-[150px] pointer-events-none group-hover:bg-cyan-400/10 transition-all duration-1000"></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-12">
                            <h2 className="text-6xl font-black uppercase italic italic tracking-tighter leading-none">
                                Reliability <br/>
                                <span className="text-gradient">By DFA Design</span>
                            </h2>
                            <p className="text-xl text-white/40 font-medium leading-relaxed">
                                Unlike standard gesture detection, <span className="text-white">GestureIQ</span> uses Deterministic Finite Automata (DFA) to validate complex <span className="text-white">gesture sequences</span>.
                            </p>
                            <div className="space-y-8">
                                {[
                                    { step: '01', title: 'Landmark Extraction', desc: 'MediaPipe processes 21 hand points in real-time browser camera.' },
                                    { step: '02', title: 'Sequence Validation', desc: 'Our backend DFA engine ensures only approved patterns trigger actions.' },
                                    { step: '03', title: 'Terminal Actuation', desc: 'Secure execution of commands only upon reaching ACCEPT states.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 group/item">
                                        <div className="text-3xl font-black text-cyan-400/20 group-hover/item:text-cyan-400 transition-colors uppercase italic tracking-tighter">{item.step}</div>
                                        <div>
                                            <div className="text-xl font-bold uppercase mb-3 text-white">{item.title}</div>
                                            <div className="text-white/30 text-sm max-w-sm font-medium">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square glass-morphism rounded-[4rem] border border-white/5 flex items-center justify-center p-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent"></div>
                                <div className="animate-spin-slow w-full h-full border-[10px] border-cyan-400/5 rounded-full border-t-cyan-400/40"></div>
                                <HandMetal className="w-40 h-40 text-cyan-400 drop-shadow-[0_0_50px_rgba(0,245,255,0.4)] absolute" />
                            </div>
                        </div>
                    </div>
                </section>
                
                <footer className="py-20 border-t border-white/5 text-center">
                    <div className="text-2xl font-black uppercase italic mb-4 tracking-tighter">GestureIQ <span className="text-cyan-400">Universal</span></div>
                    <div className="text-white/20 text-[10px] uppercase font-black tracking-[0.4em]">&copy; 2026 Advanced Interface Systems — Protocol Omega</div>
                </footer>
            </div>
            
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Landing;
