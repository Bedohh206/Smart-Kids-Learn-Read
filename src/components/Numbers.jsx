import React from "react";
import { numbers } from "../data/numbers";
import { Howl } from "howler";

export default function Numbers() {
  const play = (audio) => {
    if (!audio) return;
    new Howl({ src: [`/audio/numbers/${audio}`], volume: 1.0 }).play();
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
