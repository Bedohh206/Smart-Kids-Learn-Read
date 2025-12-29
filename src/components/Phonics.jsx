import React, { useState } from "react";
import { phonicsWords } from "../data/phonics";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";
import { speak } from "../utils/voiceInteraction";

export default function Phonics() {
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Filter words by category
  const getFilteredWords = () => {
    switch (category) {
      case "2":
        return phonicsWords.filter(w => w.letters.length === 2);
      case "3":
        return phonicsWords.filter(w => w.letters.length === 3);
      case "4":
        return phonicsWords.filter(w => w.letters.length === 4);
      case "5":
        return phonicsWords.filter(w => w.letters.length === 5);
      default:
        return phonicsWords;
    }
  };

  const filteredWords = getFilteredWords();
  const current = filteredWords[index] || phonicsWords[0];

  const playWord = async () => {
    // Speak instruction first
    if (voiceEnabled) {
      await speak(`Sound out the word: ${current.word}`);
    }
    
    try {
      await unlockAudio();
      console.log('Playing word:', current.audio);
      const sound = new Howl({
        src: [`/audio/words/${current.audio}`],
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', current.audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/words/${current.audio}`);
          audioEl.play().catch(e => console.error('Fallback failed:', e));
        },
        onplay: () => console.log('Audio is playing:', current.audio),
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
      const audioEl = new Audio(`/audio/words/${current.audio}`);
      audioEl.play().catch(err => console.error('Fallback failed:', err));
    }
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % filteredWords.length);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setIndex(0);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak("Voice assistant turned on!");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>Sound it Out - Phonics</h2>
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

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: "bold", marginRight: 12 }}>Select Category:</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <button
            onClick={() => handleCategoryChange("all")}
            style={{
              padding: "8px 16px",
              backgroundColor: category === "all" ? "#4CAF50" : "#f0f0f0",
              color: category === "all" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: category === "all" ? "bold" : "normal"
            }}
          >
            All Words (200)
          </button>
          <button
            onClick={() => handleCategoryChange("2")}
            style={{
              padding: "8px 16px",
              backgroundColor: category === "2" ? "#4CAF50" : "#f0f0f0",
              color: category === "2" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: category === "2" ? "bold" : "normal"
            }}
          >
            2-Letter Words (50)
          </button>
          <button
            onClick={() => handleCategoryChange("3")}
            style={{
              padding: "8px 16px",
              backgroundColor: category === "3" ? "#4CAF50" : "#f0f0f0",
              color: category === "3" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: category === "3" ? "bold" : "normal"
            }}
          >
            3-Letter Words (50)
          </button>
          <button
            onClick={() => handleCategoryChange("4")}
            style={{
              padding: "8px 16px",
              backgroundColor: category === "4" ? "#4CAF50" : "#f0f0f0",
              color: category === "4" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: category === "4" ? "bold" : "normal"
            }}
          >
            4-Letter Words (50)
          </button>
          <button
            onClick={() => handleCategoryChange("5")}
            style={{
              padding: "8px 16px",
              backgroundColor: category === "5" ? "#4CAF50" : "#f0f0f0",
              color: category === "5" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: category === "5" ? "bold" : "normal"
            }}
          >
            5-Letter Words (50)
          </button>
        </div>
      </div>

      <div style={{ 
        padding: 32, 
        backgroundColor: "#f5f5f5", 
        borderRadius: 8,
        textAlign: "center"
      }}>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
          Word {index + 1} of {filteredWords.length}
        </p>

        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 12, 
          marginBottom: 24,
          fontSize: 48,
          fontWeight: "bold",
          letterSpacing: 8
        }}>
          {current.letters.map((l, i) => (
            <span 
              key={i} 
              style={{
                backgroundColor: "#fff",
                padding: "16px 20px",
                borderRadius: 8,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
              aria-hidden="false"
            >
              {l}
            </span>
          ))}
        </div>

        <button 
          onClick={playWord}
          style={{
            padding: "12px 32px",
            fontSize: 18,
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginRight: 12
          }}
        >
          🔊 Hear the word
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: "12px 32px",
            fontSize: 18,
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
          aria-label="Next phonics word"
        >
          Next Word
        </button>
      </div>
    </div>
  );
}
