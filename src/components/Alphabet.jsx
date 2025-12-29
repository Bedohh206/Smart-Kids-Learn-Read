import React, { useState } from "react";
import { alphabet } from "../data/alphabet";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";
import { speak } from "../utils/voiceInteraction";

export default function Alphabet() {
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const playSound = async (audio, letter) => {
    // Speak the letter first
    if (voiceEnabled) {
      await speak(`The letter ${letter}`);
    }
    try {
      await unlockAudio();
      console.log('Attempting to play:', `/audio/letters/${audio}`);
      const sound = new Howl({
        src: [`/audio/letters/${audio}`],
        html5: true,
        volume: 1.0,
        onload: () => {
          console.log('Audio loaded successfully:', audio);
        },
        onloaderror: (id, error) => {
          console.error('Howler load error:', error, 'for file:', audio);
          // Fallback to native audio
          const audioEl = new Audio(`/audio/letters/${audio}`);
          audioEl.play().catch(e => console.error('Native audio also failed:', e));
        },
        onplay: () => {
          console.log('Audio playing:', audio);
        },
        onplayerror: (id, error) => {
          console.error('Howler play error:', error);
          sound.once('unlock', () => {
            sound.play();
          });
        }
      });
      sound.play();
    } catch (e) {
      console.error('Exception in playSound:', e);
      // Fallback to native HTML5 audio
      const audioEl = new Audio(`/audio/letters/${audio}`);
      audioEl.play().catch(err => console.error('Fallback audio failed:', err));
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak("Voice assistant turned on!");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 0" }}>
        <h2>Alphabet</h2>
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
      <div className="grid">
        {alphabet.map((item) => (
          <button
            key={item.letter}
            className="card"
            onClick={() => playSound(item.audio, item.letter)}
            aria-label={`Play sound for letter ${item.letter}`}
          title={`Play ${item.letter}`}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <h1 style={{ margin: 0 }}>{item.letter}</h1>
            <h2 style={{ margin: 0, fontSize: "48px", color: "#666" }}>{item.letter.toLowerCase()}</h2>
          </div>
          <p>{item.sound}</p>
          <small>{item.word}</small>
        </button>
      ))}
      </div>
    </div>
  );
}
