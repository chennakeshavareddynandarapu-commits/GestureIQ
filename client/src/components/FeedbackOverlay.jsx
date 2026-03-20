import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Volume2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

const FeedbackOverlay = ({ state }) => {
  const [show, setShow] = useState(false);
  const [lastState, setLastState] = useState(null);

  const speak = useCallback((text) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    if (state && (state.isAccepted || state.isRejected)) {
        if (lastState !== state.newState) {
            setShow(true);
            setLastState(state.newState);
            speak(state.statusLabel || (state.isAccepted ? 'Accepted' : 'Rejected'));
            
            if (state.isAccepted) {
              confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00F5FF', '#39FF14']
              });
            }

            const timeout = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }
  }, [state, lastState, speak]);

  if (!state) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
           initial={{ opacity: 0, scale: 0.5, y: 100 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.5, y: -100 }}
           className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] px-16 py-10 rounded-[3rem] backdrop-blur-3xl border-4 ${state.isAccepted ? 'border-neon-green/30 bg-neon-green/10 text-neon-green' : 'border-red-500/30 bg-red-500/10 text-red-500'}`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className={`p-6 rounded-full ${state.isAccepted ? 'bg-neon-green/20' : 'bg-red-500/20'} animate-pulse`}>
               {state.isAccepted ? <CheckCircle className="w-20 h-20" /> : <XCircle className="w-20 h-20" />}
            </div>
            <div className="text-center">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Final Protocol Status</div>
                <div className="text-5xl font-black uppercase italic tracking-tighter">
                   {state.isAccepted ? 'VALID SEQUENCE' : 'REJECTED'}
                </div>
                <div className="text-xl font-bold opacity-80 mt-4 font-orbitron">
                   {state.statusLabel || (state.isAccepted ? 'Sequence Confirmed' : 'Action Denied')}
                </div>
            </div>
            <div className="flex items-center gap-3 mt-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                <Volume2 className="w-4 h-4" /> Voice Feedback Active
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackOverlay;
