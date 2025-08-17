// Extract all image paths from map.js
const fs = require('fs');
const path = require('path');

// Read map.js content
const mapJsContent = fs.readFileSync('map.js', 'utf8');

// Extract all image paths
const regex = /image: '([^']+)'/g;
let match;
const imagePaths = [];

while ((match = regex.exec(mapJsContent)) !== null) {
  imagePaths.push(match[1]);
}

// Create placeholder images
const placeholderSvgTemplate = (artName) => `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#f5f5dc"/>
  <rect x="20" y="20" width="360" height="260" fill="#d9c7a8" stroke="#8b7355" stroke-width="2"/>
  
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#8b4513">
    ${artName}
  </text>
  
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#8b4513">
    Traditional Art of India
  </text>
  
  <rect x="100" y="170" width="200" height="80" rx="5" fill="#e5d9c9" stroke="#8b7355" stroke-width="2"/>
  
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#8b4513">
    Coming Soon
  </text>
</svg>`;

// Ensure directories exist
imagePaths.forEach(imagePath => {
  const dir = path.dirname(imagePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Skip if file already exists
  if (fs.existsSync(imagePath)) {
    console.log(`Skipping existing file: ${imagePath}`);
    return;
  }
  
  // Extract art name from path
  const fileName = path.basename(imagePath, path.extname(imagePath));
  const artName = fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Create placeholder file
  fs.writeFileSync(imagePath, placeholderSvgTemplate(artName));
  console.log(`Created placeholder for: ${imagePath}`);
});

console.log('Placeholder generation complete!'); 