import React from 'react';
import { Link } from 'react-router-dom';
import { getProgress, ACHIEVEMENTS } from '../utils/achievements';

export default function Leaderboard() {
  const progress = getProgress();

  const stats = [
    { label: 'Total Activities', value: progress.totalActivities, emoji: '📚' },
    { label: 'Math Problems Solved', value: progress.mathProblems, emoji: '➕' },
    { label: 'Words Spelled', value: progress.wordsSpelled, emoji: '✏️' },
    { label: 'Letters Learned', value: progress.lettersLearned.length, emoji: '🔤' },
    { label: 'Numbers Mastered', value: progress.numbersLearned.length, emoji: '🔢' },
    { label: 'Current Streak', value: `${progress.streak} days`, emoji: '🔥' }
  ];

  const unlockedAchievements = progress.achievements.map(id => 
    Object.values(ACHIEVEMENTS).find(a => a.id === id)
  ).filter(Boolean);

  const lockedAchievements = Object.values(ACHIEVEMENTS).filter(a => 
    !progress.achievements.includes(a.id)
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '48px',
            margin: '0 0 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            🏆 Your Progress Dashboard
          </h1>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                textAlign: 'center',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>
                {stat.emoji}
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 'bold',
                color: '#667eea',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '16px', color: '#666' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Unlocked Achievements */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{
            fontSize: '32px',
            color: '#667eea',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            🎖️ Unlocked Achievements ({unlockedAchievements.length})
          </h2>
          
          {unlockedAchievements.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
              Keep learning to unlock achievements! 🌟
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {unlockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  style={{
                    background: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)',
                    borderRadius: '16px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '3px solid white',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    animation: 'bounce 2s infinite'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                    {achievement.emoji}
                  </div>
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '4px'
                  }}>
                    {achievement.name}
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Locked Achievements */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{
            fontSize: '32px',
            color: '#999',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            🔒 Locked Achievements ({lockedAchievements.length})
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {lockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  background: '#f0f0f0',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  border: '3px dashed #ccc',
                  opacity: 0.6
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '8px', filter: 'grayscale(100%)' }}>
                  {achievement.emoji}
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#666',
                  marginBottom: '4px'
                }}>
                  ???
                </div>
                <div style={{ fontSize: '14px', color: '#999' }}>
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
