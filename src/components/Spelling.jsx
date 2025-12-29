import React, { useState } from "react";
import { phonicsWords } from "../data/phonics";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";

export default function Spelling() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const current = phonicsWords[index];

  const play = async () => {
    try {
      await unlockAudio();
      console.log('Playing spelling word:', current.audio);
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

  const check = () => {
    if (guess.trim().toLowerCase() === current.word.toLowerCase()) {
      setMessage("Good job!");
    } else {
      setMessage("Try again");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Spelling</h2>

      <div>
        <button onClick={play}>🔊 Play word</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <label htmlFor="spelling-input" style={{ display: "none" }}>Type the word</label>
        <input id="spelling-input" aria-label="Type the word" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Type the word" />
        <button onClick={check} aria-label="Check spelling">Check</button>
        <button onClick={() => setIndex((i) => (i + 1) % phonicsWords.length)}>Next</button>
      </div>

      {message && <p role="status" aria-live="polite">{message}</p>}
    </div>
  );
}
