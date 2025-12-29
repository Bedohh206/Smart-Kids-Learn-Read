import React from "react";
import { alphabet } from "../data/alphabet";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";

export default function Alphabet() {
  const playSound = async (audio) => {
    try {
      await unlockAudio();
      console.log('Attempting to play:', `/audio/letters/${audio}`);
      const sound = new Howl({
        src: [`/audio/letters/${audio}`],
        html5: true,
        volume: 1.0,
        onload: () => {
          console.log('Audio loaded successfully:', audio);
        },
        onloaderror: (id, error) => {
          console.error('Howler load error:', error, 'for file:', audio);
          // Fallback to native audio
          const audioEl = new Audio(`/audio/letters/${audio}`);
          audioEl.play().catch(e => console.error('Native audio also failed:', e));
        },
        onplay: () => {
          console.log('Audio playing:', audio);
        },
        onplayerror: (id, error) => {
          console.error('Howler play error:', error);
          sound.once('unlock', () => {
            sound.play();
          });
        }
      });
      sound.play();
    } catch (e) {
      console.error('Exception in playSound:', e);
      // Fallback to native HTML5 audio
      const audioEl = new Audio(`/audio/letters/${audio}`);
      audioEl.play().catch(err => console.error('Fallback audio failed:', err));
    }
  };

  return (
    <div className="grid">
      {alphabet.map((item) => (
        <button
          key={item.letter}
          className="card"
          onClick={() => playSound(item.audio)}
          aria-label={`Play sound for letter ${item.letter}`}
          title={`Play ${item.letter}`}
        >
          <h1>{item.letter}</h1>
          <p>{item.sound}</p>
          <small>{item.word}</small>
        </button>
      ))}
    </div>
  );
}
