import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Mic, Eye, Save, Trash2, Plus } from 'lucide-react';
import axios from 'axios';

const SafetySettings = () => {
    const userId = 'anonymous_user_01';
    const [settings, setSettings] = useState({
        emergencyContacts: [],
        pwsisMode: 'standard',
        voiceActivationEnabled: true,
        inactivityDetectionEnabled: false,
        inactivityThreshold: 15
    });
    const [newContact, setNewContact] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get(`/api/settings/${userId}`);
            setSettings(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch settings');
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await axios.post(`/api/settings/${userId}`, settings);
            alert('Settings updated successfully!');
        } catch (err) {
            console.error('Failed to save settings');
        }
    };

    const addContact = () => {
        if (newContact.name && newContact.phone) {
            setSettings({
                ...settings,
                emergencyContacts: [...settings.emergencyContacts, newContact]
            });
            setNewContact({ name: '', phone: '' });
        }
    };

    const removeContact = (index) => {
        const updated = [...settings.emergencyContacts];
        updated.splice(index, 1);
        setSettings({ ...settings, emergencyContacts: updated });
    };

    if (loading) return <div className="p-20 text-center animate-pulse">Initializing Security Protocols...</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-5xl font-black mb-12 tracking-tight uppercase">
                Privacy & <span className="text-teal-accent italic">Safety Settings</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Emergency Contacts */}
                <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <Phone className="w-6 h-6 text-teal-accent" /> Emergency Contacts
                    </h2>
                    <p className="text-white/40 text-sm font-medium">These contacts will be instantly notified with your live location during an SOS trigger.</p>
                    
                    <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                        {settings.emergencyContacts.map((contact, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div>
                                    <div className="font-bold">{contact.name}</div>
                                    <div className="text-xs text-white/40">{contact.phone}</div>
                                </div>
                                <button onClick={() => removeContact(i)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-3">
                        <input 
                            placeholder="Contact Name"
                            value={newContact.name}
                            onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                            className="w-full bg-navy-deep border border-white/10 rounded-xl p-3 text-sm text-white"
                        />
                        <div className="flex gap-2">
                            <input 
                                placeholder="Phone Number"
                                value={newContact.phone}
                                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                                className="flex-1 bg-navy-deep border border-white/10 rounded-xl p-3 text-sm text-white"
                            />
                            <button onClick={addContact} className="px-4 bg-teal-accent text-navy-deep rounded-xl font-bold">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* AI Features */}
                <div className="space-y-8">
                    <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <Mic className="w-6 h-6 text-blue-500" /> Voice Assistant
                        </h2>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-white/60">Voice Activation Enabled</span>
                            <button 
                                onClick={() => setSettings({...settings, voiceActivationEnabled: !settings.voiceActivationEnabled})}
                                className={`w-12 h-6 rounded-full transition-colors relative ${settings.voiceActivationEnabled ? 'bg-teal-accent' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-navy-deep rounded-full transition-all ${settings.voiceActivationEnabled ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <p className="text-[10px] text-white/30 tracking-wider font-bold">"PWSIS, Help" or "PWSIS, Send SOS" triggers immediate alert.</p>
                    </div>

                    <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <Eye className="w-6 h-6 text-orange-500" /> Distress Detection
                        </h2>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-white/60">Auto Inactivity Detection</span>
                            <button 
                                onClick={() => setSettings({...settings, inactivityDetectionEnabled: !settings.inactivityDetectionEnabled})}
                                className={`w-12 h-6 rounded-full transition-colors relative ${settings.inactivityDetectionEnabled ? 'bg-teal-accent' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-navy-deep rounded-full transition-all ${settings.inactivityDetectionEnabled ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-white/40">Threshold:</span>
                            <input 
                                type="range" 
                                min="5" 
                                max="60" 
                                step="5"
                                value={settings.inactivityThreshold}
                                onChange={(e) => setSettings({...settings, inactivityThreshold: parseInt(e.target.value)})}
                                className="flex-1 accent-teal-accent"
                            />
                            <span className="text-xs font-black text-teal-accent">{settings.inactivityThreshold}m</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <button 
                    onClick={handleSave}
                    className="px-16 py-6 bg-gradient-to-r from-teal-accent to-blue-500 text-navy-deep rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4"
                >
                    <Save className="w-6 h-6" /> SAVE ENCRYPTION KEYS
                </button>
            </div>
        </div>
    );
};

export default SafetySettings;
