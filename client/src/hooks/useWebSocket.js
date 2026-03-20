import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useWebSocket = (moduleName) => {
  const socketRef = useRef(null);
  const [dfaState, setDfaState] = useState(null);
  const [config, setConfig] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
      socketRef.current.emit('join_module', moduleName);
    });

    socketRef.current.on('dfa_config', (data) => {
      setConfig(data);
    });

    socketRef.current.on('dfa_update', (data) => {
      setDfaState(data);
      setHistory(prev => [data.lastGesture, ...prev].slice(0, 5));
    });

    socketRef.current.on('dfa_reset', (data) => {
      setDfaState(prev => ({ ...prev, newState: data.currentState, isAccepted: false, isRejected: false, progress: 0 }));
      setHistory([]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [moduleName]);

  const sendGesture = useCallback((gesture) => {
    if (socketRef.current && gesture !== 'none') {
      socketRef.current.emit('gesture_event', gesture);
    }
  }, []);

  const resetDfa = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('reset_dfa');
    }
  }, []);

  return { dfaState, config, history, sendGesture, resetDfa };
};
