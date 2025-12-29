import gTTS from 'google-tts-api';
import fs from 'fs';
import path from 'path';

async function generateAudio(text, filepath) {
  try {
    const url = gTTS.getAudioUrl(text, { lang: 'en', slow: false });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buf));
    console.log('✓', path.basename(filepath));
    await new Promise(resolve => setTimeout(resolve, 100));
  } catch (e) {
    console.error('✗', text, ':', e.message);
  }
}

async function main() {
  const { phonicsWords } = await import('../src/data/phonics.js');
  const wordsDir = 'public/audio/words';
  fs.mkdirSync(wordsDir, { recursive: true });
  
  console.log(`\n=== Generating ${phonicsWords.length} word audio files ===\n`);
  
  let count = 0;
  for (let word of phonicsWords) {
    await generateAudio(word.word, `${wordsDir}/${word.audio}`);
    count++;
    if (count % 10 === 0) {
      console.log(`Progress: ${count}/${phonicsWords.length}`);
    }
  }
  
  console.log(`\n✅ All ${phonicsWords.length} word audio files generated!`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
