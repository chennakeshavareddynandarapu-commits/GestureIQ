import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Report from './pages/Report';
import { Shield, Map, AlertTriangle, User, Home, AlertCircle } from 'lucide-react';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-navy-deep text-white font-sans overflow-x-hidden selection:bg-teal-accent selection:text-navy-deep">
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 glass-morphism py-4 px-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-gradient-to-br from-teal-accent to-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,255,209,0.4)]">
                                <Shield className="w-6 h-6 text-navy-deep" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter bg-clip-text text-white">
                                A3J<span className="text-teal-accent">SECURE</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8 font-medium text-white/70">
                            <Link to="/" className="hover:text-teal-accent transition-colors flex items-center gap-2">
                                <Home className="w-4 h-4" /> Home
                            </Link>
                            <Link to="/dashboard" className="hover:text-teal-accent transition-colors flex items-center gap-2">
                                <Map className="w-4 h-4" /> Live Map
                            </Link>
                            <Link to="/report" className="px-5 py-2 bg-teal-accent/10 border border-teal-accent/30 text-teal-accent rounded-full hover:bg-teal-accent hover:text-navy-deep transition-all duration-300 font-bold flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Report Incident
                            </Link>
                        </div>

                        <div className="md:hidden">
                            <AlertTriangle className="w-6 h-6 text-teal-accent" />
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="pt-24 pb-12">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/report" element={<Report />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="border-t border-white/5 py-12 px-6 bg-navy-light/30">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <Shield className="w-6 h-6 text-teal-accent" />
                                <span className="text-xl font-bold tracking-tight">A3Jsecure</span>
                            </div>
                            <p className="text-white/50 max-w-sm mb-6 leading-relaxed">
                                Empowering public safety through predictive AI and real-time community reporting. Shifting from reactive to preventive protection.
                            </p>
                            <div className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded-full hover:bg-teal-accent/20 cursor-pointer">
                                    <Shield className="w-5 h-5 text-white/50" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Product</h4>
                            <ul className="space-y-3 text-white/50 text-sm">
                                <li><Link to="/dashboard" className="hover:text-teal-accent transition-colors">Safety Map</Link></li>
                                <li><Link to="/report" className="hover:text-teal-accent transition-colors">Risk Analysis</Link></li>
                                <li><Link to="/report" className="hover:text-teal-accent transition-colors">Safe Routes</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
                            <ul className="space-y-3 text-white/50 text-sm">
                                <li><a href="#" className="hover:text-teal-accent transition-colors">Transparency</a></li>
                                <li><a href="#" className="hover:text-teal-accent transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-teal-accent transition-colors">Contact Support</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/30 text-xs uppercase tracking-widest font-bold">
                        &copy; 2026 A3Jsecure Safety Intelligence — Built for Humanity
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
