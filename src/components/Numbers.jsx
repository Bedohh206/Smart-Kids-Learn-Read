import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { numbers } from "../data/numbers";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";
import { speak } from "../utils/voiceInteraction";

export default function Numbers() {
  const navigate = useNavigate();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeNumber, setActiveNumber] = useState(null);

  const play = async (audio, number, exampleText) => {
    if (!audio) return;
    
    // Set active for animation
    setActiveNumber(number);
    setTimeout(() => setActiveNumber(null), 1000);
    
    // Speak the number first
    if (voiceEnabled) {
      await speak(`The number ${number}. ${number} ${exampleText}`);
    }
    
    try {
      await unlockAudio();
      console.log('Playing number audio:', audio);
      const sound = new Howl({ 
        src: [`/audio/numbers/${audio}`], 
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', audio),
        onplay: () => console.log('Playing:', audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/numbers/${audio}`);
          audioEl.play().catch(e => console.error('Fallback failed:', e));
        },
        onplayerror: (id, error) => {
          console.error('Error playing audio:', error);
          sound.once('unlock', () => {
            sound.play();
          });
        }
      });
      sound.play();
    } catch (e) {
      console.error('Exception:', e);
      const audioEl = new Audio(`/audio/numbers/${audio}`);
      audioEl.play().catch(err => console.error('Fallback failed:', err));
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak("Voice assistant turned on!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 20px",
            fontSize: 24,
            backgroundColor: "#FF6B6B",
            color: "white",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}
          title="Go Back"
        >
          ← Back
        </button>
        <h2>Numbers</h2>
        <button
          onClick={toggleVoice}
          style={{
            padding: "12px 20px",
            fontSize: 20,
            backgroundColor: voiceEnabled ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}
          title={voiceEnabled ? "Voice On" : "Voice Off"}
        >
          {voiceEnabled ? "🔊" : "🔇"}
        </button>
      </div>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: 24,
        padding: 20
      }}>
        {numbers.map((n) => (
          <button 
            key={n.number} 
            onClick={() => play(n.audio, n.number, n.exampleText)} 
            style={{ 
              padding: "32px 24px",
              fontSize: 20,
              borderRadius: 20,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              transform: activeNumber === n.number ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease",
              animation: activeNumber === n.number ? "zoomOut 0.5s ease" : "none"
            }} 
            aria-label={`Number ${n.number}. ${n.number} ${n.exampleText}`}
          >
            <div style={{ 
              fontSize: 80, 
              fontWeight: "bold",
              textShadow: "3px 3px 6px rgba(0,0,0,0.3)"
            }}>
              {n.number}
            </div>
            <div style={{ 
              fontSize: 24, 
              fontWeight: "600",
              marginTop: -8
            }}>
              {n.word}
            </div>
            <div style={{ 
              fontSize: 40,
              lineHeight: 1.2,
              marginTop: 8
            }}>
              {n.example}
            </div>
            <div style={{ 
              fontSize: 18, 
              fontWeight: "500",
              textTransform: "capitalize",
              opacity: 0.9
            }}>
              {n.number} {n.exampleText}
            </div>
          </button>
        ))}
      </div>
      
      {/* Zoom Animation */}
      <style>{`
        @keyframes zoomOut {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
