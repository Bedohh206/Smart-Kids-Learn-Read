import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { continents } from '../data/continents';
import { speak } from '../utils/voiceInteraction';

export default function Continents() {
  const navigate = useNavigate();
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
    if (voiceEnabled) {
      speak(`Let's learn about ${continent.name}! ${continent.funFact}`);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak("Voice assistant turned on!");
    }
  };

  const speakFact = (fact) => {
    if (voiceEnabled) {
      speak(fact);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: 24
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          background: "white",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
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
          
          <h1 style={{
            fontSize: 48,
            margin: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold"
          }}>
            🌎 Explore the Continents! 🌍
          </h1>
          
          <button
            onClick={toggleVoice}
            style={{
              padding: "12px 20px",
              fontSize: 24,
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

        {!selectedContinent ? (
          // Continent Selection Grid
          <div>
            <div style={{
              background: "white",
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              textAlign: "center"
            }}>
              <h2 style={{ color: "#667eea", fontSize: 32, margin: 0 }}>
                Choose a continent to explore!
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24
            }}>
              {continents.map((continent) => (
                <button
                  key={continent.name}
                  onClick={() => handleContinentClick(continent)}
                  style={{
                    background: continent.color,
                    borderRadius: 24,
                    padding: "32px 24px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    transition: "all 0.3s",
                    color: "white"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,0,0,0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
                  }}
                >
                  <div style={{ fontSize: 80, marginBottom: 16 }}>
                    {continent.emoji}
                  </div>
                  <h3 style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    margin: "0 0 12px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
                  }}>
                    {continent.name}
                  </h3>
                  <p style={{
                    fontSize: 18,
                    margin: 0,
                    opacity: 0.95,
                    fontWeight: 500
                  }}>
                    Click to explore! 🗺️
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Continent Detail View
          <div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedContinent(null)}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "12px 24px",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 24,
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                color: "#667eea"
              }}
            >
              ← Back to All Continents
            </button>

            {/* Continent Header */}
            <div style={{
              background: selectedContinent.color,
              borderRadius: 24,
              padding: "32px",
              marginBottom: 24,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              textAlign: "center",
              color: "white"
            }}>
              <div style={{ fontSize: 100, marginBottom: 16 }}>
                {selectedContinent.emoji}
              </div>
              <h2 style={{
                fontSize: 56,
                fontWeight: "bold",
                margin: "0 0 16px",
                textShadow: "3px 3px 6px rgba(0,0,0,0.3)"
              }}>
                {selectedContinent.name}
              </h2>
              <p style={{
                fontSize: 24,
                margin: 0,
                fontWeight: 600,
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "12px 24px",
                borderRadius: 12,
                display: "inline-block"
              }}>
                🎉 {selectedContinent.funFact}
              </p>
            </div>

            {/* Video Section */}
            <div style={{
              background: "white",
              borderRadius: 24,
              padding: 32,
              marginBottom: 24,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
            }}>
              <h3 style={{
                fontSize: 32,
                color: "#667eea",
                marginBottom: 24,
                textAlign: "center"
              }}>
                📺 Watch & Learn About {selectedContinent.name}
              </h3>
              <div style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 16,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
              }}>
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none"
                  }}
                  src={`https://www.youtube.com/embed/${selectedContinent.videoId}?rel=0`}
                  title={`Learn about ${selectedContinent.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Fun Facts Section */}
            <div style={{
              background: "white",
              borderRadius: 24,
              padding: 32,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
            }}>
              <h3 style={{
                fontSize: 32,
                color: "#667eea",
                marginBottom: 24,
                textAlign: "center"
              }}>
                🌟 Amazing Facts About {selectedContinent.name}
              </h3>
              <div style={{
                display: "grid",
                gap: 16
              }}>
                {selectedContinent.facts.map((fact, index) => (
                  <button
                    key={index}
                    onClick={() => speakFact(fact)}
                    style={{
                      background: `linear-gradient(135deg, ${selectedContinent.color} 0%, ${selectedContinent.color}DD 100%)`,
                      borderRadius: 16,
                      padding: "20px 24px",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      transition: "all 0.3s",
                      display: "flex",
                      alignItems: "center",
                      gap: 16
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateX(8px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
                    }}
                  >
                    <span style={{
                      fontSize: 32,
                      minWidth: 40
                    }}>
                      {index === 0 ? "🎯" : index === 1 ? "✨" : "🌈"}
                    </span>
                    <span style={{
                      fontSize: 20,
                      color: "white",
                      fontWeight: 500,
                      flex: 1
                    }}>
                      {fact}
                    </span>
                    {voiceEnabled && (
                      <span style={{ fontSize: 24 }}>🔊</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
