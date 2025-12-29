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
