import React, { useState } from 'react';

export default function VoiceCommandTip() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: 12,
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      zIndex: 9998,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 14,
      maxWidth: '90%'
    }}>
      <span style={{ fontSize: 20 }}>💡</span>
      <span>
        <strong>Tip:</strong> Click the 🎙️ button and say "Go to [page name]" to navigate anywhere!
      </span>
      <button
        onClick={() => setIsVisible(false)}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          padding: '4px 12px',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 'bold'
        }}
        aria-label="Close tip"
      >
        ✕
      </button>
    </div>
  );
}
