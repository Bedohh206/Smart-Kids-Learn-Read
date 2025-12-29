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
    console.log('✓', path.basename(filepath), '-', text);
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
  } catch (e) {
    console.error('✗', text, ':', e.message);
  }
}

async function main() {
  const baseDir = 'public/audio';
  
  // Letters A-Z
  console.log('\n=== Generating Letters ===');
  fs.mkdirSync(`${baseDir}/letters`, { recursive: true });
  for (let c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')) {
    await generateAudio(c, `${baseDir}/letters/${c.toLowerCase()}.mp3`);
  }
  
  // Numbers 1-10
  console.log('\n=== Generating Numbers ===');
  fs.mkdirSync(`${baseDir}/numbers`, { recursive: true });
  for (let i = 1; i <= 10; i++) {
    await generateAudio(String(i), `${baseDir}/numbers/${i}.mp3`);
  }
  
  // Words
  console.log('\n=== Generating Words ===');
  fs.mkdirSync(`${baseDir}/words`, { recursive: true });
  const words = ['cat', 'dog', 'sun'];
  for (let word of words) {
    await generateAudio(word, `${baseDir}/words/${word}.mp3`);
  }
  
  // Shapes
  console.log('\n=== Generating Shapes ===');
  fs.mkdirSync(`${baseDir}/shapes`, { recursive: true });
  const shapes = ['circle', 'square', 'triangle', 'rectangle', 'star', 'oval'];
  for (let shape of shapes) {
    await generateAudio(shape, `${baseDir}/shapes/${shape}.mp3`);
  }
  
  console.log('\n✅ All audio files generated!');
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
