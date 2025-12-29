import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { startVoiceCommandListener, stopVoiceCommandListener } from '../utils/voiceCommands';

export default function GlobalVoiceCommand() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Handle voice commands
  const handleVoiceCommand = () => {
    if (isListening && recognition) {
      stopVoiceCommandListener(recognition);
      setRecognition(null);
      setIsListening(false);
    } else {
      const recog = startVoiceCommandListener(navigate, setIsListening);
      if (recog) {
        setRecognition(recog);
        setIsListening(true);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        try {
          stopVoiceCommandListener(recognition);
        } catch (error) {
          console.error('Error stopping voice command:', error);
        }
      }
    };
  }, [recognition]);

  // Hide on pages with their own speech recognition (Phonics)
  const hideOnPages = ['/phonics'];
  if (hideOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <button
      onClick={handleVoiceCommand}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: 'none',
        background: isListening 
          ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: 28,
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        zIndex: 9999,
        transition: 'all 0.3s ease',
        animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none'
      }}
      title={isListening ? 'Listening... Click to stop' : 'Voice Commands - Click to speak'}
      aria-label={isListening ? 'Stop listening for voice commands' : 'Start listening for voice commands'}
    >
      {isListening ? '🎤' : '🎙️'}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 8px 24px rgba(0,0,0,0.25);
            }
            50% {
              transform: scale(1.1);
              box-shadow: 0 12px 32px rgba(255,107,107,0.5);
            }
          }
        `}
      </style>
    </button>
  );
}
