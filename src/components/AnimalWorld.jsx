import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { announcePageContent } from "../utils/accessibility";

export default function AnimalWorld() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState("explore");

  const animals = [
    {
      name: "Lion",
      emoji: "🦁",
      sound: "Roar!",
      color: "#F4A460",
      fact: "Lions are known as the King of the Jungle!",
      habitat: "Savanna",
      food: "Meat"
    },
    {
      name: "Elephant",
      emoji: "🐘",
      sound: "Trumpet!",
      color: "#A9A9A9",
      fact: "Elephants are the largest land animals!",
      habitat: "Forest",
      food: "Plants"
    },
    {
      name: "Monkey",
      emoji: "🐵",
      sound: "Ooh ooh ah ah!",
      color: "#8B4513",
      fact: "Monkeys love to swing from trees!",
      habitat: "Jungle",
      food: "Bananas"
    },
    {
      name: "Dog",
      emoji: "🐕",
      sound: "Woof woof!",
      color: "#D2691E",
      fact: "Dogs are humans' best friends!",
      habitat: "Home",
      food: "Bones"
    },
    {
      name: "Cat",
      emoji: "🐱",
      sound: "Meow!",
      color: "#FFA500",
      fact: "Cats love to play and nap!",
      habitat: "Home",
      food: "Fish"
    },
    {
      name: "Cow",
      emoji: "🐄",
      sound: "Moo!",
      color: "#8B4513",
      fact: "Cows give us milk!",
      habitat: "Farm",
      food: "Grass"
    },
    {
      name: "Duck",
      emoji: "🦆",
      sound: "Quack quack!",
      color: "#FFD700",
      fact: "Ducks love to swim in ponds!",
      habitat: "Pond",
      food: "Seeds"
    },
    {
      name: "Pig",
      emoji: "🐷",
      sound: "Oink oink!",
      color: "#FFB6C1",
      fact: "Pigs are very smart animals!",
      habitat: "Farm",
      food: "Vegetables"
    },
    {
      name: "Horse",
      emoji: "🐴",
      sound: "Neigh!",
      color: "#8B4513",
      fact: "Horses can run very fast!",
      habitat: "Farm",
      food: "Hay"
    },
    {
      name: "Frog",
      emoji: "🐸",
      sound: "Ribbit ribbit!",
      color: "#32CD32",
      fact: "Frogs can jump very high!",
      habitat: "Pond",
      food: "Bugs"
    },
    {
      name: "Bee",
      emoji: "🐝",
      sound: "Buzz buzz!",
      color: "#FFD700",
      fact: "Bees make yummy honey!",
      habitat: "Hive",
      food: "Nectar"
    },
    {
      name: "Fish",
      emoji: "🐠",
      sound: "Blub blub!",
      color: "#4169E1",
      fact: "Fish live underwater and love to swim!",
      habitat: "Ocean",
      food: "Plankton"
    }
  ];

  useEffect(() => {
    announcePageContent("Animal World", "Welcome to Animal World! Meet amazing animals and hear their sounds!");
  }, []);

  const speakAnimalSound = (animal) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(
        `${animal.name} says ${animal.sound}. ${animal.fact}`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAnimalGame = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setSelectedAnimal(randomAnimal);
    setGameMode("quiz");
    
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(
        `Which animal says ${randomAnimal.sound}?`
      );
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnimalGuess = (animal) => {
    if (animal.name === selectedAnimal.name) {
      setScore(score + 1);
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Correct! Great job!");
        window.speechSynthesis.speak(utterance);
      }
      setTimeout(() => {
        playAnimalGame();
      }, 2000);
    } else {
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Try again!");
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>🦁 Animal World</h1>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            {gameMode === "quiz" && (
              <div style={{
                background: "white",
                padding: "10px 20px",
                borderRadius: "12px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#84fab0"
              }}>
                Score: {score} 🌟
              </div>
            )}
            <button
              onClick={() => {
                setGameMode(gameMode === "explore" ? "quiz" : "explore");
                if (gameMode === "explore") playAnimalGame();
              }}
              style={{
                background: "white",
                color: "#84fab0",
                padding: "12px 24px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "bold",
                fontSize: "1.2rem",
                cursor: "pointer"
              }}
            >
              {gameMode === "explore" ? "🎮 Play Game" : "👀 Explore"}
            </button>
            <Link to="/" style={{
              background: "white",
              color: "#84fab0",
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

        {gameMode === "quiz" && selectedAnimal && (
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            <h2 style={{ color: "#84fab0", fontSize: "2rem" }}>
              Which animal says: "{selectedAnimal.sound}"?
            </h2>
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px"
        }}>
          {animals.map((animal, index) => (
            <button
              key={index}
              onClick={() => {
                if (gameMode === "explore") {
                  setSelectedAnimal(animal);
                  speakAnimalSound(animal);
                } else {
                  handleAnimalGuess(animal);
                }
              }}
              style={{
                background: "white",
                border: "none",
                borderRadius: "20px",
                padding: "30px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: "all 0.3s",
                transform: selectedAnimal?.name === animal.name && gameMode === "explore" ? "scale(1.05)" : "scale(1)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{
                fontSize: "5rem",
                marginBottom: "15px",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
              }}>
                {animal.emoji}
              </div>
              <h3 style={{
                color: animal.color,
                fontSize: "1.8rem",
                marginBottom: "10px"
              }}>
                {animal.name}
              </h3>
              <div style={{
                background: animal.color,
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginBottom: "10px"
              }}>
                {animal.sound}
              </div>
              {gameMode === "explore" && (
                <>
                  <div style={{
                    fontSize: "1rem",
                    color: "#666",
                    marginTop: "10px",
                    lineHeight: "1.5"
                  }}>
                    {animal.fact}
                  </div>
                  <div style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "space-around",
                    fontSize: "0.9rem",
                    color: "#888"
                  }}>
                    <span>🏠 {animal.habitat}</span>
                    <span>🍽️ {animal.food}</span>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>

        {selectedAnimal && gameMode === "explore" && (
          <div style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            maxWidth: "300px"
          }}>
            <div style={{ fontSize: "3rem", textAlign: "center", marginBottom: "10px" }}>
              {selectedAnimal.emoji}
            </div>
            <h3 style={{ color: selectedAnimal.color, textAlign: "center", marginBottom: "10px" }}>
              {selectedAnimal.name}
            </h3>
            <p style={{ color: "#666", textAlign: "center" }}>
              {selectedAnimal.fact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
