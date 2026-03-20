import { useEffect, useRef, useState, useCallback } from 'react';

export const useGestureRecognition = (videoRef, canvasRef, onGestureDetected) => {
  const [gesture, setGesture] = useState('none');
  const [confidence, setConfidence] = useState(0);
  const handsRef = useRef(null);
  const animFrameRef = useRef(null);
  const streamRef = useRef(null);

  const detectGesture = useCallback((landmarks) => {
    // Landmark indices:
    // 0: wrist, 4: thumb tip, 8: index tip, 12: middle tip, 16: ring tip, 20: pinky tip
    // PIP joints: 6 (index), 10 (middle), 14 (ring), 18 (pinky)
    // MCP joints: 5 (index), 9 (middle), 13 (ring), 17 (pinky)
    
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const wrist = landmarks[0];
    const indexMCP = landmarks[5];
    const pinkyMCP = landmarks[17];

    // Check if fingers are extended (tip above PIP joint in Y)
    const isIndexUp = indexTip.y < landmarks[6].y;
    const isMiddleUp = middleTip.y < landmarks[10].y;
    const isRingUp = ringTip.y < landmarks[14].y;
    const isPinkyUp = pinkyTip.y < landmarks[18].y;
    const isThumbOut = Math.abs(thumbTip.x - landmarks[2].x) > 0.04;

    // All fingers extended = open palm
    if (isIndexUp && isMiddleUp && isRingUp && isPinkyUp) {
      return 'openPalm';
    }
    
    // Only index finger up
    if (isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp) {
      // Check for OK sign (thumb and index touching)
      const dist = Math.sqrt(
        Math.pow(thumbTip.x - indexTip.x, 2) + Math.pow(thumbTip.y - indexTip.y, 2)
      );
      if (dist < 0.06) return 'okSign';
      return 'pointing';
    }
    
    // Peace sign (index + middle up)
    if (isIndexUp && isMiddleUp && !isRingUp && !isPinkyUp) {
      return 'peace';
    }
    
    // All fingers curled = fist or thumbs up/down
    if (!isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp) {
      // Thumbs up: thumb tip is clearly above the index MCP 
      if (thumbTip.y < indexMCP.y && thumbTip.y < wrist.y) {
        return 'thumbsUp';
      }
      // Thumbs down: thumb tip is clearly below the pinky MCP
      if (thumbTip.y > pinkyMCP.y && thumbTip.y > wrist.y) {
        return 'thumbsDown';
      }
      return 'fist';
    }
    
    // Wave: pinky up only (or any remaining combo)
    if (!isIndexUp && !isMiddleUp && !isRingUp && isPinkyUp) {
      return 'wave';
    }
    
    return 'none';
  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    let isActive = true;

    const initHands = async () => {
      try {
        // Dynamically import MediaPipe
        const { Hands, HAND_CONNECTIONS } = await import('@mediapipe/hands');
        const { drawConnectors, drawLandmarks } = await import('@mediapipe/drawing_utils');

        if (!isActive) return;

        const hands = new Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
          if (!canvasRef.current) return;
          const canvas = canvasRef.current;
          const canvasCtx = canvas.getContext('2d');
          
          // Set canvas dimensions to match video
          if (videoRef.current) {
            canvas.width = videoRef.current.videoWidth || 640;
            canvas.height = videoRef.current.videoHeight || 480;
          }
          
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw the video frame on canvas
          if (videoRef.current) {
            canvasCtx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          }
          
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            for (const landmarks of results.multiHandLandmarks) {
              drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { 
                color: '#00F5FF', lineWidth: 3 
              });
              drawLandmarks(canvasCtx, landmarks, { 
                color: '#39FF14', lineWidth: 1, radius: 4 
              });
              
              const g = detectGesture(landmarks);
              if (g !== 'none') {
                setGesture(g);
                setConfidence(results.multiHandedness?.[0]?.score || 0.9);
                if (onGestureDetected) onGestureDetected(g);
              }
            }
          } else {
            setGesture('none');
          }
          canvasCtx.restore();
        });

        handsRef.current = hands;

        // Start camera
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480, facingMode: 'user' } 
        });
        
        if (!isActive) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
          };
        });

        const processVideo = async () => {
          if (!isActive || !videoRef.current || !handsRef.current) return;
          try {
            await handsRef.current.send({ image: videoRef.current });
          } catch (e) {
            // Silently handle send errors during cleanup
          }
          if (isActive) {
            animFrameRef.current = requestAnimationFrame(processVideo);
          }
        };
        processVideo();
        
      } catch (err) {
        console.error('Camera/MediaPipe init error:', err.message);
      }
    };

    initHands();

    return () => {
      isActive = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (handsRef.current) {
        try { handsRef.current.close(); } catch(e) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef, canvasRef, detectGesture, onGestureDetected]);

  return { gesture, confidence };
};
