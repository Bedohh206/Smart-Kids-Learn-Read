import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { speak } from '../utils/voiceInteraction';
import { useKeyboardNavigation } from '../utils/useKeyboardNavigation';
import { announcePageContent } from '../utils/accessibility';

export default function BlockGame() {
  const navigate = useNavigate();
  const [placedBlocks, setPlacedBlocks] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useKeyboardNavigation('Block Game');

  // Available block colors
  const blockColors = [
    { name: 'Red', color: '#FF6B6B', emoji: '🔴' },
    { name: 'Blue', color: '#4ECDC4', emoji: '🔵' },
    { name: 'Green', color: '#96CEB4', emoji: '🟢' },
    { name: 'Yellow', color: '#FFEAA7', emoji: '🟡' },
    { name: 'Purple', color: '#A8A4FF', emoji: '🟣' },
    { name: 'Orange', color: '#FF9A76', emoji: '🟠' }
  ];

  useEffect(() => {
    setTimeout(() => {
      announcePageContent(
        'Block Building Game',
        'Choose a colored block and click on the building area to stack blocks. Make tall towers!'
      );
      if (voiceEnabled) {
        speak('Welcome to the Block Game! Choose a color and start building!');
      }
    }, 500);
  }, []);

  const selectBlock = (block) => {
    setSelectedColor(block);
    if (voiceEnabled) {
      speak(`${block.name} block selected`);
    }
  };

  const placeBlock = () => {
    if (!selectedColor) {
      if (voiceEnabled) {
        speak('Please choose a block color first!');
      }
      return;
    }

    const newBlock = {
      id: Date.now(),
      color: selectedColor.color,
      name: selectedColor.name,
      position: placedBlocks.length
    };

    setPlacedBlocks([...placedBlocks, newBlock]);
    setScore(score + 1);

    if (voiceEnabled) {
      speak(`${selectedColor.name} block placed! You have ${score + 1} blocks`);
    }

    // Celebration for milestones
    if ((score + 1) % 5 === 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      if (voiceEnabled) {
        speak(`Awesome! You built ${score + 1} blocks! Keep going!`);
      }
    }
  };

  const clearBlocks = () => {
    if (placedBlocks.length > 0) {
      if (voiceEnabled) {
        speak(`Clearing all blocks. You built ${placedBlocks.length} blocks!`);
      }
      setPlacedBlocks([]);
      setScore(0);
    }
  };

  const removeLastBlock = () => {
    if (placedBlocks.length > 0) {
      const removed = placedBlocks[placedBlocks.length - 1];
      setPlacedBlocks(placedBlocks.slice(0, -1));
      setScore(Math.max(0, score - 1));
      if (voiceEnabled) {
        speak(`${removed.name} block removed`);
      }
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speak('Voice assistant turned on!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 24
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: '24px 32px',
          marginBottom: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '12px 20px',
              fontSize: 24,
              backgroundColor: '#FF6B6B',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            title="Go Back"
          >
            ← Back
          </button>

          <h1 style={{
            fontSize: 42,
            margin: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            🧱 Block Building Game
          </h1>

          <button
            onClick={toggleVoice}
            style={{
              padding: '12px 20px',
              fontSize: 24,
              backgroundColor: voiceEnabled ? '#4CAF50' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            title={voiceEnabled ? 'Voice On' : 'Voice Off'}
          >
            {voiceEnabled ? '🔊' : '🔇'}
          </button>
        </div>

        {/* Score */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: '20px 32px',
          marginBottom: 24,
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: 0, fontSize: 32, color: '#667eea' }}>
            🏆 Blocks Built: {score}
          </h2>
          {showCelebration && (
            <div style={{ fontSize: 48, animation: 'bounce 0.5s ease' }}>
              🎉 Amazing! 🎉
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
          {/* Block Selector */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ marginTop: 0, color: '#667eea', fontSize: 24 }}>
              Choose a Block Color
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {blockColors.map((block) => (
                <button
                  key={block.name}
                  onClick={() => selectBlock(block)}
                  style={{
                    padding: '20px',
                    fontSize: 22,
                    backgroundColor: block.color,
                    color: 'white',
                    border: selectedColor?.name === block.name ? '4px solid #FFD93D' : 'none',
                    borderRadius: 12,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    transform: selectedColor?.name === block.name ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    fontWeight: 'bold'
                  }}
                  aria-label={`Select ${block.name} block`}
                >
                  {block.emoji} {block.name}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={removeLastBlock}
                disabled={placedBlocks.length === 0}
                style={{
                  padding: '16px',
                  fontSize: 18,
                  backgroundColor: placedBlocks.length === 0 ? '#ccc' : '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  cursor: placedBlocks.length === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  fontWeight: 'bold'
                }}
              >
                ↩️ Remove Last Block
              </button>
              <button
                onClick={clearBlocks}
                disabled={placedBlocks.length === 0}
                style={{
                  padding: '16px',
                  fontSize: 18,
                  backgroundColor: placedBlocks.length === 0 ? '#ccc' : '#F44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  cursor: placedBlocks.length === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  fontWeight: 'bold'
                }}
              >
                🗑️ Clear All
              </button>
            </div>
          </div>

          {/* Building Area */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            minHeight: 500,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <h3 style={{ marginTop: 0, color: '#667eea', fontSize: 24, textAlign: 'center' }}>
              Building Area - Click to Add Block
            </h3>

            <div
              onClick={placeBlock}
              style={{
                flex: 1,
                border: '4px dashed #667eea',
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 16,
                cursor: selectedColor ? 'pointer' : 'not-allowed',
                background: selectedColor ? 'rgba(102, 126, 234, 0.05)' : '#f5f5f5',
                position: 'relative',
                overflow: 'auto'
              }}
              aria-label="Click to place block"
            >
              {placedBlocks.length === 0 ? (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: 24
                }}>
                  {selectedColor ? (
                    <div>
                      <div style={{ fontSize: 64 }}>👆</div>
                      Click here to place a {selectedColor.name} block!
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 64 }}>👈</div>
                      Choose a color first!
                    </div>
                  )}
                </div>
              ) : (
                placedBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    style={{
                      width: '80%',
                      height: 60,
                      backgroundColor: block.color,
                      borderRadius: 8,
                      margin: '4px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      animation: 'slideIn 0.3s ease',
                      border: '2px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    {block.name} Block #{index + 1}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
