const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Function to create rounded image
const createRoundedImage = async (inputPath, outputPath, size = 300) => {
  try {
    const roundedCorners = Buffer.from(
      `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${size/2}" ry="${size/2}"/></svg>`
    );

    await sharp(inputPath)
      .resize(size, size)
      .composite([{
        input: roundedCorners,
        blend: 'dest-in'
      }])
      .png()
      .toFile(outputPath);

    return true;
  } catch (error) {
    console.error('Error creating rounded image:', error);
    return false;
  }
};

// Function to create multiple sizes
const createImageSizes = async (inputPath, filename) => {
  const sizes = {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200
  };

  const results = {};
  const baseDir = path.join(__dirname, 'public/uploads/portfolio');
  
  for (const [sizeName, sizeValue] of Object.entries(sizes)) {
    const outputPath = path.join(baseDir, `${sizeName}_${filename}`);
    
    try {
      await sharp(inputPath)
        .resize(sizeValue, sizeValue, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toFile(outputPath);
        
      results[sizeName] = `/uploads/portfolio/${sizeName}_${filename}`;
    } catch (error) {
      console.error(`Error creating ${sizeName} size:`, error);
    }
  }
  
  return results;
};

module.exports = {
  createRoundedImage,
  createImageSizes
};