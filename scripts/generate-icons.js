// Simple icon generator for PWA
// This creates colored square icons with emoji/text

import fs from 'fs';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const emoji = '📚';
const backgroundColor = '#667eea';
const textColor = '#ffffff';

// If canvas is not available, create simple SVG icons instead
function createSVGIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size * 0.15}"/>
  <text x="50%" y="50%" font-size="${size * 0.5}" text-anchor="middle" dominant-baseline="central" fill="${textColor}">
    ${emoji}
  </text>
  <text x="50%" y="75%" font-size="${size * 0.1}" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif" font-weight="bold">
    Smart Kids
  </text>
</svg>`;
}

// Create icons as SVG
sizes.forEach(size => {
  const svg = createSVGIcon(size);
  fs.writeFileSync(`./public/icon-${size}x${size}.svg`, svg);
  console.log(`Created icon-${size}x${size}.svg`);
});

console.log('\n✅ App icons created successfully!');
console.log('Note: For production, convert SVG to PNG using an online converter or image processing tool.');
