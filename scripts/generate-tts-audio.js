import fs from "fs";
import path from "path";
import gTTS from "google-tts-api";

async function fetchTTS(text, outPath, lang = "en", speed = 1) {
  const url = gTTS.getAudioUrl(text, { lang, slow: false, host: "https://translate.google.com" });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TTS fetch failed: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(outPath, Buffer.from(arrayBuffer));
}

async function main() {
  const outBase = path.resolve(process.cwd(), "public", "audio");
  fs.mkdirSync(outBase, { recursive: true });

  // Load data files if present
  let alphabet = [];
  let phonicsWords = [];
  let numbers = [];
  let shapes = [];
  try { ({ alphabet } = await import(path.resolve("./src/data/alphabet.js"))); } catch {}
  try { ({ phonicsWords } = await import(path.resolve("./src/data/phonics.js"))); } catch {}
  try { ({ numbers } = await import(path.resolve("./src/data/numbers.js"))); } catch {}
  try { ({ shapes } = await import(path.resolve("./src/data/shapes.js"))); } catch {}

  // Letters (letter name) and example words from alphabet.js
  const lettersDir = path.join(outBase, "letters");
  fs.mkdirSync(lettersDir, { recursive: true });
  if (alphabet && Array.isArray(alphabet)) {
    for (const item of alphabet) {
      const letterFile = path.join(lettersDir, `${item.letter.toLowerCase()}.mp3`);
      if (!fs.existsSync(letterFile)) await fetchTTS(item.letter, letterFile);

      if (item.word) {
        const exampleFile = path.join(lettersDir, `${item.letter.toLowerCase()}-example.mp3`);
        if (!fs.existsSync(exampleFile)) await fetchTTS(item.word, exampleFile);
      }
    }
  }

  // Phonics words
  const wordsDir = path.join(outBase, "words");
  fs.mkdirSync(wordsDir, { recursive: true });
  if (phonicsWords && Array.isArray(phonicsWords)) {
    for (const w of phonicsWords) {
      const out = path.join(wordsDir, w.audio || `${w.word}.mp3`);
      if (!fs.existsSync(out)) await fetchTTS(w.word, out);
    }
  }

  // Numbers
  const numbersDir = path.join(outBase, "numbers");
  fs.mkdirSync(numbersDir, { recursive: true });
  if (numbers && Array.isArray(numbers)) {
    for (const n of numbers) {
      const text = n.word || String(n.number || n.value);
      const out = path.join(numbersDir, n.audio || `${text}.mp3`);
      if (!fs.existsSync(out)) await fetchTTS(text, out);
    }
  } else {
    // fallback: generate 1-10
    for (let i = 1; i <= 10; i++) {
      const out = path.join(numbersDir, `${i}.mp3`);
      if (!fs.existsSync(out)) await fetchTTS(String(i), out);
    }
  }

  // Shapes
  const shapesDir = path.join(outBase, "shapes");
  fs.mkdirSync(shapesDir, { recursive: true });
  if (shapes && Array.isArray(shapes)) {
    for (const s of shapes) {
      const out = path.join(shapesDir, s.audio || `${s.name}.mp3`);
      if (!fs.existsSync(out)) await fetchTTS(s.name, out);
    }
  }

  console.log("TTS generation complete for alphabet, phonics, numbers, and shapes.");
}

main().catch((e) => { console.error(e); process.exit(1); });
