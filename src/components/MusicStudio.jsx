import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { announcePageContent } from "../utils/accessibility";

export default function MusicStudio() {
  const [currentInstrument, setCurrentInstrument] = useState("piano");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    announcePageContent("Music Studio", "Welcome to the Music Studio! Play instruments and make music!");
  }, []);

  // Piano keys with notes
  const pianoKeys = [
    { note: "C", color: "white", freq: 261.63, label: "Do" },
    { note: "D", color: "white", freq: 293.66, label: "Re" },
    { note: "E", color: "white", freq: 329.63, label: "Mi" },
    { note: "F", color: "white", freq: 349.23, label: "Fa" },
    { note: "G", color: "white", freq: 392.00, label: "Sol" },
    { note: "A", color: "white", freq: 440.00, label: "La" },
    { note: "B", color: "white", freq: 493.88, label: "Ti" },
    { note: "C2", color: "white", freq: 523.25, label: "Do" },
  ];

  const xylophoneKeys = [
    { color: "#FF6B6B", freq: 261.63, label: "C" },
    { color: "#FFA500", freq: 293.66, label: "D" },
    { color: "#FFD93D", freq: 329.63, label: "E" },
    { color: "#6BCB77", freq: 349.23, label: "F" },
    { color: "#4D96FF", freq: 392.00, label: "G" },
    { color: "#A259FF", freq: 440.00, label: "A" },
    { color: "#FFB6C1", freq: 493.88, label: "B" },
    { color: "#FF1493", freq: 523.25, label: "C" },
  ];

  const drums = [
    { name: "Bass Drum", emoji: "🥁", freq: 60 },
    { name: "Snare", emoji: "🪘", freq: 200 },
    { name: "Hi-Hat", emoji: "🎵", freq: 300 },
    { name: "Cymbal", emoji: "💥", freq: 400 },
  ];

  const playSound = (frequency, duration = 0.3) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = currentInstrument === "xylophone" ? "sine" : "triangle";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playDrumSound = (freq) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = "sawtooth";
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const songs = [
    { name: "Twinkle Twinkle", notes: [261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00] },
    { name: "Mary Had a Little Lamb", notes: [329.63, 293.66, 261.63, 293.66, 329.63, 329.63, 329.63] },
    { name: "Happy Birthday", notes: [261.63, 261.63, 293.66, 261.63, 349.23, 329.63] },
  ];

  const playSong = async (song) => {
    setIsPlaying(true);
    for (let i = 0; i < song.notes.length; i++) {
      playSound(song.notes[i], 0.5);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    setIsPlaying(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>🎵 Music Studio</h1>
          <Link to="/" style={{
            background: "white",
            color: "#f5576c",
            padding: "12px 24px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}>
            🏠 Home
          </Link>
        </div>

        {/* Instrument Selector */}
        <div style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          justifyContent: "center"
        }}>
          {["piano", "xylophone", "drums"].map((inst) => (
            <button
              key={inst}
              onClick={() => setCurrentInstrument(inst)}
              style={{
                padding: "15px 30px",
                fontSize: "1.5rem",
                background: currentInstrument === inst ? "white" : "rgba(255,255,255,0.3)",
                color: currentInstrument === inst ? "#f5576c" : "white",
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: "bold",
                textTransform: "capitalize",
                boxShadow: currentInstrument === inst ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
                transform: currentInstrument === inst ? "scale(1.1)" : "scale(1)",
                transition: "all 0.3s"
              }}
            >
              {inst === "piano" && "🎹"} {inst === "xylophone" && "🎼"} {inst === "drums" && "🥁"} {inst}
            </button>
          ))}
        </div>

        {/* Instruments */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          minHeight: "400px"
        }}>
          {currentInstrument === "piano" && (
            <div>
              <h2 style={{ textAlign: "center", color: "#f5576c", marginBottom: "30px" }}>🎹 Piano</h2>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                marginBottom: "30px"
              }}>
                {pianoKeys.map((key, index) => (
                  <button
                    key={index}
                    onClick={() => playSound(key.freq)}
                    style={{
                      width: "80px",
                      height: "250px",
                      background: "linear-gradient(to bottom, #f5f5f5, #ffffff)",
                      border: "2px solid #333",
                      borderRadius: "0 0 8px 8px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      padding: "10px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      transition: "all 0.1s"
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = "translateY(4px)"}
                    onMouseUp={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>{key.label}</div>
                    <div style={{ fontSize: "1.2rem", color: "#333" }}>{key.note}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentInstrument === "xylophone" && (
            <div>
              <h2 style={{ textAlign: "center", color: "#f5576c", marginBottom: "30px" }}>🎼 Xylophone</h2>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "flex-end",
                marginBottom: "30px"
              }}>
                {xylophoneKeys.map((key, index) => (
                  <button
                    key={index}
                    onClick={() => playSound(key.freq)}
                    style={{
                      width: "70px",
                      height: `${200 + index * 20}px`,
                      background: key.color,
                      border: "3px solid #333",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      transition: "all 0.1s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                    onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {key.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentInstrument === "drums" && (
            <div>
              <h2 style={{ textAlign: "center", color: "#f5576c", marginBottom: "30px" }}>🥁 Drums</h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "30px",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                {drums.map((drum, index) => (
                  <button
                    key={index}
                    onClick={() => playDrumSound(drum.freq)}
                    style={{
                      padding: "50px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "3rem",
                      color: "white",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                      transition: "all 0.1s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px"
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                    onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <div>{drum.emoji}</div>
                    <div style={{ fontSize: "1.2rem" }}>{drum.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Songs Section */}
          <div style={{ marginTop: "50px", textAlign: "center" }}>
            <h3 style={{ color: "#f5576c", marginBottom: "20px" }}>🎵 Play a Song!</h3>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              {songs.map((song, index) => (
                <button
                  key={index}
                  onClick={() => playSong(song)}
                  disabled={isPlaying}
                  style={{
                    padding: "15px 30px",
                    background: isPlaying ? "#ccc" : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                  }}
                >
                  {song.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
