// Audio context unlock utility
import { Howler } from 'howler';

let unlocked = false;

export function unlockAudio() {
  if (unlocked) return Promise.resolve();
  
  return new Promise((resolve) => {
    const unlock = () => {
      // Create a silent audio buffer to unlock the audio context
      const sound = new Howl({
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
        volume: 0,
        onload: () => {
          sound.play();
          unlocked = true;
          Howler.ctx.resume().then(() => {
            console.log('Audio context unlocked');
            resolve();
          });
        }
      });
    };

    // Try to unlock on any user interaction
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      document.addEventListener('click', unlock, { once: true });
      document.addEventListener('touchstart', unlock, { once: true });
      document.addEventListener('keydown', unlock, { once: true });
    } else {
      unlocked = true;
      resolve();
    }
  });
}

export function isAudioUnlocked() {
  return unlocked || (Howler.ctx && Howler.ctx.state === 'running');
}
