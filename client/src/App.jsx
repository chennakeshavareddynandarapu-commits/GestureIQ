import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutPanelTop, Brain, Microscope, Briefcase, BarChart3, Settings, Info, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages for performance
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EducationModule = lazy(() => import('./pages/EducationModule'));
const MedicalModule = lazy(() => import('./pages/MedicalModule'));
const ProfessionalModule = lazy(() => import('./pages/ProfessionalModule'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Admin = lazy(() => import('./pages/Admin'));

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Home', icon: LayoutPanelTop },
        { to: '/dashboard', label: 'Dash', icon: Shield },
        { to: '/education', label: 'Edu', icon: Brain },
        { to: '/medical', label: 'Med', icon: Microscope },
        { to: '/professional', label: 'Pro', icon: Briefcase },
        { to: '/analytics', icon: BarChart3, label: 'Stats' },
        { to: '/admin', icon: Settings, label: 'Admin' }
    ];

    return (
        <nav className="fixed top-8 w-[calc(100%-4rem)] left-8 right-8 z-[1000] glass-morphism rounded-[2rem] border border-white/5 px-10 py-5 transition-all duration-500 backdrop-blur-3xl">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="p-3 bg-cyan-400 rounded-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all shadow-[0_0_20px_#00F5FF]">
                        <Shield className="w-6 h-6 text-navy-deep" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                        Gesture<span className="text-gradient">IQ</span>
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.to} 
                            to={link.to} 
                            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan-400 ${location.pathname === link.to ? 'text-cyan-400 scale-105' : 'text-white/40'}`}
                        >
                            <link.icon className="w-4 h-4" /> {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/analytics" className="hidden md:flex items-center gap-3 px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-cyan-400 hover:text-navy-deep transition-all">
                        <Zap className="w-3 h-3" /> Live Protocol
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden overflow-hidden bg-navy-light/90 mt-6 rounded-2xl border-t border-white/5 py-8"
                    >
                        <div className="flex flex-col gap-6 px-4">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.to} 
                                    to={link.to} 
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-white/50 hover:text-cyan-400"
                                >
                                    <link.icon className="w-5 h-5" /> {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const LoadingFallback = () => (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#00F5FF]"></div>
            <div className="font-black text-cyan-400 tracking-[0.4em] uppercase text-[10px] animate-pulse">Synchronising Brain Engine</div>
        </div>
    </div>
);

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-navy-deep text-white font-sans selection:bg-cyan-400 selection:text-navy-deep">
                <Navbar />

                <main className="pt-8">
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/education" element={<EducationModule />} />
                            <Route path="/medical" element={<MedicalModule />} />
                            <Route path="/professional" element={<ProfessionalModule />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </Suspense>
                </main>

                {/* Performance HUD (Global Layout Extra) */}
                <div className="fixed bottom-8 right-8 z-[1000] hidden md:flex items-center gap-4 glass-morphism px-6 py-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Engine Valid</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10"></div>
                    <div className="text-[10px] font-black text-cyan-400 uppercase italic tracking-widest">Protocol Omega-9</div>
                </div>
            </div>
        </Router>
    );
}

export default App;
