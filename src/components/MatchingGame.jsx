import React, { useState, useEffect } from "react";
import { shapes } from "../data/shapes";
import { Howl } from "howler";

function shuffle(arr) {
  return arr
    .map((v) => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.v);
}

export default function MatchingGame() {
  const pairs = shapes.map((s) => ({ id: s.name, label: s.name, audio: s.audio }));
  const cards = shuffle([...pairs, ...pairs]).map((c, idx) => ({ ...c, uid: idx }));

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    try {
      const s = parseFloat(localStorage.getItem("matching-score"));
      if (!Number.isNaN(s)) setScore(s);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("matching-score", String(score)); } catch (e) {}
  }, [score]);

  const play = (audio) => new Howl({ src: [`/audio/shapes/${audio}`] }).play();

  const onClick = (card) => {
    if (flipped.includes(card.uid) || matched.includes(card.uid)) return;
    const next = [...flipped, card.uid];
    setFlipped(next);
    play(card.audio);
    if (next.length === 2) {
      const [a, b] = next.map((id) => cards.find((c) => c.uid === id));
      if (a.id === b.id) {
        setMatched((m) => [...m, ...next]);
        setScore((s) => s + 1);
      } else {
        setScore((s) => Math.max(0, s - 0.5));
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Matching Game</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {cards.map((c) => (
          <button
            key={c.uid}
            onClick={() => onClick(c)}
            aria-label={`Card ${c.uid}`}
            className={`matching-card ${matched.includes(c.uid) ? "matched" : ""} ${flipped.includes(c.uid) ? "flipped" : ""}`}
          >
            <div className="matching-inner">{(matched.includes(c.uid) || flipped.includes(c.uid)) ? c.label : "?"}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 12 }}><strong>Score: {score}</strong></div>
    </div>
  );
}
