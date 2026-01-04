import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { announcePageContent } from "../utils/accessibility";

export default function StoryTime() {
  const [currentStory, setCurrentStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const stories = [
    {
      title: "The Rainbow Adventure",
      emoji: "🌈",
      color: "#FF6B6B",
      pages: [
        {
          text: "Once upon a time, there was a little cloud named Fluffy.",
          image: "☁️",
          color: "#E8F4F8"
        },
        {
          text: "Fluffy loved to make rainbows after the rain!",
          image: "🌈",
          color: "#FFE5E5"
        },
        {
          text: "One day, all the colors ran away to play!",
          image: "🎨",
          color: "#FFF5E5"
        },
        {
          text: "Red went to paint the roses.",
          image: "🌹",
          color: "#FFE5E5"
        },
        {
          text: "Blue jumped into the ocean.",
          image: "🌊",
          color: "#E5F5FF"
        },
        {
          text: "Yellow climbed into the sunshine.",
          image: "☀️",
          color: "#FFFDE5"
        },
        {
          text: "Fluffy gathered all the colors back together, and made the most beautiful rainbow!",
          image: "🌈✨",
          color: "#F0E5FF"
        },
        {
          text: "And everyone lived happily ever after! The End.",
          image: "💖",
          color: "#FFE5F5"
        }
      ]
    },
    {
      title: "The Friendly Dinosaur",
      emoji: "🦕",
      color: "#6BCB77",
      pages: [
        {
          text: "In a land long ago, there lived a baby dinosaur named Dino.",
          image: "🦕",
          color: "#E8F8E8"
        },
        {
          text: "Dino loved to make new friends!",
          image: "👋",
          color: "#E5FFE5"
        },
        {
          text: "First, Dino met a butterfly.",
          image: "🦋",
          color: "#F5E5FF"
        },
        {
          text: "Then, Dino met a bunny rabbit.",
          image: "🐰",
          color: "#FFE5F0"
        },
        {
          text: "They all played together in the sunshine!",
          image: "🌞",
          color: "#FFFDE5"
        },
        {
          text: "Dino learned that friends come in all shapes and sizes!",
          image: "🦕🦋🐰",
          color: "#E5F5FF"
        },
        {
          text: "And they were the best of friends forever! The End.",
          image: "💚",
          color: "#E8F8E8"
        }
      ]
    },
    {
      title: "The Magic Star",
      emoji: "⭐",
      color: "#FFD93D",
      pages: [
        {
          text: "High up in the night sky lived a little star named Sparkle.",
          image: "⭐",
          color: "#1E1E2E"
        },
        {
          text: "Sparkle wanted to make children smile!",
          image: "😊",
          color: "#2E2E4E"
        },
        {
          text: "So Sparkle decided to shine extra bright!",
          image: "✨",
          color: "#3E3E5E"
        },
        {
          text: "Children from all around looked up and made wishes.",
          image: "🌟",
          color: "#4E4E6E"
        },
        {
          text: "Sparkle worked hard to make each wish come true!",
          image: "💫",
          color: "#5E5E7E"
        },
        {
          text: "The children were so happy, they danced and played!",
          image: "🎉",
          color: "#FFFDE5"
        },
        {
          text: "And Sparkle learned that making others happy makes you shine brightest! The End.",
          image: "⭐💖",
          color: "#FFE5F5"
        }
      ]
    },
    {
      title: "The Brave Little Fish",
      emoji: "🐠",
      color: "#4D96FF",
      pages: [
        {
          text: "Deep in the ocean lived a tiny fish named Splash.",
          image: "🐠",
          color: "#E5F5FF"
        },
        {
          text: "Splash was small but very brave!",
          image: "💪",
          color: "#E5F0FF"
        },
        {
          text: "One day, Splash's friend got stuck in some seaweed.",
          image: "🌊",
          color: "#E5EFFF"
        },
        {
          text: "Even though Splash was scared, Splash swam to help!",
          image: "🐟",
          color: "#E5F5FF"
        },
        {
          text: "With careful nibbles, Splash freed the friend!",
          image: "✨",
          color: "#F0F5FF"
        },
        {
          text: "All the ocean animals cheered for brave Splash!",
          image: "🎉🐠🐟🐡",
          color: "#E5FFFF"
        },
        {
          text: "Splash learned that being brave means helping others, no matter how small you are! The End.",
          image: "💙",
          color: "#E5F5FF"
        }
      ]
    }
  ];

  useEffect(() => {
    announcePageContent("Story Time", "Welcome to Story Time! Choose a story to read and listen!");
  }, []);

  const readPage = (text) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const startStory = (story) => {
    setCurrentStory(story);
    setCurrentPage(0);
    setTimeout(() => {
      readPage(story.pages[0].text);
    }, 500);
  };

  const nextPage = () => {
    if (currentPage < currentStory.pages.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      readPage(currentStory.pages[newPage].text);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      readPage(currentStory.pages[newPage].text);
    }
  };

  if (!currentStory) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        padding: "20px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}>
            <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>📚 Story Time</h1>
            <Link to="/" style={{
              background: "white",
              color: "#a8edea",
              padding: "12px 24px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.2rem"
            }}>
              🏠 Home
            </Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px"
          }}>
            {stories.map((story, index) => (
              <button
                key={index}
                onClick={() => startStory(story)}
                style={{
                  background: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "40px",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transition: "all 0.3s",
                  textAlign: "center"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ fontSize: "6rem", marginBottom: "20px" }}>
                  {story.emoji}
                </div>
                <h2 style={{
                  color: story.color,
                  fontSize: "1.8rem",
                  marginBottom: "15px"
                }}>
                  {story.title}
                </h2>
                <div style={{
                  background: story.color,
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "1.2rem",
                  fontWeight: "bold"
                }}>
                  📖 Read Story
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const page = currentStory.pages[currentPage];

  return (
    <div style={{
      minHeight: "100vh",
      background: page.color,
      padding: "20px",
      transition: "background 0.5s"
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>
          <h2 style={{ color: "#333", fontSize: "2rem", margin: 0 }}>
            {currentStory.emoji} {currentStory.title}
          </h2>
          <button
            onClick={() => {
              setCurrentStory(null);
              setCurrentPage(0);
              window.speechSynthesis.cancel();
            }}
            style={{
              background: "white",
              color: "#333",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            📚 Choose Another Story
          </button>
        </div>

        <div style={{
          background: "white",
          borderRadius: "30px",
          padding: "60px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "10rem",
              marginBottom: "40px",
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))"
            }}>
              {page.image}
            </div>
            <p style={{
              fontSize: "2rem",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "Comic Sans MS, cursive"
            }}>
              {page.text}
            </p>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "40px"
          }}>
            <button
              onClick={previousPage}
              disabled={currentPage === 0}
              style={{
                padding: "15px 30px",
                fontSize: "1.5rem",
                background: currentPage === 0 ? "#ddd" : currentStory.color,
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: currentPage === 0 ? "not-allowed" : "pointer",
                fontWeight: "bold",
                boxShadow: currentPage === 0 ? "none" : "0 4px 12px rgba(0,0,0,0.2)"
              }}
            >
              ⬅️ Back
            </button>

            <div style={{
              display: "flex",
              gap: "10px",
              alignItems: "center"
            }}>
              {currentStory.pages.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: index === currentPage ? currentStory.color : "#ddd"
                  }}
                />
              ))}
            </div>

            {currentPage < currentStory.pages.length - 1 ? (
              <button
                onClick={nextPage}
                style={{
                  padding: "15px 30px",
                  fontSize: "1.5rem",
                  background: currentStory.color,
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}
              >
                Next ➡️
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentStory(null);
                  setCurrentPage(0);
                  window.speechSynthesis.cancel();
                }}
                style={{
                  padding: "15px 30px",
                  fontSize: "1.5rem",
                  background: "#6BCB77",
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}
              >
                🎉 Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
