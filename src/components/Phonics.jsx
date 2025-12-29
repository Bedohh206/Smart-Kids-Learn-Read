import React, { useState } from "react";
import { phonicsWords } from "../data/phonics";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";

export default function Phonics() {
  const [index, setIndex] = useState(0);
  const current = phonicsWords[index];

  const playWord = async () => {
    try {
      await unlockAudio();
      console.log('Playing word:', current.audio);
      const sound = new Howl({
        src: [`/audio/words/${current.audio}`],
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', current.audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/words/${current.audio}`);
          audioEl.play().catch(e => console.error('Fallback failed:', e));
        },
        onplay: () => console.log('Audio is playing:', current.audio),
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

  return (
    <div className="phonics">
      <h2>Sound it out</h2>

      <div className="letters">
        {current.letters.map((l, i) => (
          <span key={i} className="letter" aria-hidden="false">{l}</span>
        ))}
      </div>

      <button className="play" onClick={playWord}>
        🔊 Hear the word
      </button>

      <button
        className="next"
        onClick={() => setIndex((i) => (i + 1) % phonicsWords.length)}
        aria-label="Next phonics word"
      >
        Next
      </button>
    </div>
  );
}
