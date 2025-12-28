import React, { useState } from "react";
import { phonicsWords } from "../data/phonics";
import { Howl } from "howler";

export default function Phonics() {
  const [index, setIndex] = useState(0);
  const current = phonicsWords[index];

  const playWord = () => {
    new Howl({
      src: [`/audio/words/${current.audio}`],
      volume: 1.0,
    }).play();
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
