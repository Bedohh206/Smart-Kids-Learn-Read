import React from "react";
import { numbers } from "../data/numbers";
import { Howl } from "howler";
import { unlockAudio } from "../utils/audioUnlock";

export default function Numbers() {
  const play = async (audio) => {
    if (!audio) return;
    try {
      await unlockAudio();
      console.log('Playing number audio:', audio);
      const sound = new Howl({ 
        src: [`/audio/numbers/${audio}`], 
        html5: true,
        volume: 1.0,
        onload: () => console.log('Loaded:', audio),
        onplay: () => console.log('Playing:', audio),
        onloaderror: (id, error) => {
          console.error('Error loading audio:', error);
          const audioEl = new Audio(`/audio/numbers/${audio}`);
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
      const audioEl = new Audio(`/audio/numbers/${audio}`);
      audioEl.play().catch(err => console.error('Fallback failed:', err));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Numbers</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
        {numbers.map((n) => (
          <button key={n.number} onClick={() => play(n.audio)} style={{ padding: 16, fontSize: 20 }} aria-label={`Play number ${n.number}`}>
            {n.number}
          </button>
        ))}
      </div>
    </div>
  );
}
