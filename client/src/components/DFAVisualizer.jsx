import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, ArrowRight, Zap, Target } from 'lucide-react';

const DFAVisualizer = ({ config, activeState, lastGesture }) => {
  if (!config) return <div className="p-12 text-center text-white/20 font-black uppercase tracking-widest">Initialising Brain Engine...</div>;

  const { states, transitions, startState, acceptStates, rejectStates } = config;

  // Simple layout logic for states
  const layout = useMemo(() => {
    const angleStep = (2 * Math.PI) / states.length;
    const radius = 220; // Radius of layout circle
    const centerX = 300;
    const centerY = 300;

    return states.reduce((acc, state, index) => {
      const angle = index * angleStep;
      acc[state] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
      return acc;
    }, {});
  }, [states]);

  return (
    <div className="relative glass-morphism rounded-3xl border border-white/5 p-8 h-[600px] flex flex-col items-center justify-center bg-navy-light/20 relative overflow-hidden group">
      <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
        <div className="px-4 py-2 bg-neon-green/10 border border-neon-green/20 rounded-xl flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="text-[10px] font-black uppercase tracking-wider text-neon-green">DFA State Processor</span>
        </div>
      </div>

      <svg width="600" height="600" viewBox="0 0 600 600" className="relative z-10">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Draw Transitions (Arrows) */}
        {Object.entries(transitions).map(([from, targetObj]) => (
          Object.entries(targetObj).map(([gesture, to]) => {
            const fromPos = layout[from];
            const toPos = layout[to];
            if (!fromPos || !toPos) return null;

            // Calculate control points for curved arrows if from == to
            const isLoop = from === to;
            
            return (
              <motion.g key={`${from}-${to}-${gesture}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <line
                  x1={fromPos.x} y1={fromPos.y}
                  x2={toPos.x} y2={toPos.y}
                  stroke={from === activeState ? "#00F5FF" : "rgba(255,255,255,0.05)"}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className={from === activeState ? 'animate-pulse' : ''}
                />
                <circle cx={toPos.x} cy={toPos.y} r="4" fill={from === activeState ? "#00F5FF" : "rgba(255,255,255,0.1)"} />
                <foreignObject x={(fromPos.x + toPos.x) / 2 - 25} y={(fromPos.y + toPos.y) / 2 - 10} width="60" height="20">
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-tighter text-center">{gesture}</div>
                </foreignObject>
              </motion.g>
            );
          })
        ))}

        {/* Draw States */}
        {states.map((state) => {
          const { x, y } = layout[state];
          const isActive = state === activeState;
          const isAccepted = acceptStates.includes(state);
          const isRejected = rejectStates.includes(state);

          return (
            <motion.g 
              key={state}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isActive ? 1.2 : 1, 
                opacity: 1,
                x: 0, y: 0 
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <circle
                cx={x} cy={y} r="35"
                fill={isActive ? 'rgba(0, 245, 255, 0.1)' : 'rgba(5, 8, 26, 0.8)'}
                stroke={isActive ? '#00F5FF' : isAccepted ? '#39FF14' : isRejected ? '#FF453A' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isActive ? '4' : '2'}
                filter={isActive ? 'url(#glow)' : ''}
              />
              <text
                x={x} y={y + 5}
                textAnchor="middle"
                className="text-[10px] font-black fill-white uppercase tracking-widest"
              >
                {state}
              </text>
            </motion.g>
          );
        })}
      </svg>
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.03)_0%,transparent_70%)]"></div>
    </div>
  );
};

export default DFAVisualizer;
