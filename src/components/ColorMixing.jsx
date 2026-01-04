import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { announcePageContent } from "../utils/accessibility";

export default function ColorMixing() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [mixedColor, setMixedColor] = useState(null);
  const [experiments, setExperiments] = useState(0);

  const primaryColors = [
    { name: "Red", hex: "#FF0000", emoji: "🔴" },
    { name: "Blue", hex: "#0000FF", emoji: "🔵" },
    { name: "Yellow", hex: "#FFFF00", emoji: "🟡" }
  ];

  const colorMixes = {
    "Red+Blue": { name: "Purple", hex: "#8B00FF", emoji: "🟣" },
    "Red+Yellow": { name: "Orange", hex: "#FFA500", emoji: "🟠" },
    "Blue+Yellow": { name: "Green", hex: "#00FF00", emoji: "🟢" },
    "Red+Blue+Yellow": { name: "Brown", hex: "#8B4513", emoji: "🟤" }
  };

  useEffect(() => {
    announcePageContent("Color Mixing Lab", "Welcome to the Color Mixing Lab! Mix colors and discover new ones!");
  }, []);

  const handleColorSelect = (color) => {
    if (selectedColors.length < 3 && !selectedColors.find(c => c.name === color.name)) {
      const newSelected = [...selectedColors, color];
      setSelectedColors(newSelected);
      mixColors(newSelected);
    }
  };

  const mixColors = (colors) => {
    if (colors.length >= 2) {
      const colorKey = colors.map(c => c.name).sort().join("+");
      const result = colorMixes[colorKey];
      if (result) {
        setMixedColor(result);
        setExperiments(experiments + 1);
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(
            `Wow! ${colors.map(c => c.name).join(" and ")} makes ${result.name}!`
          );
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  };

  const reset = () => {
    setSelectedColors([]);
    setMixedColor(null);
  };

  const achievements = [
    { count: 1, message: "First Mix! 🌟", unlocked: experiments >= 1 },
    { count: 3, message: "Color Explorer! 🎨", unlocked: experiments >= 3 },
    { count: 5, message: "Master Mixer! 👑", unlocked: experiments >= 5 },
    { count: 10, message: "Color Scientist! 🔬", unlocked: experiments >= 10 }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>🧪 Color Mixing Lab</h1>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div style={{
              background: "white",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#fcb69f"
            }}>
              Experiments: {experiments} 🔬
            </div>
            <Link to="/" style={{
              background: "white",
              color: "#fcb69f",
              padding: "12px 24px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.2rem"
            }}>
              🏠 Home
            </Link>
          </div>
        </div>

        {/* Achievements */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}>
          <h3 style={{ color: "#fcb69f", marginTop: 0 }}>🏆 Achievements</h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: achievement.unlocked 
                    ? "linear-gradient(135deg, #FFD700, #FFA500)" 
                    : "#f0f0f0",
                  color: achievement.unlocked ? "white" : "#999",
                  fontWeight: "bold",
                  opacity: achievement.unlocked ? 1 : 0.5
                }}
              >
                {achievement.message}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Primary Colors Selection */}
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            <h2 style={{ color: "#fcb69f", textAlign: "center", marginBottom: "30px" }}>
              🎨 Choose Colors to Mix
            </h2>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}>
              {primaryColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  disabled={selectedColors.find(c => c.name === color.name)}
                  style={{
                    padding: "30px",
                    background: color.hex,
                    border: selectedColors.find(c => c.name === color.name) 
                      ? "5px solid #FFD700" 
                      : "3px solid #333",
                    borderRadius: "20px",
                    cursor: selectedColors.find(c => c.name === color.name) ? "not-allowed" : "pointer",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                    transition: "all 0.3s",
                    opacity: selectedColors.find(c => c.name === color.name) ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedColors.find(c => c.name === color.name)) {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  {color.emoji} {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mixing Area */}
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <h2 style={{ color: "#fcb69f", textAlign: "center", marginBottom: "30px" }}>
                🧪 Mixing Bowl
              </h2>
              
              {/* Selected Colors Display */}
              <div style={{
                minHeight: "120px",
                background: "#f9f9f9",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "30px",
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap"
              }}>
                {selectedColors.length === 0 ? (
                  <p style={{ color: "#999", fontSize: "1.2rem" }}>
                    Select colors to start mixing!
                  </p>
                ) : (
                  selectedColors.map((color, index) => (
                    <div
                      key={index}
                      style={{
                        width: "80px",
                        height: "80px",
                        background: color.hex,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        animation: "bounce 0.5s"
                      }}
                    >
                      {color.emoji}
                    </div>
                  ))
                )}
              </div>

              {/* Mixed Color Result */}
              {mixedColor && (
                <div style={{
                  background: mixedColor.hex,
                  borderRadius: "20px",
                  padding: "40px",
                  textAlign: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  animation: "pop 0.5s",
                  marginBottom: "20px"
                }}>
                  <div style={{ fontSize: "5rem", marginBottom: "15px" }}>
                    {mixedColor.emoji}
                  </div>
                  <h3 style={{
                    color: "white",
                    fontSize: "2.5rem",
                    margin: 0,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                  }}>
                    {mixedColor.name}!
                  </h3>
                </div>
              )}

              {selectedColors.length >= 2 && !mixedColor && (
                <div style={{
                  background: "#f0f0f0",
                  borderRadius: "15px",
                  padding: "30px",
                  textAlign: "center",
                  marginBottom: "20px"
                }}>
                  <p style={{ fontSize: "1.5rem", color: "#666", margin: 0 }}>
                    Try a different combination!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={reset}
              style={{
                padding: "20px",
                background: "#FF6B6B",
                color: "white",
                border: "none",
                borderRadius: "15px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              🔄 Start Over
            </button>
          </div>
        </div>

        {/* Color Theory Section */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          marginTop: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}>
          <h3 style={{ color: "#fcb69f", textAlign: "center", marginBottom: "20px" }}>
            🌈 Learn About Color Mixing!
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            {Object.entries(colorMixes).map(([key, value], index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
                  borderRadius: "15px",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
                  {key.split("+").map(c => primaryColors.find(pc => pc.name === c)?.emoji).join(" + ")}
                </div>
                <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>⬇️</div>
                <div style={{ fontSize: "3rem", marginBottom: "10px" }}>{value.emoji}</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#666" }}>
                  {value.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
