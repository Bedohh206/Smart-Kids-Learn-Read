import React, { useState, useEffect } from "react";
import { phonicsWords } from "../data/phonics";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";

function makeChoices(correct, pool) {
  const others = pool.filter((p) => p.word !== correct.word).slice(0, 3).map((p) => p.word);
  const choices = shuffle([correct.word, ...others]);
  return choices;
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const current = phonicsWords[index];
  const choices = makeChoices(current, phonicsWords);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    try { const s = parseFloat(localStorage.getItem("quiz-score")); if (!Number.isNaN(s)) setScore(s); } catch (e) {}
  }, []);

  useEffect(() => { try { localStorage.setItem("quiz-score", String(score)); } catch (e) {} }, [score]);

  const play = async () => {
    try {
      await unlockAudio();
      console.log('Playing quiz word:', current.audio);
      const sound = new Howl({ 
        src: [`/audio/words/${current.audio}`],
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', current.audio),
        onplay: () => console.log('Playing:', current.audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/words/${current.audio}`);
          audioEl.play().catch(e => console.error('Fallback failed:', e));
        },
        onplayerror: (id, error) => {
          console.error('Error playing audio:', error);
          sound.once('unlock', () => {
            sound.play();
          });
        }
      });
      sound.play();
    } catch (e) {
      console.error('Exception:', e);
      const audioEl = new Audio(`/audio/words/${current.audio}`);
      audioEl.play().catch(err => console.error('Fallback failed:', err));
    }
  };

  const pick = (c) => {
    if (c === current.word) {
      setMessage("Correct!");
      setScore((s) => s + 1);
    } else {
      setMessage("Try again");
      setScore((s) => Math.max(0, s - 1));
    }
    setTimeout(() => { setMessage(""); setIndex((i) => (i + 1) % phonicsWords.length); }, 1000);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Educational intro for AdSense compliance */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 20,
        color: "white"
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 8px" }}>🎯 Word Quiz</h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, opacity: 0.95 }}>
          What You'll Learn: Listen to the word sound and choose the correct spelling.
          This quiz helps kids practice phonics, word recognition, and listening skills —
          key building blocks for early reading success.
        </p>
      </div>
      <h2>Quiz</h2>
      <button onClick={play}>🔊 Play</button>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        {choices.map((c) => (
          <button key={c} onClick={() => pick(c)}>{c}</button>
        ))}
      </div>
      {message && <p>{message}</p>}
      <div style={{ marginTop: 8 }}><strong>Score: {score}</strong></div>
    </div>
  );
}
