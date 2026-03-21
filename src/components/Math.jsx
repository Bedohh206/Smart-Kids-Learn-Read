import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";
import { updateProgress, getRandomEncouragement } from "../utils/achievements";
import { speak, startListening, stopListening, matchesNumber, encourageChild, askQuestion } from "../utils/voiceInteraction";
import Confetti from "./Confetti";
import AchievementNotification from "./AchievementNotification";

export default function MathPractice() {
  const navigate = useNavigate();
  const [operation, setOperation] = useState("addition");
  const [difficulty, setDifficulty] = useState("easy");
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState(null);

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
    
    // Speak the problem after a short delay
    if (voiceEnabled) {
      setTimeout(() => {
        askQuestion(`What is ${questionText}?`);
      }, 500);
    }
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
      const encouragement = getRandomEncouragement();
      setMessage(`✓ Correct! ${encouragement}`);
      setScore(score + 1);
      playSound(true);
      setShowConfetti(true);
      
      // Voice encouragement
      if (voiceEnabled) {
        encourageChild(true);
      }
      
      // Track progress and check achievements
      const newScore = score + 1;
      const percentage = Math.round((newScore / (attempts + 1)) * 100);
      const result = updateProgress('math', { score: percentage });
      
      if (result.newAchievements.length > 0) {
        setNewAchievement(result.newAchievements[0]);
      }
      
      setTimeout(() => {
        setShowConfetti(false);
        generateProblem();
      }, 1500);
    } else {
      setMessage(`✗ Not quite. Try again!`);
      playSound(false);
      
      // Voice encouragement to try again
      if (voiceEnabled) {
        encourageChild(false);
      }
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

  // Voice Answer - Listen for spoken answer
  const handleVoiceAnswer = () => {
    if (isListening) {
      // Stop listening
      if (recognition) {
        stopListening(recognition);
        setRecognition(null);
      }
      setIsListening(false);
      return;
    }

    // Start listening
    setIsListening(true);
    if (voiceEnabled) {
      speak("I'm listening!");
    }

    const recog = startListening(
      (results) => {
        setIsListening(false);
        if (results && results.length > 0) {
          const spokenAnswer = results[0].transcript;
          console.log('Heard:', spokenAnswer);
          
          // Check if spoken answer matches the correct answer
          if (matchesNumber(spokenAnswer, problem.correctAnswer)) {
            setAnswer(String(problem.correctAnswer));
            setTimeout(() => checkAnswer(), 500);
          } else {
            // Try to parse as number
            const num = parseInt(spokenAnswer.replace(/[^0-9]/g, ''));
            if (!isNaN(num)) {
              setAnswer(String(num));
              setTimeout(() => checkAnswer(), 500);
            } else {
              if (voiceEnabled) {
                speak("I didn't quite catch that. Try typing the answer or say it again!");
              }
              setMessage("🎤 Try saying your answer again!");
            }
          }
        }
      },
      (error) => {
        setIsListening(false);
        console.error('Speech recognition error:', error);
        if (voiceEnabled) {
          speak("Oops! I couldn't hear you. Try again or type your answer!");
        }
      }
    );
    
    setRecognition(recog);
  };

  // Toggle voice
  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak("Voice assistant turned on!");
    }
  };

  if (!problem) return <div>Loading...</div>;

  const operationEmojis = {
    addition: "➕",
    subtraction: "➖",
    multiplication: "✖️",
    division: "➗"
  };

  const operationColors = {
    addition: { bg: "#4CAF50", light: "#C8E6C9" },
    subtraction: { bg: "#2196F3", light: "#BBDEFB" },
    multiplication: { bg: "#FF9800", light: "#FFE0B2" },
    division: { bg: "#9C27B0", light: "#E1BEE7" }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: 24 
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          background: "white",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          position: "relative"
        }}>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              position: "absolute",
              left: 32,
              top: "50%",
              transform: "translateY(-50%)",
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
            🎯 Math Practice
          </h1>
          
          {/* Voice Toggle Button */}
          <button
            onClick={toggleVoice}
            style={{
              position: "absolute",
              right: 32,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "12px 20px",
              fontSize: 24,
              backgroundColor: voiceEnabled ? "#4CAF50" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 0.3s"
            }}
            title={voiceEnabled ? "Voice On" : "Voice Off"}
          >
            {voiceEnabled ? "🔊" : "🔇"}
          </button>
        </div>

        {/* Educational intro for AdSense compliance */}
        <div style={{
          background: "linear-gradient(135deg, #FFEAA7 0%, #fdcb6e 100%)",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 20,
          color: "#333",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, margin: "0 0 8px" }}>➕ What You'll Learn</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            Practice addition, subtraction, multiplication, and division at your own pace.
            This activity helps children develop mental math skills, number fluency, and
            problem-solving confidence — core skills used in everyday life.
          </p>
        </div>

        {/* Operation Selection */}
        <div style={{ 
          background: "white",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
        }}>
          <label style={{ 
            fontSize: 22, 
            fontWeight: "bold", 
            display: "block",
            marginBottom: 16,
            color: "#333"
          }}>
            🎲 Choose Your Challenge:
          </label>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["addition", "subtraction", "multiplication", "division"].map((op) => (
              <button
                key={op}
                onClick={() => handleOperationChange(op)}
                style={{
                  flex: "1 1 180px",
                  padding: "16px 24px",
                  fontSize: 20,
                  backgroundColor: operation === op ? operationColors[op].bg : "#f5f5f5",
                  color: operation === op ? "white" : "#333",
                  border: operation === op ? "3px solid #333" : "3px solid transparent",
                  borderRadius: 16,
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: operation === op ? "0 6px 20px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.1)",
                  transform: operation === op ? "translateY(-2px)" : "none",
                  transition: "all 0.2s"
                }}
              >
                {operationEmojis[op]} {op.charAt(0).toUpperCase() + op.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div style={{ 
          background: "white",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
        }}>
          <label style={{ 
            fontSize: 22, 
            fontWeight: "bold", 
            display: "block",
            marginBottom: 16,
            color: "#333"
          }}>
            🎚️ Pick Your Level:
          </label>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => handleDifficultyChange("easy")}
              style={{
                flex: "1 1 150px",
                padding: "16px 24px",
                fontSize: 20,
                backgroundColor: difficulty === "easy" ? "#4CAF50" : "#f5f5f5",
                color: difficulty === "easy" ? "white" : "#333",
                border: difficulty === "easy" ? "3px solid #2E7D32" : "3px solid transparent",
                borderRadius: 16,
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: difficulty === "easy" ? "0 6px 20px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.1)",
                transform: difficulty === "easy" ? "scale(1.05)" : "none",
                transition: "all 0.2s"
              }}
            >
              😊 Easy
            </button>
            <button
              onClick={() => handleDifficultyChange("medium")}
              style={{
                flex: "1 1 150px",
                padding: "16px 24px",
                fontSize: 20,
                backgroundColor: difficulty === "medium" ? "#FF9800" : "#f5f5f5",
                color: difficulty === "medium" ? "white" : "#333",
                border: difficulty === "medium" ? "3px solid #E65100" : "3px solid transparent",
                borderRadius: 16,
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: difficulty === "medium" ? "0 6px 20px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.1)",
                transform: difficulty === "medium" ? "scale(1.05)" : "none",
                transition: "all 0.2s"
              }}
            >
              😎 Medium
            </button>
            <button
              onClick={() => handleDifficultyChange("hard")}
              style={{
                flex: "1 1 150px",
                padding: "16px 24px",
                fontSize: 20,
                backgroundColor: difficulty === "hard" ? "#f44336" : "#f5f5f5",
                color: difficulty === "hard" ? "white" : "#333",
                border: difficulty === "hard" ? "3px solid #c62828" : "3px solid transparent",
                borderRadius: 16,
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: difficulty === "hard" ? "0 6px 20px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.1)",
                transform: difficulty === "hard" ? "scale(1.05)" : "none",
                transition: "all 0.2s"
              }}
            >
              🔥 Hard
            </button>
          </div>
        </div>

        {/* Score Display */}
        <div style={{ 
          background: "linear-gradient(135deg, #FFF176 0%, #FFD54F 100%)",
          padding: 24,
          borderRadius: 20,
          marginBottom: 20,
          textAlign: "center",
          border: "4px solid #FBC02D",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
        }}>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#F57F17" }}>
            ⭐ Score: {score} / {attempts} 
            {attempts > 0 && ` = ${Math.round((score/attempts) * 100)}% 🎉`}
          </div>
        </div>

        {/* Problem Display */}
        <div style={{ 
          background: operationColors[operation].light,
          padding: "48px 32px",
          borderRadius: 24,
          textAlign: "center",
          border: `6px solid ${operationColors[operation].bg}`,
          boxShadow: "0 12px 48px rgba(0,0,0,0.2)"
        }}>
          <div style={{
            background: "white",
            borderRadius: 20,
            padding: 32,
            marginBottom: 32,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
          }}>
            <div style={{ 
              fontSize: 96, 
              fontWeight: "bold", 
              color: operationColors[operation].bg,
              fontFamily: "Arial, sans-serif",
              textShadow: "3px 3px 6px rgba(0,0,0,0.1)"
            }}>
              {problem.questionText}
            </div>
          </div>

          <div>
            <input 
              type="number"
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="?" 
              style={{
                padding: "20px",
                fontSize: 48,
                width: 280,
                textAlign: "center",
                borderRadius: 16,
                border: "4px solid " + operationColors[operation].bg,
                marginBottom: 24,
                fontWeight: "bold",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
              }}
              autoFocus
            />
            
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {/* Voice Answer Button */}
              <button 
                onClick={handleVoiceAnswer}
                style={{
                  padding: "18px 48px",
                  fontSize: 24,
                  backgroundColor: isListening ? "#f44336" : "#9C27B0",
                  color: "white",
                  border: "none",
                  borderRadius: 16,
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: isListening ? "0 6px 20px rgba(244, 67, 54, 0.4)" : "0 6px 20px rgba(156, 39, 176, 0.4)",
                  transition: "all 0.2s",
                  animation: isListening ? "pulse 1s infinite" : "none"
                }}
                onMouseOver={(e) => !isListening && (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                {isListening ? "🎤 Listening..." : "🎤 Say Answer"}
              </button>
              
              <button 
                onClick={checkAnswer}
                style={{
                  padding: "18px 48px",
                  fontSize: 24,
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: 16,
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                ✓ Check Answer
              </button>
              <button 
                onClick={generateProblem}
                style={{
                  padding: "18px 48px",
                  fontSize: 24,
                  backgroundColor: "#FF9800",
                  color: "white",
                  border: "none",
                  borderRadius: 16,
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 6px 20px rgba(255, 152, 0, 0.4)",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                ⏭️ Next Problem
              </button>
            </div>
          </div>

          {message && (
            <div 
              style={{
                marginTop: 32,
                padding: "20px 32px",
                fontSize: 36,
                fontWeight: "bold",
                color: "white",
                backgroundColor: message.includes("✓") ? "#4CAF50" : "#f44336",
                borderRadius: 16,
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                animation: "bounce 0.5s"
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && <Confetti duration={3000} />}

      {/* Achievement Notification */}
      {newAchievement && (
        <AchievementNotification 
          achievement={newAchievement} 
          onClose={() => setNewAchievement(null)}
        />
      )}
      
      {/* Pulse animation for listening state */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
            }
            50% {
              box-shadow: 0 6px 30px rgba(244, 67, 54, 0.8);
            }
          }
        `}
      </style>
    </div>
  );
}
