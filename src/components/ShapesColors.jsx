import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shapes } from "../data/shapes";
import { colors } from "../data/colors";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";
import { speak } from "../utils/voiceInteraction";

export default function ShapesColors() {
  const navigate = useNavigate();
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak("Voice assistant turned on!");
    }
  };

  const playShape = async (audio, shapeName) => {
    // Speak the shape first
    if (voiceEnabled) {
      await speak(`This is a ${shapeName}`);
    }
    
    try {
      await unlockAudio();
      console.log('Playing shape:', audio);
      const sound = new Howl({
        src: [`/audio/shapes/${audio}`],
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', audio),
        onplay: () => console.log('Playing:', audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/shapes/${audio}`);
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
      const audioEl = new Audio(`/audio/shapes/${audio}`);
      audioEl.play().catch(err => console.error('Fallback failed:', err));
    }
  };

  const playColor = async (audio, colorName) => {
    // Speak the color first
    if (voiceEnabled) {
      await speak(`The color ${colorName}`);
    }
    
    try {
      await unlockAudio();
      console.log('Playing color:', audio);
      const sound = new Howl({
        src: [`/audio/colors/${audio}`],
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', audio),
        onplay: () => console.log('Playing:', audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/colors/${audio}`);
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
      const audioEl = new Audio(`/audio/colors/${audio}`);
      audioEl.play().catch(err => console.error('Fallback failed:', err));
    }
  };

  return (
    <div style={{ padding: 24 }}>
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
        <h2>Shapes & Colors</h2>
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
      <h2>Shapes</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {shapes.map((shape) => (
          <button
            key={shape.name}
            onClick={() => playShape(shape.audio, shape.name)}
            style={{
              padding: 24,
              fontSize: 20,
              borderRadius: 8,
              cursor: "pointer"
            }}
            aria-label={`Play sound for ${shape.name}`}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>
              {shape.name === "Circle" && "⭕"}
              {shape.name === "Square" && "⬜"}
              {shape.name === "Triangle" && "🔺"}
              {shape.name === "Rectangle" && "▭"}
              {shape.name === "Star" && "⭐"}
              {shape.name === "Oval" && "⬭"}
            </div>
            <div>{shape.name}</div>
          </button>
        ))}
      </div>

      <h2>Colors</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => playColor(color.audio, color.name)}
            style={{
              padding: 24,
              fontSize: 20,
              backgroundColor: color.hex,
              color: ["Yellow", "Orange"].includes(color.name) ? "#000" : "#fff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold"
            }}
            aria-label={`Play sound for ${color.name}`}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
}
