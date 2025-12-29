import React, { useState } from "react";
import { numbers } from "../data/numbers";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";
import { speak } from "../utils/voiceInteraction";

export default function Numbers() {
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const play = async (audio, number) => {
    if (!audio) return;
    
    // Speak the number first
    if (voiceEnabled) {
      await speak(`The number ${number}`);
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
        {numbers.map((n) => (
          <button key={n.number} onClick={() => play(n.audio, n.number)} style={{ padding: 16, fontSize: 20 }} aria-label={`Play number ${n.number}`}>
            {n.number}
          </button>
        ))}
      </div>
    </div>
  );
}
