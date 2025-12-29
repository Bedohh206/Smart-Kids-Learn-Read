import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";

export default function Math() {
  const [operation, setOperation] = useState("addition");
  const [difficulty, setDifficulty] = useState("easy");
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Generate a new math problem
  const generateProblem = () => {
    let num1, num2, correctAnswer, questionText;
    
    switch (operation) {
      case "addition":
        if (difficulty === "easy") {
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
        } else if (difficulty === "medium") {
          num1 = Math.floor(Math.random() * 20) + 1;
          num2 = Math.floor(Math.random() * 20) + 1;
        } else {
          num1 = Math.floor(Math.random() * 50) + 1;
          num2 = Math.floor(Math.random() * 50) + 1;
        }
        correctAnswer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;

      case "subtraction":
        if (difficulty === "easy") {
          num1 = Math.floor(Math.random() * 10) + 5;
          num2 = Math.floor(Math.random() * num1) + 1;
        } else if (difficulty === "medium") {
          num1 = Math.floor(Math.random() * 20) + 10;
          num2 = Math.floor(Math.random() * num1) + 1;
        } else {
          num1 = Math.floor(Math.random() * 50) + 20;
          num2 = Math.floor(Math.random() * num1) + 1;
        }
        correctAnswer = num1 - num2;
        questionText = `${num1} - ${num2}`;
        break;

      case "multiplication":
        if (difficulty === "easy") {
          num1 = Math.floor(Math.random() * 5) + 1;
          num2 = Math.floor(Math.random() * 5) + 1;
        } else if (difficulty === "medium") {
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
        } else {
          num1 = Math.floor(Math.random() * 12) + 1;
          num2 = Math.floor(Math.random() * 12) + 1;
        }
        correctAnswer = num1 * num2;
        questionText = `${num1} × ${num2}`;
        break;

      case "division":
        if (difficulty === "easy") {
          num2 = Math.floor(Math.random() * 5) + 1;
          correctAnswer = Math.floor(Math.random() * 5) + 1;
        } else if (difficulty === "medium") {
          num2 = Math.floor(Math.random() * 10) + 1;
          correctAnswer = Math.floor(Math.random() * 10) + 1;
        } else {
          num2 = Math.floor(Math.random() * 12) + 1;
          correctAnswer = Math.floor(Math.random() * 12) + 1;
        }
        num1 = num2 * correctAnswer;
        questionText = `${num1} ÷ ${num2}`;
        break;

      default:
        num1 = 1;
        num2 = 1;
        correctAnswer = 2;
        questionText = "1 + 1";
    }

    setProblem({
      num1,
      num2,
      correctAnswer,
      questionText,
      operation
    });
    setAnswer("");
    setMessage("");
  };

  useEffect(() => {
    generateProblem();
  }, [operation, difficulty]);

  const playSound = async (isCorrect) => {
    try {
      await unlockAudio();
      const audio = new Audio(isCorrect ? 
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUYrTp66hTEgxMouLvuGkcBjiR1/LMeSwFJHfH8N2QQAoUYrTp66hTEg==' : 
        'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==');
      audio.play().catch(e => console.error('Audio play failed:', e));
    } catch (e) {
      console.error('Exception:', e);
    }
  };

  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    
    if (isNaN(userAnswer)) {
      setMessage("Please enter a number");
      return;
    }

    setAttempts(attempts + 1);

    if (userAnswer === problem.correctAnswer) {
      setMessage("✓ Correct! Great job!");
      setScore(score + 1);
      playSound(true);
      setTimeout(() => {
        generateProblem();
      }, 1500);
    } else {
      setMessage(`✗ Not quite. Try again!`);
      playSound(false);
    }
  };

  const handleOperationChange = (newOperation) => {
    setOperation(newOperation);
    setScore(0);
    setAttempts(0);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Math Practice</h2>

      {/* Operation Selection */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: "bold", marginRight: 12 }}>Select Operation:</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <button
            onClick={() => handleOperationChange("addition")}
            style={{
              padding: "8px 16px",
              backgroundColor: operation === "addition" ? "#4CAF50" : "#f0f0f0",
              color: operation === "addition" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: operation === "addition" ? "bold" : "normal"
            }}
          >
            ➕ Addition
          </button>
          <button
            onClick={() => handleOperationChange("subtraction")}
            style={{
              padding: "8px 16px",
              backgroundColor: operation === "subtraction" ? "#2196F3" : "#f0f0f0",
              color: operation === "subtraction" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: operation === "subtraction" ? "bold" : "normal"
            }}
          >
            ➖ Subtraction
          </button>
          <button
            onClick={() => handleOperationChange("multiplication")}
            style={{
              padding: "8px 16px",
              backgroundColor: operation === "multiplication" ? "#FF9800" : "#f0f0f0",
              color: operation === "multiplication" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: operation === "multiplication" ? "bold" : "normal"
            }}
          >
            ✖️ Multiplication
          </button>
          <button
            onClick={() => handleOperationChange("division")}
            style={{
              padding: "8px 16px",
              backgroundColor: operation === "division" ? "#9C27B0" : "#f0f0f0",
              color: operation === "division" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: operation === "division" ? "bold" : "normal"
            }}
          >
            ➗ Division
          </button>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: "bold", marginRight: 12 }}>Difficulty:</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <button
            onClick={() => handleDifficultyChange("easy")}
            style={{
              padding: "8px 16px",
              backgroundColor: difficulty === "easy" ? "#4CAF50" : "#f0f0f0",
              color: difficulty === "easy" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: difficulty === "easy" ? "bold" : "normal"
            }}
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultyChange("medium")}
            style={{
              padding: "8px 16px",
              backgroundColor: difficulty === "medium" ? "#FF9800" : "#f0f0f0",
              color: difficulty === "medium" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: difficulty === "medium" ? "bold" : "normal"
            }}
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultyChange("hard")}
            style={{
              padding: "8px 16px",
              backgroundColor: difficulty === "hard" ? "#f44336" : "#f0f0f0",
              color: difficulty === "hard" ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: difficulty === "hard" ? "bold" : "normal"
            }}
          >
            Hard
          </button>
        </div>
      </div>

      {/* Score Display */}
      <div style={{ 
        backgroundColor: "#e3f2fd", 
        padding: 16, 
        borderRadius: 8,
        marginBottom: 24,
        textAlign: "center"
      }}>
        <p style={{ margin: 0, fontSize: 18, fontWeight: "bold" }}>
          Score: {score} / {attempts} 
          {attempts > 0 && ` (${Math.round((score/attempts) * 100)}%)`}
        </p>
      </div>

      {/* Problem Display */}
      <div style={{ 
        padding: 48, 
        backgroundColor: "#f5f5f5", 
        borderRadius: 8,
        textAlign: "center"
      }}>
        <div style={{ 
          fontSize: 72, 
          fontWeight: "bold", 
          marginBottom: 32,
          fontFamily: "monospace"
        }}>
          {problem.questionText}
        </div>

        <div style={{ marginBottom: 24 }}>
          <input 
            type="number"
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Your answer" 
            style={{
              padding: 16,
              fontSize: 32,
              width: 200,
              textAlign: "center",
              borderRadius: 8,
              border: "2px solid #ddd",
              marginBottom: 16
            }}
            autoFocus
          />
          
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button 
              onClick={checkAnswer}
              style={{
                padding: "12px 32px",
                fontSize: 20,
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Check Answer
            </button>
            <button 
              onClick={generateProblem}
              style={{
                padding: "12px 32px",
                fontSize: 20,
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Skip
            </button>
          </div>
        </div>

        {message && (
          <p 
            style={{
              marginTop: 24,
              fontSize: 28,
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
