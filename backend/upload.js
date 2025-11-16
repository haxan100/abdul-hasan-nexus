const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public/uploads/portfolio');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public/uploads/portfolio');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('File info:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      fieldname: file.fieldname
    });
    
    // Accept if mimetype starts with 'image/'
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }
    
    // Also accept common image extensions
    const allowedTypes = /\.(jpeg|jpg|png|gif|webp)$/i;
    if (allowedTypes.test(file.originalname)) {
      return cb(null, true);
    }
    
    cb(new Error('Only image files are allowed'));
  }
});

// Single image upload
router.post('/single', upload.single('image'), (req, res) => {
  try {
    console.log('🔥 BACKEND UPLOAD RECEIVED:', req.file ? req.file.filename : 'NO FILE');
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/portfolio/${req.file.filename}`;
    console.log('🔥 BACKEND SAVED FILE TO:', req.file.path);
    console.log('🔥 BACKEND RETURNING URL:', imageUrl);
    
    res.json({
      success: true,
      data: {
        url: imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Multiple images upload
router.post('/multiple', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      url: `/uploads/portfolio/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    }));

    res.json({
      success: true,
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

module.exports = router;