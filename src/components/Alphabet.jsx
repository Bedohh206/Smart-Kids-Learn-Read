import React from "react";
import { alphabet } from "../data/alphabet";
import { Howl } from "howler";

export default function Alphabet() {
  const playSound = (audio) => {
    new Howl({
      src: [`/audio/letters/${audio}`],
      volume: 1.0,
    }).play();
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
          <small>{item.example}</small>
        </button>
      ))}
    </div>
  );
}
