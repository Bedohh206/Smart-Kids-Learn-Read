import React, { useEffect, useState } from 'react';

export default function AchievementNotification({ achievement, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setVisible(true), 100);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)',
        padding: '24px 32px',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid white',
        zIndex: 10000,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(-100px) scale(0.8)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        maxWidth: '350px',
        cursor: 'pointer'
      }}
      onClick={() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>
          {achievement.emoji}
        </div>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'white',
          marginBottom: '8px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          🎉 New Achievement! 🎉
        </div>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: 'white',
          marginBottom: '4px'
        }}>
          {achievement.name}
        </div>
        <div style={{ 
          fontSize: '16px', 
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          {achievement.description}
        </div>
      </div>
    </div>
  );
}
