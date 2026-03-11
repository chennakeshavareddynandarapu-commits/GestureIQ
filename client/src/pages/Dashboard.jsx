import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Shield, AlertTriangle, MapPin, Eye, Clock, Activity, Zap, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Map Control Component
const SetViewOnMount = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) map.setView(coords, 15);
    }, [coords, map]);
    return null;
};

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="glass-morphism p-6 rounded-3xl border border-white/5 flex flex-col justify-between h-full bg-navy-light/40 relative overflow-hidden group">
        <div className={`absolute top-0 left-0 w-1 h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-full`} style={{ backgroundColor: color }}></div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-${color}/10`} style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-6 h-6" style={{ color }} />
            </div>
            {trend && (
                <div className="text-xs font-bold text-teal-accent flex items-center gap-1 bg-teal-accent/10 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" /> {trend}
                </div>
            )}
        </div>
        <div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</div>
        </div>
    </div>
);

const Dashboard = () => {
    const [reports, setReports] = useState([]);
    const [stats, setStats] = useState({
        totalIncidents: 124,
        incidentsToday: 8,
        safeRoutesGenerated: 452,
        activeAlerts: 3
    });
    const [center, setCenter] = useState([18.5204, 73.8567]); // Default: Pune, India or substitute
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setCenter([pos.coords.latitude, pos.coords.longitude]),
                (err) => console.log('Geolocation error:', err)
            );
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const reportRes = await axios.get('/api/heatmap');
            setReports(reportRes.data);

            const statRes = await axios.get('/api/dashboard/stats');
            setStats(statRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            // Fallback with mock data for demo
            setReports([
                { lat: 18.5204, lng: 73.8567, intensity: 3, type: 'harassment' },
                { lat: 18.5210, lng: 73.8580, intensity: 5, type: 'unsafe_lighting' },
                { lat: 18.5190, lng: 73.8550, intensity: 2, type: 'stalking' }
            ]);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div>
                    <h1 className="text-5xl font-black tracking-tight mb-3">Live Safety <span className="text-teal-accent italic">Heatmap</span></h1>
                    <p className="text-white/40 flex items-center gap-2 font-medium">
                        <Activity className="w-4 h-4 text-teal-accent" /> Showing real-time predictive risk data for your current area.
                    </p>
                </div>
                <button className="flex items-center gap-3 px-6 py-4 glass-morphism rounded-2xl font-bold border border-teal-accent/20 text-teal-accent hover:bg-teal-accent/10 transition-colors">
                    <Zap className="w-5 h-5 fill-teal-accent" /> Generate Safe Route
                </button>
            </div>

            {/* Grid: Stats & Map */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Stats Column */}
                <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    <StatCard
                        icon={AlertTriangle}
                        label="Incidents Today"
                        value={stats.incidentsToday}
                        color="#FF453A"
                        trend="+12%"
                    />
                    <StatCard
                        icon={Shield}
                        label="Total Protected"
                        value={stats.totalIncidents}
                        color="#00FFD1"
                    />
                    <StatCard
                        icon={Zap}
                        label="Safe Routes"
                        value={stats.safeRoutesGenerated}
                        color="#00B4D8"
                    />
                    <StatCard
                        icon={Eye}
                        label="Active Alerts"
                        value={stats.activeAlerts}
                        color="#FFD60A"
                    />
                </div>

                {/* Map Container */}
                <div className="lg:col-span-3 h-[600px] rounded-[3rem] overflow-hidden relative border border-white/5 glass-morphism">
                    {loading && (
                        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-navy-deep/80 backdrop-blur-md">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 border-4 border-teal-accent border-t-transparent rounded-full animate-spin"></div>
                                <div className="font-black text-teal-accent tracking-widest uppercase text-sm animate-pulse">Syncing Intel...</div>
                            </div>
                        </div>
                    )}

                    <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="h-full w-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SetViewOnMount coords={center} />

                        {reports.map((report, idx) => (
                            <Circle
                                key={idx}
                                center={[report.lat, report.lng]}
                                radius={100}
                                pathOptions={{
                                    fillColor: report.intensity > 3 ? '#FF453A' : '#FF9F0A',
                                    color: report.intensity > 3 ? '#FF453A' : '#FF9F0A',
                                    weight: 1,
                                    fillOpacity: 0.4
                                }}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-3">
                                        <div className="text-red-500 font-bold uppercase text-[10px] tracking-widest mb-1">High Risk Zone</div>
                                        <div className="capitalize text-slate-800 font-bold mb-2">{report.type.replace('_', ' ')}</div>
                                        <div className="text-slate-600 text-xs">Based on {report.intensity} recent reports.</div>
                                    </div>
                                </Popup>
                            </Circle>
                        ))}
                    </MapContainer>

                    {/* Overlay UI on Map */}
                    <div className="absolute bottom-6 left-6 z-[1000] glass-morphism px-6 py-4 rounded-2xl border border-white/5 flex gap-8 items-center pointer-events-none md:pointer-events-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-white/60">High Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-xs font-bold text-white/60">Moderate</span>
                        </div>
                        <div className="border-l border-white/10 pl-8 flex items-center gap-2">
                            <Info className="w-4 h-4 text-teal-accent" />
                            <span className="text-xs font-bold text-white/60 capitalize">Pune Safety Sector-4</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real-time Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
                <div className="glass-morphism p-8 rounded-[3rem] border border-white/5">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <Clock className="w-6 h-6 text-teal-accent" /> Recent Activity
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-6 items-start p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-default group">
                                <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-lg">Unsafe Lighting Reported</span>
                                        <span className="text-[10px] font-black text-white/20 uppercase">24 mins ago</span>
                                    </div>
                                    <p className="text-white/40 text-sm">Near University North Gate. Suggest alternate route via Main Library path.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-morphism p-8 rounded-[3rem] border border-white/5 bg-navy-light/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                        <Shield className="w-32 h-32 text-teal-accent/5 -mr-12 -mt-12 animate-pulse-slow" />
                    </div>
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-teal-accent" /> Risk Forecast
                    </h3>
                    <p className="text-white/60 mb-8 leading-relaxed max-w-sm">
                        Our AI predicts a <span className="text-teal-accent font-bold">14% increase</span> in risk levels for Central Campus after 9:00 PM tonight based on historical pattern drift.
                    </p>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                            <span>Sector Stability</span>
                            <span>87%</span>
                        </div>
                        <div className="w-full h-2 bg-navy-deep rounded-full overflow-hidden">
                            <div className="h-full bg-teal-accent w-[87%] shadow-[0_0_10px_#00FFD1]"></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40 mt-6">
                            <span>Predictive Confidence</span>
                            <span>94%</span>
                        </div>
                        <div className="w-full h-2 bg-navy-deep rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[94%] shadow-[0_0_10px_#3B82F6]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
