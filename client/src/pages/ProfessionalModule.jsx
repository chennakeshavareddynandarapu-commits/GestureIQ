import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, LayoutPanelLeft, ChevronRight, ChevronLeft, Hand, Zap, Shield, Play, Upload, FileUp, FileStack, RefreshCcw, Loader2 } from 'lucide-react';
import Camera from '../components/Camera';
import DFAVisualizer from '../components/DFAVisualizer';
import GestureChips from '../components/GestureChips';
import FeedbackOverlay from '../components/FeedbackOverlay';
import { useWebSocket } from '../hooks/useWebSocket';

const initialSlides = [
  { id: 1, title: "Executive Overview", content: "AI Strategy for Q4 2026. Focus on real-time interface validation.", type: 'text' },
  { id: 2, title: "Architecture Blueprint", content: "DFA engines provide 100% reliability in gesture sequence mapping.", type: 'text' },
  { id: 3, title: "Market Penetration", content: "Targeting Education, Medical, and Enterprise sectors.", type: 'text' }
];

const ProfessionalModule = () => {
  const { dfaState, config, history, sendGesture } = useWebSocket('professional');
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  // Live session timer
  useEffect(() => {
    const interval = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGesture = (gesture) => {
    sendGesture(gesture);
    if (gesture === 'openPalm') setCurrentSlide(prev => (prev + 1) % slides.length);
    if (gesture === 'fist') setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsScanning(true);
    
    // Simulate a "scanning" process that takes 2.5 seconds
    setTimeout(() => {
      const newSlides = Array.from(files).map((file, index) => {
        const fileType = file.type;
        const isPdf = fileType === 'application/pdf';
        const isImage = fileType.startsWith('image/');
        
        return {
          id: `custom-${index}`,
          title: file.name,
          content: URL.createObjectURL(file), // This is the file blob URL
          type: isPdf ? 'pdf' : (isImage ? 'image' : 'unsupported'),
          fileName: file.name
        };
      });
      
      setSlides(newSlides);
      setCurrentSlide(0);
      setIsScanning(false);
    }, 2500);
  };

  const resetPresentation = () => {
    setSlides(initialSlides);
    setCurrentSlide(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24 relative overflow-hidden">
      <FeedbackOverlay state={dfaState} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
             <Briefcase className="w-4 h-4" /> Professional Interface 09
          </div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
            Touch-less <span className="text-gradient">Presentation Controller</span>
          </h1>
          <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-[10px] mt-2 italic">
            Sequence: [Open Palm] = Next → [Fist] = Prev → [Peace] = Highlight → [ThumbsUp] = OK
          </p>
        </motion.div>

        <div className="flex gap-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            accept="image/*,application/pdf,.ppt,.pptx" 
            onChange={handleFileUpload}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerFileUpload}
            disabled={isScanning}
            className="flex items-center gap-4 px-10 py-6 rounded-[2rem] bg-cyan-400 hover:bg-cyan-500 text-navy-deep font-black uppercase italic tracking-tighter text-sm transition-all shadow-[0_0_30px_rgba(0,245,255,0.3)]"
          >
            {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileStack className="w-5 h-5" />}
            {isScanning ? 'Syncing Docs...' : 'Scan PPT / PDF'}
          </motion.button>
          
          {slides !== initialSlides && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetPresentation}
              className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all shadow-xl"
            >
              <RefreshCcw className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Presentation Area */}
        <div className="lg:col-span-8 flex flex-col gap-10">
            <motion.div 
               key={currentSlide + (slides[currentSlide].id)}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="p-0 h-[650px] glass-morphism rounded-[3rem] border-2 border-white/5 bg-navy-light/40 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-2xl"
            >
                {isScanning ? (
                  <div className="flex flex-col items-center gap-8">
                     <div className="relative">
                        <Loader2 className="w-24 h-24 text-cyan-400 animate-spin opacity-20" />
                        <motion.div 
                          animate={{ y: [-30, 30, -30] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-x-0 h-1 bg-cyan-400/50 blur-sm top-1/2 shadow-[0_0_15px_#00F5FF]"
                        />
                     </div>
                     <div className="text-2xl font-black italic uppercase tracking-tighter text-white/40 animate-pulse">
                        Neural Document Scan in Progress...
                     </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-0 right-0 p-16 -mr-24 -mt-24 bg-cyan-400/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <div className="absolute top-8 left-12 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 z-50 font-orbitron bg-navy-deep/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                      Slide 0{currentSlide + 1} // {slides[currentSlide].type.toUpperCase()}
                    </div>
                    
                    <div className="w-full h-full flex items-center justify-center relative">
                      {slides[currentSlide].type === 'image' && (
                        <img 
                          src={slides[currentSlide].content} 
                          alt={slides[currentSlide].title} 
                          className="max-w-[90%] max-h-[85%] object-contain rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      )}
                      
                      {slides[currentSlide].type === 'pdf' && (
                        <div className="w-full h-full p-4 pt-20">
                           <iframe 
                             src={`${slides[currentSlide].content}#toolbar=0&navpanes=0&scrollbar=0`} 
                             className="w-full h-full rounded-2xl border-0 shadow-2xl bg-white/5"
                             title="PDF Viewer"
                           />
                        </div>
                      )}

                      {slides[currentSlide].type === 'unsupported' && (
                        <div className="flex flex-col items-center gap-6 p-20">
                           <FileUp className="w-20 h-20 text-red-500 opacity-20" />
                           <div className="text-3xl font-black uppercase italic text-white/60">Legacy Protocol Detected</div>
                           <p className="text-white/30 text-sm max-w-md">The file "{slides[currentSlide].fileName}" requires local PDF conversion for optimized gesture tracking. Please convert to PDF/Images.</p>
                        </div>
                      )}

                      {slides[currentSlide].type === 'text' && (
                        <div className="flex flex-col items-center justify-center p-16">
                          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white mb-10 max-w-2xl leading-tight">
                             {slides[currentSlide].title}
                          </h2>
                          <div className="text-xl font-medium text-white/40 max-w-xl leading-relaxed">
                             {slides[currentSlide].content}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-50 px-6 py-3 bg-navy-deep/40 backdrop-blur-xl rounded-full border border-white/5">
                        {slides.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-12 bg-cyan-400 glow-cyan shadow-[0_0_10px_#00F5FF]' : 'w-4 bg-white/10'}`}></div>
                        ))}
                    </div>
                  </>
                )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Camera moduleName="professional" onGestureUpdate={handleGesture} />
                <DFAVisualizer config={config} activeState={dfaState?.newState || config?.startState} />
            </div>
            <GestureChips history={history} />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-10">
            <div className="p-8 glass-morphism rounded-[3rem] border border-white/5 space-y-8 bg-navy-light/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                    <Hand className="w-24 h-24 text-cyan-400" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Control Protocol</div>
                <div className="space-y-4">
                    {[
                        { icon: ChevronRight, key: 'Open Palm', val: 'Next Slide', color: 'cyan-400' },
                        { icon: ChevronLeft, key: 'Fist', val: 'Previous Slide', color: 'red-500' },
                        { icon: Zap, key: 'Peace Sign', val: 'Trigger Highlight', color: 'neon-green' },
                        { icon: Shield, key: 'Thumbs Up', val: 'Confirm Protocol', color: 'blue-500' }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-center p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-default group/item">
                            <div className={`p-4 rounded-xl bg-${item.color}/10 group-hover/item:scale-110 group-hover/item:bg-${item.color}/20 transition-all text-${item.color}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-black uppercase text-white/20 tracking-widest">{item.key}</div>
                                <div className="text-sm font-bold text-white/80 italic">{item.val}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 glass-morphism rounded-[3rem] border border-white/5 space-y-4 text-center bg-navy-deep relative overflow-hidden h-40 flex flex-col items-center justify-center">
                <div className="text-[40px] font-black text-white/5 uppercase italic absolute opacity-10">Timer Live</div>
                <div className="text-[10px] font-black uppercase text-cyan-400 tracking-widest mb-2 font-orbitron">Session Duration</div>
                <div className="text-5xl font-black italic tracking-tighter text-white">
                  {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:{String(elapsedSeconds % 60).padStart(2, '0')}
                  <span className="text-white/20">.{String(Math.floor(Math.random() * 99)).padStart(2, '0')}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModule;
