import React, { useEffect, useState } from 'react';

export default function Confetti({ duration = 3000 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate confetti particles
    const newParticles = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA15E', '#FF9FF3', '#54A0FF'];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 0.5,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5
      });
    }
    
    setParticles(newParticles);

    // Remove confetti after duration
    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (particles.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.left}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.backgroundColor,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animation: `confettiFall ${2 + Math.random() * 2}s linear forwards`,
            animationDelay: `${particle.animationDelay}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
      <style>
        {`
          @keyframes confettiFall {
            to {
              transform: translateY(100vh) rotate(${Math.random() * 720}deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}
