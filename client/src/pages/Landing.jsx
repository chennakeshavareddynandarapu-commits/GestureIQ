import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Map, Zap, UserCheck, ArrowRight, ShieldCheck, ZapOff, FingerprintIcon } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="glass-morphism p-8 rounded-3xl transition-all duration-300 border border-teal-accent/5 hover:border-teal-accent/20"
    >
        <div className="p-4 bg-teal-accent/10 rounded-2xl w-fit mb-6">
            <Icon className="w-8 h-8 text-teal-accent" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white/50 leading-relaxed text-sm">{description}</p>
    </motion.div>
);

const Landing = () => {
    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden -mt-24">
                {/* Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-teal-accent/10 border border-teal-accent/20 rounded-full text-teal-accent text-sm font-bold tracking-wider uppercase mb-4">
                        <ShieldCheck className="w-4 h-4" /> AI-Powered Safety Intelligence
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight max-w-4xl mx-auto">
                        Safe<span className="text-teal-accent italic">Her</span> — Proactive Safety for <span className="text-gradient">Every Step</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        A3Jsecure uses AI-driven predictive intelligence to identify risks before they manifest. From campus to public space safety,
                        we shift from reactive reporting to preventive protection.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
                        <Link to="/dashboard" className="w-full md:w-auto px-10 py-5 bg-teal-accent text-navy-deep rounded-2xl font-black text-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,255,209,0.3)]">
                            Explore Live Heatmap <Map className="w-5 h-5" />
                        </Link>
                        <Link to="/report" className="w-full md:w-auto px-10 py-5 glass-morphism text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                            Report Anonymously <Zap className="w-5 h-5 text-teal-accent" />
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-12 w-full max-w-5xl"
                >
                    {[
                        { label: 'Incidents Tracked', val: '4.2k+' },
                        { label: 'Safe Routes Generated', val: '128k+' },
                        { label: 'Active Zones', val: '150+' },
                        { label: 'Response Time', val: 'Instant' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl font-black text-white">{stat.val}</div>
                            <div className="text-xs font-bold text-white/30 uppercase tracking-widest mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={Map}
                    title="Predictive Heatmaps"
                    description="AI models analyze historical data and real-time reports to predict high-risk zones before incidents happen."
                />
                <FeatureCard
                    icon={FingerprintIcon}
                    title="Zero PII Policy"
                    description="Your safety is personal. 100% anonymous reporting with no data tracking or IP logging — purely intelligence driven."
                />
                <FeatureCard
                    icon={Zap}
                    title="Safe Route Planner"
                    description="Input your destination and our AI generates the lowest-risk path, avoiding areas with reported unsafe conditions."
                />
            </section>

            {/* Mid Banner */}
            <section className="py-24 relative overflow-hidden rounded-[3rem] bg-navy-light/40 border border-white/5 group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-accent/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="max-w-4xl mx-auto text-center px-12 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to make your space safer?</h2>
                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                        Join the community-driven safety revolution. No login required, no tracking, just proactive collective intelligence.
                    </p>
                    <Link to="/report" className="px-12 py-6 bg-white text-navy-deep rounded-2xl font-black text-xl hover:scale-110 transition-all duration-300 shadow-2xl">
                        Submit a Report Now
                    </Link>
                </div>
            </section>
            <div className="h-24"></div>
        </div>
    );
};

export default Landing;
