import React, { useRef, useCallback } from 'react';
import { useGestureRecognition } from '../hooks/useGestureRecognition';
import { Activity, Camera as CameraIcon } from 'lucide-react';

const Camera = ({ moduleName, onGestureUpdate }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const lastGestureTimeRef = useRef(0);
  const GESTURE_THROTTLE = 1000; // 1 second between gesture events

  const handleGestureDetected = useCallback((gesture) => {
    const now = Date.now();
    if (now - lastGestureTimeRef.current >= GESTURE_THROTTLE) {
      lastGestureTimeRef.current = now;
      if (onGestureUpdate) onGestureUpdate(gesture);
    }
  }, [onGestureUpdate]);

  const { gesture, confidence } = useGestureRecognition(videoRef, canvasRef, handleGestureDetected);

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden border-2 border-white/5 glass-morphism bg-navy-light/40 shadow-2xl group">
      {/* Hidden video element — the canvas draws its frames */}
      <video
        ref={videoRef}
        playsInline
        muted
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
      {/* Visible canvas with video feed + hand landmarks overlay */}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ width: '100%', height: 'auto', transform: 'scaleX(-1)', display: 'block' }}
        className="relative z-10"
      />

      <div className="absolute top-6 left-6 z-20 flex flex-col gap-4">
        <div className="px-4 py-2 bg-navy-deep/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00F5FF]"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Live Gesture Engine</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
        <div className="flex flex-col gap-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1 flex items-center gap-2">
                <Activity className="w-3 h-3" /> System Diagnostics
            </div>
            <div className="flex items-center gap-4">
                <div className="px-5 py-3 glass-morphism rounded-2xl border border-cyan-400/20 bg-navy-deep/60">
                    <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Detected</div>
                    <div className="text-xl font-black text-cyan-400 uppercase tracking-tighter">{gesture}</div>
                </div>
                <div className="px-5 py-3 glass-morphism rounded-2xl border border-white/10 bg-navy-deep/60">
                    <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Accuracy</div>
                    <div className="text-xl font-black text-white">{(confidence * 100).toFixed(1)}%</div>
                </div>
            </div>
        </div>

        <div className="p-4 bg-cyan-400/10 rounded-2xl border border-cyan-400/20 backdrop-blur-md">
            <CameraIcon className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,26,0.5)_100%)]"></div>
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
};

export default Camera;
