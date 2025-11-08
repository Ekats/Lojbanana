// Simple icon generator using SVG to create placeholder PNGs
// This creates basic colored icons for the PWA

const fs = require('fs');

// Create a simple SVG that we'll save as the icon template
const createSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size/6}" fill="url(#bg)"/>
  <g transform="translate(${size/2}, ${size/2})">
    <path d="M ${-size/8.5} ${-size/6.4} L ${-size/8.5} ${size/6.4} L ${size/25.6} ${size/6.4} A ${size/6.4} ${size/6.4} 0 0 0 ${size/25.6} ${-size/6.4} Z" fill="#4ecdc4" stroke="#fff" stroke-width="${size/64}"/>
    <line x1="${-size/5.12}" y1="${-size/12.8}" x2="${-size/8.5}" y2="${-size/12.8}" stroke="#fff" stroke-width="${size/64}" stroke-linecap="round"/>
    <line x1="${-size/5.12}" y1="${size/12.8}" x2="${-size/8.5}" y2="${size/12.8}" stroke="#fff" stroke-width="${size/64}" stroke-linecap="round"/>
    <line x1="${size/7.3}" y1="0" x2="${size/4.65}" y2="0" stroke="#fff" stroke-width="${size/64}" stroke-linecap="round"/>
    <circle cx="${-size/5.12}" cy="${-size/12.8}" r="${size/85}" fill="#ffa502"/>
    <circle cx="${-size/5.12}" cy="${size/12.8}" r="${size/85}" fill="#ffa502"/>
    <circle cx="${size/4.65}" cy="0" r="${size/85}" fill="#ffa502"/>
  </g>
  <text x="${size/2}" y="${size*0.86}" font-family="monospace" font-size="${size/8.5}" font-weight="bold" fill="#fff" text-anchor="middle">lo</text>
</svg>`;

// Write SVG files
fs.writeFileSync('public/icon-192.svg', createSVG(192));
fs.writeFileSync('public/icon-512.svg', createSVG(512));

console.log('SVG icons created successfully!');
console.log('Note: For better PWA support, you may want to convert these to PNG.');
console.log('Open public/icon-gen.html in a browser and click "Download Icons" to generate PNGs.');
