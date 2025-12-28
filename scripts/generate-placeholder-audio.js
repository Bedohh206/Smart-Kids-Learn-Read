import fs from "fs";
import path from "path";

function writeSilentWav(filePath, seconds = 1, sampleRate = 22050) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const numSamples = seconds * sampleRate;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;

  const dataSize = numSamples * numChannels * (bitsPerSample / 8);
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // subchunk1Size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // silence (buffer already zeroed)

  fs.writeFileSync(filePath, buffer);
}

async function loadData(modulePath) {
  const full = path.resolve(modulePath);
  const url = `file://${full}`;
  const mod = await import(url);
  return mod;
}

async function main() {
  const publicDir = path.resolve(process.cwd(), "public", "audio");
  const lettersDir = path.join(publicDir, "letters");
  const wordsDir = path.join(publicDir, "words");
  const numbersDir = path.join(publicDir, "numbers");
  const shapesDir = path.join(publicDir, "shapes");

  [lettersDir, wordsDir, numbersDir, shapesDir].forEach((d) => fs.mkdirSync(d, { recursive: true }));

  // load data
  const { alphabet } = await loadData("./src/data/alphabet.js");
  const { phonicsWords } = await loadData("./src/data/phonics.js");
  const { numbers } = await loadData("./src/data/numbers.js");
  const { shapes } = await loadData("./src/data/shapes.js");

  // letters
  alphabet.forEach((item) => {
    const out = path.join(lettersDir, item.audio);
    if (!fs.existsSync(out)) writeSilentWav(out, 1);
  });

  // words (phonics)
  phonicsWords.forEach((w) => {
    const out = path.join(wordsDir, w.audio);
    if (!fs.existsSync(out)) writeSilentWav(out, 1);
  });

  // numbers
  numbers.forEach((n) => {
    const out = path.join(numbersDir, n.audio);
    if (!fs.existsSync(out)) writeSilentWav(out, 1);
  });

  // shapes
  if (shapes && Array.isArray(shapes)) {
    shapes.forEach((s) => {
      const out = path.join(shapesDir, s.audio);
      if (!fs.existsSync(out)) writeSilentWav(out, 1);
    });
  }

  console.log("Placeholder audio files generated under public/audio/");
}

main().catch((e) => { console.error(e); process.exit(1); });
