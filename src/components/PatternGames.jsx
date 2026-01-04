import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { announcePageContent } from "../utils/accessibility";

export default function PatternGames() {
  const [gameType, setGameType] = useState("sequence");
  const [currentPattern, setCurrentPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showPattern, setShowPattern] = useState(true);
  const [gameState, setGameState] = useState("ready");

  const shapes = ["⭐", "❤️", "🔵", "🟡", "🟢", "🟣", "🔺", "⬛"];
  const animals = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐨"];
  const fruits = ["🍎", "🍊", "🍋", "🍌", "🍇", "🍓", "🍒", "🥝"];

  useEffect(() => {
    announcePageContent("Pattern Games", "Welcome to Pattern Games! Find and complete patterns!");
  }, []);

  const generatePattern = () => {
    const items = gameType === "sequence" ? shapes : gameType === "animals" ? animals : fruits;
    const patternLength = Math.min(3 + Math.floor(level / 2), 8);
    const pattern = [];
    for (let i = 0; i < patternLength; i++) {
      pattern.push(items[Math.floor(Math.random() * Math.min(4 + level, items.length))]);
    }
    setCurrentPattern(pattern);
    setUserPattern([]);
    setGameState("showing");
    setShowPattern(true);

    setTimeout(() => {
      setShowPattern(false);
      setGameState("playing");
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Now it's your turn! Copy the pattern!");
        window.speechSynthesis.speak(utterance);
      }
    }, 2000 + (level * 500));
  };

  const handleItemClick = (item) => {
    if (gameState !== "playing") return;

    const newUserPattern = [...userPattern, item];
    setUserPattern(newUserPattern);

    if (currentPattern[newUserPattern.length - 1] !== item) {
      setGameState("wrong");
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Oops! Try again!");
        window.speechSynthesis.speak(utterance);
      }
      setTimeout(() => {
        setUserPattern([]);
        setShowPattern(true);
        setGameState("showing");
        setTimeout(() => {
          setShowPattern(false);
          setGameState("playing");
        }, 2000);
      }, 1500);
      return;
    }

    if (newUserPattern.length === currentPattern.length) {
      setGameState("correct");
      setScore(score + level * 10);
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Perfect! Great job!");
        window.speechSynthesis.speak(utterance);
      }
      setTimeout(() => {
        setLevel(level + 1);
        generatePattern();
      }, 2000);
    }
  };

  const startGame = () => {
    setScore(0);
    setLevel(1);
    generatePattern();
  };

  const items = gameType === "sequence" ? shapes : gameType === "animals" ? animals : fruits;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
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
          <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>🧩 Pattern Games</h1>
          <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{
              background: "white",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#fa709a"
            }}>
              Level: {level} 🎯
            </div>
            <div style={{
              background: "white",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#fa709a"
            }}>
              Score: {score} ⭐
            </div>
            <Link to="/" style={{
              background: "white",
              color: "#fa709a",
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

        {/* Game Type Selector */}
        <div style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {[
            { type: "sequence", label: "Shapes", emoji: "⭐" },
            { type: "animals", label: "Animals", emoji: "🐶" },
            { type: "fruits", label: "Fruits", emoji: "🍎" }
          ].map((game) => (
            <button
              key={game.type}
              onClick={() => {
                setGameType(game.type);
                if (gameState !== "ready") startGame();
              }}
              style={{
                padding: "15px 30px",
                fontSize: "1.3rem",
                background: gameType === game.type ? "white" : "rgba(255,255,255,0.3)",
                color: gameType === game.type ? "#fa709a" : "white",
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: gameType === game.type ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
                transform: gameType === game.type ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s"
              }}
            >
              {game.emoji} {game.label}
            </button>
          ))}
        </div>

        {/* Game Area */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          minHeight: "500px"
        }}>
          {gameState === "ready" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "6rem", marginBottom: "30px" }}>🧩</div>
              <h2 style={{ color: "#fa709a", fontSize: "2.5rem", marginBottom: "20px" }}>
                Ready to Play?
              </h2>
              <p style={{ fontSize: "1.5rem", color: "#666", marginBottom: "40px" }}>
                Watch the pattern, then copy it!
              </p>
              <button
                onClick={startGame}
                style={{
                  padding: "20px 40px",
                  fontSize: "1.8rem",
                  background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                🎮 Start Game
              </button>
            </div>
          ) : (
            <>
              {/* Pattern Display */}
              <div style={{ marginBottom: "40px" }}>
                <h3 style={{
                  color: "#fa709a",
                  textAlign: "center",
                  fontSize: "2rem",
                  marginBottom: "20px"
                }}>
                  {showPattern ? "👀 Watch the Pattern!" : "🎯 Your Turn!"}
                </h3>
                <div style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  minHeight: "120px",
                  alignItems: "center",
                  padding: "20px",
                  background: "#f9f9f9",
                  borderRadius: "15px"
                }}>
                  {(showPattern ? currentPattern : userPattern).map((item, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "4rem",
                        animation: showPattern ? "bounce 0.5s" : "pop 0.3s",
                        animationDelay: `${index * 0.2}s`,
                        animationFillMode: "backwards"
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Item Selection */}
              {!showPattern && (
                <div>
                  <h4 style={{
                    color: "#666",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    marginBottom: "20px"
                  }}>
                    Click the items in order:
                  </h4>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                    gap: "15px",
                    maxWidth: "600px",
                    margin: "0 auto"
                  }}>
                    {items.slice(0, Math.min(4 + level, items.length)).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleItemClick(item)}
                        disabled={gameState !== "playing"}
                        style={{
                          padding: "20px",
                          fontSize: "4rem",
                          background: "white",
                          border: "3px solid #fa709a",
                          borderRadius: "15px",
                          cursor: gameState === "playing" ? "pointer" : "not-allowed",
                          transition: "all 0.2s",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                        onMouseEnter={(e) => {
                          if (gameState === "playing") {
                            e.currentTarget.style.transform = "scale(1.1)";
                            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {gameState === "correct" && (
                <div style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  padding: "40px",
                  borderRadius: "20px",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  textAlign: "center",
                  zIndex: 1000,
                  animation: "pop 0.5s"
                }}>
                  <div style={{ fontSize: "6rem", marginBottom: "20px" }}>🎉</div>
                  <h2 style={{ color: "#6BCB77", fontSize: "3rem", margin: 0 }}>
                    Perfect!
                  </h2>
                </div>
              )}

              {gameState === "wrong" && (
                <div style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  padding: "40px",
                  borderRadius: "20px",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  textAlign: "center",
                  zIndex: 1000,
                  animation: "shake 0.5s"
                }}>
                  <div style={{ fontSize: "6rem", marginBottom: "20px" }}>🤔</div>
                  <h2 style={{ color: "#FF6B6B", fontSize: "3rem", margin: 0 }}>
                    Try Again!
                  </h2>
                </div>
              )}
            </>
          )}
        </div>

        {/* Instructions */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          marginTop: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}>
          <h3 style={{ color: "#fa709a", textAlign: "center", marginBottom: "15px" }}>
            📖 How to Play
          </h3>
          <ul style={{
            fontSize: "1.2rem",
            color: "#666",
            lineHeight: "1.8",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            <li>Watch the pattern carefully</li>
            <li>When it disappears, click the items in the same order</li>
            <li>Each level gets a little harder!</li>
            <li>Try to get the highest score!</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(-50%, -50%) rotate(-5deg); }
          75% { transform: translate(-50%, -50%) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
