import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { announcePageContent } from "../utils/accessibility";

export default function ArtStudio() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#FF6B6B");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("brush");

  const colors = [
    { name: "Red", hex: "#FF6B6B" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Yellow", hex: "#FFD93D" },
    { name: "Green", hex: "#6BCB77" },
    { name: "Blue", hex: "#4D96FF" },
    { name: "Purple", hex: "#A259FF" },
    { name: "Pink", hex: "#FFB6C1" },
    { name: "Brown", hex: "#8B4513" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
  ];

  const stamps = ["⭐", "❤️", "🌈", "🌸", "🦋", "🌞", "🌙", "🎈", "🎨", "✨"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    announcePageContent("Art Studio", "Welcome to the Art Studio! Draw, paint, and create beautiful artwork!");
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    
    if (tool === "stamp") {
      ctx.font = "48px Arial";
      ctx.fillText(stamps[Math.floor(Math.random() * stamps.length)], x - 24, y + 16);
      return;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || tool === "stamp") return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctx.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Canvas cleared!");
      window.speechSynthesis.speak(utterance);
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "my-artwork.png";
    link.href = canvas.toDataURL();
    link.click();
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Great job! Your artwork has been saved!");
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>🎨 Art Studio</h1>
          <Link to="/" style={{
            background: "white",
            color: "#667eea",
            padding: "12px 24px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}>
            🏠 Home
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px" }}>
          {/* Tools Panel */}
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>🖌️ Tools</h3>
            
            <div style={{ marginBottom: "20px" }}>
              <button
                onClick={() => setTool("brush")}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "8px",
                  background: tool === "brush" ? "#667eea" : "#f0f0f0",
                  color: tool === "brush" ? "white" : "#333",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                🖌️ Brush
              </button>
              <button
                onClick={() => setTool("eraser")}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "8px",
                  background: tool === "eraser" ? "#667eea" : "#f0f0f0",
                  color: tool === "eraser" ? "white" : "#333",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                🧹 Eraser
              </button>
              <button
                onClick={() => setTool("stamp")}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: tool === "stamp" ? "#667eea" : "#f0f0f0",
                  color: tool === "stamp" ? "white" : "#333",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ✨ Stamps
              </button>
            </div>

            <h4 style={{ color: "#667eea" }}>Size</h4>
            <input
              type="range"
              min="2"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            
            <h4 style={{ color: "#667eea", marginTop: "20px" }}>Colors</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  style={{
                    background: c.hex,
                    border: color === c.hex ? "4px solid #667eea" : "2px solid #ddd",
                    borderRadius: "10px",
                    width: "60px",
                    height: "60px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                  aria-label={c.name}
                />
              ))}
            </div>

            <button
              onClick={clearCanvas}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "20px",
                background: "#FF6B6B",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🗑️ Clear
            </button>
            
            <button
              onClick={saveDrawing}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                background: "#6BCB77",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              💾 Save
            </button>
          </div>

          {/* Canvas */}
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            <canvas
              ref={canvasRef}
              width={900}
              height={600}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{
                border: "3px solid #667eea",
                borderRadius: "10px",
                cursor: tool === "stamp" ? "pointer" : "crosshair",
                width: "100%",
                maxWidth: "900px"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
