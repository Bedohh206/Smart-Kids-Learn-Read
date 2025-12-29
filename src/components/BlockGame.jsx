import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { speak } from '../utils/voiceInteraction';
import { useKeyboardNavigation } from '../utils/useKeyboardNavigation';
import { announcePageContent } from '../utils/accessibility';

// Shape templates for challenges
const shapeTemplates = {
  house: {
    name: 'House',
    emoji: '🏠',
    grid: [
      [null, 'red', null],
      ['red', 'red', 'red'],
      ['yellow', 'brown', 'yellow'],
      ['yellow', 'brown', 'yellow']
    ]
  },
  boat: {
    name: 'Boat',
    emoji: '⛵',
    grid: [
      [null, 'white', null],
      [null, 'white', null],
      ['blue', 'blue', 'blue'],
      ['brown', 'brown', 'brown']
    ]
  },
  tree: {
    name: 'Tree',
    emoji: '🌲',
    grid: [
      [null, 'green', null],
      ['green', 'green', 'green'],
      [null, 'brown', null],
      [null, 'brown', null]
    ]
  },
  car: {
    name: 'Car',
    emoji: '🚗',
    grid: [
      [null, 'blue', 'blue', null],
      ['blue', 'blue', 'blue', 'blue'],
      ['black', null, null, 'black']
    ]
  },
  robot: {
    name: 'Robot',
    emoji: '🤖',
    grid: [
      [null, 'gray', null],
      ['gray', 'gray', 'gray'],
      [null, 'gray', null],
      ['gray', null, 'gray']
    ]
  }
};

export default function BlockGame() {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(Array(10).fill(null).map(() => Array(10).fill(null)));
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mode, setMode] = useState('free'); // 'free' or 'challenge'
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challengeComplete, setChallengeComplete] = useState(false);

  useKeyboardNavigation('Block Game');

  // Available block colors
  const blockColors = [
    { name: 'Red', color: '#FF6B6B', emoji: '🔴', key: 'red' },
    { name: 'Blue', color: '#4ECDC4', emoji: '🔵', key: 'blue' },
    { name: 'Green', color: '#96CEB4', emoji: '🟢', key: 'green' },
    { name: 'Yellow', color: '#FFEAA7', emoji: '🟡', key: 'yellow' },
    { name: 'Purple', color: '#A8A4FF', emoji: '🟣', key: 'purple' },
    { name: 'Orange', color: '#FF9A76', emoji: '🟠', key: 'orange' },
    { name: 'Brown', color: '#8B6F47', emoji: '🟤', key: 'brown' },
    { name: 'White', color: '#F5F5F5', emoji: '⚪', key: 'white' },
    { name: 'Black', color: '#2C3E50', emoji: '⚫', key: 'black' },
    { name: 'Gray', color: '#95A5A6', emoji: '⚫', key: 'gray' }
  ];

  const getColorObject = (key) => {
    return blockColors.find(c => c.key === key) || blockColors[0];
  };

  useEffect(() => {
    setTimeout(() => {
      announcePageContent(
        'Block Building Game',
        'Choose Free Build to create anything, or try a Challenge to build specific shapes!'
      );
      if (voiceEnabled) {
        speak('Welcome to the Block Game! Choose Free Build or try a Challenge!');
      }
    }, 500);
  }, []);

  const selectBlock = (block) => {
    setSelectedColor(block);
    if (voiceEnabled) {
      speak(`${block.name} block selected`);
    }
  };

  const placeBlock = (rowIndex, colIndex) => {
    if (!selectedColor) {
      if (voiceEnabled) {
        speak('Please choose a block color first!');
      }
      return;
    }

    if (grid[rowIndex][colIndex]) {
      if (voiceEnabled) {
        speak('Space already occupied! Choose another spot.');
      }
      return;
    }

    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? selectedColor.key : cell
      )
    );

    setGrid(newGrid);
    setScore(score + 1);

    if (voiceEnabled) {
      speak(`${selectedColor.name} block placed!`);
    }

    // Check if challenge is complete
    if (mode === 'challenge' && currentChallenge && !challengeComplete) {
      checkChallenge(newGrid);
    }

    // Celebration for milestones
    if ((score + 1) % 10 === 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      if (voiceEnabled) {
        speak(`Awesome! You placed ${score + 1} blocks! Keep going!`);
      }
    }
  };

  const removeBlock = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex]) {
      const newGrid = grid.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? null : cell
        )
      );
      setGrid(newGrid);
      setScore(Math.max(0, score - 1));
      if (voiceEnabled) {
        speak('Block removed');
      }
    }
  };

  const clearGrid = () => {
    if (score > 0) {
      if (voiceEnabled) {
        speak(`Clearing your creation. You built ${score} blocks!`);
      }
      setGrid(Array(10).fill(null).map(() => Array(10).fill(null)));
      setScore(0);
      setChallengeComplete(false);
    }
  };

  const startChallenge = (templateKey) => {
    const template = shapeTemplates[templateKey];
    setMode('challenge');
    setCurrentChallenge(template);
    setChallengeComplete(false);
    clearGrid();
    if (voiceEnabled) {
      speak(`Challenge: Build a ${template.name}! Look at the guide on the left.`);
    }
  };

  const checkChallenge = (currentGrid) => {
    if (!currentChallenge) return;

    const template = currentChallenge.grid;
    const templateHeight = template.length;
    const templateWidth = template[0].length;

    // Check if the pattern exists anywhere in the grid
    for (let startRow = 0; startRow <= 10 - templateHeight; startRow++) {
      for (let startCol = 0; startCol <= 10 - templateWidth; startCol++) {
        let matches = true;
        for (let r = 0; r < templateHeight; r++) {
          for (let c = 0; c < templateWidth; c++) {
            const templateCell = template[r][c];
            const gridCell = currentGrid[startRow + r][startCol + c];
            if (templateCell !== null && templateCell !== gridCell) {
              matches = false;
              break;
            }
          }
          if (!matches) break;
        }
        if (matches) {
          setChallengeComplete(true);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
          if (voiceEnabled) {
            speak(`Amazing! You built a ${currentChallenge.name}! Great job!`);
          }
          return;
        }
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
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 32, color: '#667eea' }}>
                🧱 Blocks: {score}
              </h2>
            </div>
            {mode === 'challenge' && currentChallenge && (
              <div>
                <h2 style={{ margin: 0, fontSize: 28, color: challengeComplete ? '#4CAF50' : '#FF9800' }}>
                  {challengeComplete ? '✅ Complete!' : `🎯 Build: ${currentChallenge.emoji} ${currentChallenge.name}`}
                </h2>
              </div>
            )}
          </div>
          {showCelebration && (
            <div style={{ fontSize: 48, animation: 'bounce 0.5s ease', marginTop: 10 }}>
              🎉 {challengeComplete ? 'You did it!' : 'Amazing!'} 🎉
            </div>
          )}
        </div>

        {/* Mode Selector */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: '16px 24px',
          marginBottom: 24,
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={() => {
              setMode('free');
              setCurrentChallenge(null);
              setChallengeComplete(false);
              if (voiceEnabled) speak('Free Build mode! Create anything you want!');
            }}
            style={{
              padding: '16px 32px',
              fontSize: 20,
              backgroundColor: mode === 'free' ? '#4CAF50' : '#E0E0E0',
              color: mode === 'free' ? 'white' : '#666',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: mode === 'free' ? '0 4px 12px rgba(76,175,80,0.4)' : 'none'
            }}
          >
            🎨 Free Build
          </button>
          <button
            onClick={() => {
              setMode('challenge');
              setCurrentChallenge(null);
              setChallengeComplete(false);
              if (voiceEnabled) speak('Challenge mode! Choose a shape to build.');
            }}
            style={{
              padding: '16px 32px',
              fontSize: 20,
              backgroundColor: mode === 'challenge' ? '#FF9800' : '#E0E0E0',
              color: mode === 'challenge' ? 'white' : '#666',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: mode === 'challenge' ? '0 4px 12px rgba(255,152,0,0.4)' : 'none'
            }}
          >
            🎯 Challenges
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mode === 'challenge' && currentChallenge ? '1fr 3fr' : '1fr 2fr', gap: 24 }}>
          {/* Left Panel - Color Selector or Challenge Guide */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}>
            {mode === 'challenge' && !currentChallenge ? (
              <>
                <h3 style={{ marginTop: 0, color: '#667eea', fontSize: 24 }}>
                  Choose a Challenge
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Object.keys(shapeTemplates).map((key) => {
                    const template = shapeTemplates[key];
                    return (
                      <button
                        key={key}
                        onClick={() => startChallenge(key)}
                        style={{
                          padding: '16px',
                          fontSize: 20,
                          backgroundColor: '#FF9800',
                          color: 'white',
                          border: 'none',
                          borderRadius: 12,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12
                        }}
                      >
                        <span style={{ fontSize: 32 }}>{template.emoji}</span>
                        <span>Build a {template.name}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : mode === 'challenge' && currentChallenge ? (
              <>
                <h3 style={{ marginTop: 0, color: '#FF9800', fontSize: 24 }}>
                  {currentChallenge.emoji} Build: {currentChallenge.name}
                </h3>
                <p style={{ color: '#666', marginBottom: 16 }}>Match this pattern:</p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${currentChallenge.grid[0].length}, 30px)`,
                  gap: 4,
                  justifyContent: 'center',
                  marginBottom: 24,
                  padding: 16,
                  background: '#f5f5f5',
                  borderRadius: 12
                }}>
                  {currentChallenge.grid.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: cell ? getColorObject(cell).color : '#e0e0e0',
                          borderRadius: 4,
                          border: cell ? '2px solid rgba(0,0,0,0.1)' : '2px dashed #ccc'
                        }}
                      />
                    ))
                  )}
                </div>
                <button
                  onClick={() => {
                    setMode('challenge');
                    setCurrentChallenge(null);
                    setChallengeComplete(false);
                    if (voiceEnabled) speak('Choose another challenge!');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: 16,
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginBottom: 12
                  }}
                >
                  Choose Another
                </button>
              </>
            ) : (
              <>
                <h3 style={{ marginTop: 0, color: '#667eea', fontSize: 24 }}>
                  Choose Block Colors
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto' }}>
                  {blockColors.map((block) => (
                    <button
                      key={block.name}
                      onClick={() => selectBlock(block)}
                      style={{
                        padding: '16px',
                        fontSize: 18,
                        backgroundColor: block.color,
                        color: block.key === 'white' || block.key === 'yellow' ? '#333' : 'white',
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
              </>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={clearGrid}
                disabled={score === 0}
                style={{
                  padding: '16px',
                  fontSize: 18,
                  backgroundColor: score === 0 ? '#ccc' : '#F44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  cursor: score === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  fontWeight: 'bold'
                }}
              >
                🗑️ Clear All
              </button>
            </div>
          </div>

          {/* Building Grid */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ marginTop: 0, color: '#667eea', fontSize: 24, textAlign: 'center' }}>
              {mode === 'free' ? '🎨 Create Your Design!' : '🎯 Build the Shape!'}
            </h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: 16 }}>
              {selectedColor ? `Click squares to place ${selectedColor.name} blocks. Right-click to remove.` : 'Choose a color first!'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: 4,
                padding: 16,
                background: '#f5f5f5',
                borderRadius: 16,
                border: '3px solid #667eea',
                maxWidth: 600,
                margin: '0 auto'
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => placeBlock(rowIndex, colIndex)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      removeBlock(rowIndex, colIndex);
                    }}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      backgroundColor: cell ? getColorObject(cell).color : 'white',
                      border: cell ? '2px solid rgba(0,0,0,0.2)' : '1px solid #ddd',
                      borderRadius: 4,
                      cursor: selectedColor ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease',
                      boxShadow: cell ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!cell && selectedColor) {
                        e.currentTarget.style.backgroundColor = selectedColor.color;
                        e.currentTarget.style.opacity = '0.5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!cell) {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.opacity = '1';
                      }
                    }}
                    title={cell ? `${getColorObject(cell).name} block - Right-click to remove` : selectedColor ? `Click to place ${selectedColor.name}` : 'Choose a color'}
                  />
                ))
              )}
            </div>

            {mode === 'free' && (
              <div style={{
                marginTop: 24,
                padding: 16,
                background: '#E3F2FD',
                borderRadius: 12,
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, fontSize: 18, color: '#1976D2', fontWeight: 'bold' }}>
                  💡 Tip: Build anything you imagine! Try making a house 🏠, robot 🤖, or your own creation!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
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
