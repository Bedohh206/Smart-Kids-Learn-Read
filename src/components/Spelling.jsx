import React, { useState } from "react";
import { phonicsWords } from "../data/phonics";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";
import { speak, startListening, stopListening, matchesWord, encourageChild } from "../utils/voiceInteraction";

export default function Spelling() {
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState(null);

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

  const play = async () => {
    try {
      await unlockAudio();
      console.log('Playing spelling word:', current.audio);
      const sound = new Howl({ 
        src: [`/audio/words/${current.audio}`], 
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', current.audio),
        onplay: () => console.log('Playing:', current.audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/words/${current.audio}`);
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
      const audioEl = new Audio(`/audio/words/${current.audio}`);
      audioEl.play().catch(err => console.error('Fallback failed:', err));
    }
  };

  const check = () => {
    if (guess.trim().toLowerCase() === current.word.toLowerCase()) {
      setMessage("✓ Correct! Great job!");
      if (voiceEnabled) {
        encourageChild(true);
      }
    } else {
      setMessage("✗ Try again");
      if (voiceEnabled) {
        encourageChild(false);
      }
    }
  };

  const handleVoiceSpelling = () => {
    if (isListening) {
      if (recognition) {
        stopListening(recognition);
        setRecognition(null);
      }
      setIsListening(false);
      return;
    }

    setIsListening(true);
    if (voiceEnabled) {
      speak("Spell the word!");
    }

    const recog = startListening(
      (results) => {
        setIsListening(false);
        if (results && results.length > 0) {
          const spokenWord = results[0].transcript;
          console.log('Heard:', spokenWord);
          
          if (matchesWord(spokenWord, current.word)) {
            setGuess(current.word);
            setMessage("✓ Correct! Great job!");
            if (voiceEnabled) {
              encourageChild(true);
            }
          } else {
            setGuess(spokenWord);
            setTimeout(() => check(), 500);
          }
        }
      },
      (error) => {
        setIsListening(false);
        console.error('Speech recognition error:', error);
        if (voiceEnabled) {
          speak("I couldn't hear you. Try again!");
        }
      }
    );
    
    setRecognition(recog);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak("Voice assistant turned on!");
    }
  };

  const playWithVoicePrompt = async () => {
    await play();
    if (voiceEnabled) {
      setTimeout(() => {
        speak(`Can you spell the word you just heard?`);
      }, 1000);
    }
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % filteredWords.length);
    setGuess("");
    setMessage("");
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setIndex(0);
    setGuess("");
    setMessage("");
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>Spelling Practice</h2>
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
        padding: 24, 
        backgroundColor: "#f5f5f5", 
        borderRadius: 8,
        textAlign: "center"
      }}>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
          Word {index + 1} of {filteredWords.length}
        </p>
        
        <button 
          onClick={play}
          style={{
            padding: "12px 24px",
            fontSize: 18,
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginBottom: 20
          }}
        >
          🔊 Play Word
        </button>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="spelling-input" style={{ display: "none" }}>Type the word</label>
          <input 
            id="spelling-input" 
            aria-label="Type the word" 
            value={guess} 
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && check()}
            placeholder="Type the word here" 
            style={{
              padding: 12,
              fontSize: 18,
              width: "100%",
              maxWidth: 300,
              borderRadius: 4,
              border: "2px solid #ddd",
              marginBottom: 12
            }}
          />
          
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button 
              onClick={check} 
              aria-label="Check spelling"
              style={{
                padding: "10px 20px",
                fontSize: 16,
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Check
            </button>
            <button 
              onClick={handleNext}
              style={{
                padding: "10px 20px",
                fontSize: 16,
                backgroundColor: "#FF9800",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Next Word
            </button>
          </div>
        </div>

        {message && (
          <p 
            role="status" 
            aria-live="polite"
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: message.includes("✓") ? "#4CAF50" : "#f44336"
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
