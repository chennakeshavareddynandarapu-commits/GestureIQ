import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronRight, CheckCircle2, XCircle, Info, HelpCircle } from 'lucide-react';
import Camera from '../components/Camera';
import DFAVisualizer from '../components/DFAVisualizer';
import GestureChips from '../components/GestureChips';
import FeedbackOverlay from '../components/FeedbackOverlay';
import { useWebSocket } from '../hooks/useWebSocket';

const questions = [
  { id: 1, text: "Wait, is DNA a double helix structure?", answer: "thumbsUp" },
  { id: 2, text: "Do humans share 98% of their DNA with chimpanzees?", answer: "thumbsUp" },
  { id: 3, text: "Is the speed of light slower in water than in a vacuum?", answer: "thumbsUp" },
  { id: 4, text: "Does a diamond float in liquid silver?", answer: "thumbsDown" },
  { id: 5, text: "Is the human heart located on the right side of the chest?", answer: "thumbsDown" }
];

const EducationModule = () => {
  const { dfaState, config, history, sendGesture } = useWebSocket('education');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleGesture = (gesture) => {
    sendGesture(gesture);
  };

  // React to DFA state changes to check answers and advance
  React.useEffect(() => {
    if (!dfaState) return;
    if (dfaState.isAccepted) {
      // Check if the last gesture matches the expected answer
      const lastGesture = dfaState.lastGesture;
      const expectedAnswer = questions[currentQuestion]?.answer;
      if (lastGesture === expectedAnswer) {
        setScore(prev => prev + 1);
      }
      // Advance to next question after a short delay
      const timeout = setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [dfaState?.isAccepted, dfaState?.newState]);


  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24 relative overflow-hidden">
      <FeedbackOverlay state={dfaState} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
             <Brain className="w-4 h-4" /> Cognitive Protocol 01
          </div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
            Science <span className="text-gradient">Intelligence Quiz</span>
          </h1>
          <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-[10px] mt-2 italic">
            Sequence: [Point] to start → [ThumbsUp/Down] to answer → [Accept]
          </p>
        </motion.div>
        
        <div className="flex gap-4">
            <div className="p-8 glass-morphism rounded-[2rem] border border-white/5 bg-navy-light/40 flex flex-col items-center justify-center min-w-[160px]">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Score Pulse</div>
                <div className="text-5xl font-black text-cyan-400 italic italic tracking-tighter">0{score}</div>
            </div>
            <div className="p-8 glass-morphism rounded-[2rem] border border-white/5 bg-navy-light/40 flex flex-col items-center justify-center min-w-[160px]">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Progress</div>
                <div className="text-5xl font-black text-white italic italic tracking-tighter">{currentQuestion + 1}<span className="text-white/20">/0{questions.length}</span></div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
            {/* Question Card */}
            <motion.div 
               key={currentQuestion}
               initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               className="p-12 glass-morphism rounded-[3rem] border-2 border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.03] to-transparent relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-12 -mr-16 -mt-16 bg-cyan-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex gap-8 items-start relative z-10">
                    <div className="p-5 bg-navy-deep rounded-2xl border border-white/10 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-navy-deep transition-all duration-500">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                             System Query <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                        </div>
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight max-w-xl">
                           {questions[currentQuestion].text}
                        </h2>
                    </div>
                </div>
            </motion.div>

            <Camera moduleName="education" onGestureUpdate={handleGesture} />
            <GestureChips history={history} />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-10">
            <DFAVisualizer config={config} activeState={dfaState?.newState || config?.startState} />
            
            <div className="p-8 glass-morphism rounded-[3rem] border border-white/5 space-y-8 bg-navy-light/40 relative overflow-hidden">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Gesture Control Legend</div>
                <div className="space-y-6">
                    <div className="flex justify-between items-center group/item hover:bg-white/5 p-4 rounded-3xl transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-2 glass-morphism rounded-xl border-2 border-cyan-400/20 text-cyan-400 font-black uppercase text-[10px] italic tracking-widest group-hover/item:bg-cyan-400 group-hover/item:text-navy-deep group-hover/item:-rotate-3 transition-all">Pointing</div>
                            <div className="text-xs font-bold text-white/60">Navigate / Select</div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 opacity-20 group-hover/item:opacity-100" />
                    </div>
                    <div className="flex justify-between items-center group/item hover:bg-green-400/5 p-4 rounded-3xl transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-2 glass-morphism rounded-xl border-2 border-neon-green/20 text-neon-green font-black uppercase text-[10px] italic tracking-widest group-hover/item:bg-neon-green group-hover/item:text-navy-deep transition-all">Thumbs Up</div>
                            <div className="text-xs font-bold text-white/60 text-neon-green/60">Logic: TRUE</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center group/item hover:bg-red-400/5 p-4 rounded-3xl transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-2 glass-morphism rounded-xl border-2 border-red-500/20 text-red-500 font-black uppercase text-[10px] italic tracking-widest group-hover/item:bg-red-500 group-hover/item:text-white transition-all group-hover/item:rotate-3">Thumbs Down</div>
                            <div className="text-xs font-bold text-white/60 text-red-500/60">Logic: FALSE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EducationModule;
