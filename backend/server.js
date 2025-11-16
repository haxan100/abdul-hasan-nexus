const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import upload routes
const uploadRoutes = require('./upload');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Upload routes
app.use('/api/upload', uploadRoutes);

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'feporto_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.log('Check if MySQL is running and credentials are correct');
  });

// Middleware to pass pool to routes
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Contact endpoints
app.get('/api/contact', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY id');
    const contacts = rows;
    
    const groupedContacts = {
      social_media: contacts.filter(c => c.type === 'Social'),
      professional: contacts.filter(c => c.type === 'Professional'),
      portfolio: contacts.filter(c => c.type === 'Portfolio')
    };
    
    res.json({
      success: true,
      data: groupedContacts,
      totalLinks: contacts.length,
      message: 'Contact links retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts'
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { platform, url, username, icon, color, description, type, followers } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO contacts (platform, url, username, icon, color, description, type, followers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [platform, url, username, icon || '', color || '#000000', description, type, followers || 0]
    );
    res.json({ success: true, data: { id: result.insertId } });
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ success: false, error: 'Failed to add contact' });
  }
});

app.put('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, url, username, icon, color, description, type, followers } = req.body;
    const [result] = await pool.execute(
      'UPDATE contacts SET platform = ?, url = ?, username = ?, icon = ?, color = ?, description = ?, type = ?, followers = ? WHERE id = ?',
      [platform, url, username, icon || '', color || '#000000', description, type, followers || 0, id]
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ success: false, error: 'Failed to update contact' });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM contacts WHERE id = ?', [id]);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ success: false, error: 'Failed to delete contact' });
  }
});

// Skills endpoints
app.get('/api/skills', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM skills ORDER BY level DESC');
    const skills = rows;
    
    const groupedSkills = {
      frontend: skills.filter(s => s.category.includes('Frontend') || s.category.includes('Framework')),
      backend: skills.filter(s => s.category.includes('Backend') || s.category.includes('Runtime') || s.category.includes('Language')),
      database: skills.filter(s => s.category.includes('Database')),
      devops: skills.filter(s => s.category.includes('Cloud') || s.category.includes('Container'))
    };
    
    res.json({
      success: true,
      data: groupedSkills,
      totalSkills: skills.length,
      averageLevel: Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length),
      message: 'Technical skills retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch skills' });
  }
});

// Technical Skills for frontend display
app.get('/api/technical-skills', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT name FROM skills ORDER BY level DESC LIMIT 4');
    const skills = rows.map(row => row.name);
    
    res.json({
      success: true,
      data: skills,
      message: 'Technical skills retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching technical skills:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch technical skills' });
  }
});



app.post('/api/skills', async (req, res) => {
  try {
    const { name, category, level, timeline, start_year, description, projects, certifications, icon } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO skills (name, category, level, timeline, start_year, description, projects, certifications, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, level || 0, timeline, start_year, description, projects || 0, JSON.stringify(certifications || []), icon || '']
    );
    res.json({ success: true, data: { id: result.insertId } });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ success: false, error: 'Failed to add skill' });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, level, timeline, start_year, description, projects, certifications, icon } = req.body;
    const [result] = await pool.execute(
      'UPDATE skills SET name = ?, category = ?, level = ?, timeline = ?, start_year = ?, description = ?, projects = ?, certifications = ?, icon = ? WHERE id = ?',
      [name, category, level || 0, timeline, start_year, description, projects || 0, JSON.stringify(certifications || []), icon || '', id]
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ success: false, error: 'Failed to update skill' });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM skills WHERE id = ?', [id]);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ success: false, error: 'Failed to delete skill' });
  }
});

// Technologies endpoints
app.get('/api/technologies', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM technologies ORDER BY usage_level DESC, name');
    const technologies = rows;
    
    const groupedTechnologies = {
      tools: technologies.filter(t => t.category.includes('Editor') || t.category.includes('Tool')),
      libraries: technologies.filter(t => t.category.includes('Framework') || t.category.includes('Library')),
      testing: technologies.filter(t => t.category.includes('Testing')),
      version_control: technologies.filter(t => t.category.includes('Version') || t.category.includes('Code Hosting')),
      deployment: technologies.filter(t => t.category.includes('Hosting') || t.category.includes('Platform'))
    };
    
    res.json({
      success: true,
      data: groupedTechnologies,
      totalTechnologies: technologies.length,
      message: 'Additional technologies retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching technologies:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch technologies' });
  }
});

app.post('/api/technologies', async (req, res) => {
  try {
    const { name, category, description, usage, icon } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO technologies (name, category, description, usage_level, icon) VALUES (?, ?, ?, ?, ?)',
      [name, category, description, usage || 'Monthly', icon || '']
    );
    res.json({ success: true, data: { id: result.insertId } });
  } catch (error) {
    console.error('Error adding technology:', error);
    res.status(500).json({ success: false, error: 'Failed to add technology' });
  }
});

app.put('/api/technologies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, usage, icon } = req.body;
    const [result] = await pool.execute(
      'UPDATE technologies SET name = ?, category = ?, description = ?, usage_level = ?, icon = ? WHERE id = ?',
      [name, category, description, usage || 'Monthly', icon || '', id]
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating technology:', error);
    res.status(500).json({ success: false, error: 'Failed to update technology' });
  }
});

app.delete('/api/technologies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM technologies WHERE id = ?', [id]);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting technology:', error);
    res.status(500).json({ success: false, error: 'Failed to delete technology' });
  }
});

// Experience endpoints
app.get('/api/experience', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM experiences ORDER BY start_date DESC');
    res.json({
      success: true,
      data: rows,
      total: rows.length,
      message: 'Work experiences retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch experiences' });
  }
});

app.post('/api/experience', async (req, res) => {
  try {
    const { company, position, duration, start_date, end_date, location, type, description, responsibilities, technologies, achievements, current } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO experiences (company, position, duration, start_date, end_date, location, type, description, responsibilities, technologies, achievements, current) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [company, position, duration, start_date, end_date, location, type || 'Full-time', description, JSON.stringify(responsibilities || []), JSON.stringify(technologies || []), JSON.stringify(achievements || []), current || false]
    );
    res.json({ success: true, data: { id: result.insertId } });
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ success: false, error: 'Failed to add experience' });
  }
});

app.put('/api/experience/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { company, position, duration, start_date, end_date, location, type, description, responsibilities, technologies, achievements, current } = req.body;
    const [result] = await pool.execute(
      'UPDATE experiences SET company = ?, position = ?, duration = ?, start_date = ?, end_date = ?, location = ?, type = ?, description = ?, responsibilities = ?, technologies = ?, achievements = ?, current = ? WHERE id = ?',
      [company, position, duration, start_date, end_date, location, type || 'Full-time', description, JSON.stringify(responsibilities || []), JSON.stringify(technologies || []), JSON.stringify(achievements || []), current || false, id]
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ success: false, error: 'Failed to update experience' });
  }
});

app.delete('/api/experience/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM experiences WHERE id = ?', [id]);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ success: false, error: 'Failed to delete experience' });
  }
});

// Portfolio endpoints
app.get('/api/portfolio', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM portfolios ORDER BY priority ASC, created_at DESC');
    res.json({
      success: true,
      data: rows,
      total: rows.length,
      message: 'Portfolio items retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch portfolios' });
  }
});

app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [portfolioRows] = await pool.execute('SELECT * FROM portfolios WHERE id = ?', [id]);
    if (portfolioRows.length === 0) {
      return res.status(404).json({ success: false, error: 'Portfolio not found' });
    }
    
    // Get gallery images
    const [galleryRows] = await pool.execute(
      'SELECT image_url, image_caption FROM portfolio_gallery WHERE portfolio_id = ? ORDER BY sort_order',
      [id]
    );
    
    const portfolio = portfolioRows[0];
    portfolio.gallery_images = galleryRows.map(row => ({
      url: row.image_url,
      caption: row.image_caption || ''
    }));
    
    res.json({ success: true, data: portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio' });
  }
});

app.post('/api/portfolio', async (req, res) => {
  try {
    const { title, description, cover_image, cover_caption, background_image, background_caption, technologies, features, demo_url, status, gallery } = req.body;
    
    // Ensure status is valid
    const validStatus = (status === 'active' || status === 'inactive') ? status : 'active';
    
    const [result] = await pool.execute(
      'INSERT INTO portfolios (title, description, cover_image, cover_caption, background_image, background_caption, technologies, features, demo_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title || '', description || '', cover_image || '', cover_caption || '', background_image || '', background_caption || '', JSON.stringify(technologies || []), JSON.stringify(features || []), demo_url || '', validStatus]
    );
    
    const portfolioId = result.insertId;
    
    // Save gallery images
    if (gallery && Array.isArray(gallery)) {
      for (let i = 0; i < gallery.length; i++) {
        const image = gallery[i];
        await pool.execute(
          'INSERT INTO portfolio_gallery (portfolio_id, image_url, image_caption, sort_order) VALUES (?, ?, ?, ?)',
          [portfolioId, image.url, image.caption || '', i + 1]
        );
      }
    }
    
    res.json({ success: true, data: { id: portfolioId } });
  } catch (error) {
    console.error('Error adding portfolio:', error);
    res.status(500).json({ success: false, error: 'Failed to add portfolio' });
  }
});

app.put('/api/portfolio/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, cover_image, cover_caption, background_image, background_caption, technologies, features, demo_url, status, gallery } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE portfolios SET title = ?, description = ?, cover_image = ?, cover_caption = ?, background_image = ?, background_caption = ?, technologies = ?, features = ?, demo_url = ?, status = ? WHERE id = ?',
      [title || '', description || '', cover_image || '', cover_caption || '', background_image || '', background_caption || '', JSON.stringify(technologies || []), JSON.stringify(features || []), demo_url || '', status || 'active', id]
    );
    
    // Update gallery images
    if (gallery && Array.isArray(gallery)) {
      // Delete existing gallery images
      await pool.execute('DELETE FROM portfolio_gallery WHERE portfolio_id = ?', [id]);
      
      // Insert new gallery images
      for (let i = 0; i < gallery.length; i++) {
        const image = gallery[i];
        await pool.execute(
          'INSERT INTO portfolio_gallery (portfolio_id, image_url, image_caption, sort_order) VALUES (?, ?, ?, ?)',
          [id, image.url, image.caption || '', i + 1]
        );
      }
    }
    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ success: false, error: 'Failed to update portfolio' });
  }
});

app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM portfolios WHERE id = ?', [id]);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ success: false, error: 'Failed to delete portfolio' });
  }
});

// Contact Us / Hiring endpoints
app.post('/api/hire-me', async (req, res) => {
  try {
    const { name, email, company, position, message, budget, timeline, contact_method } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO hire_requests (name, email, company, position, message, budget, timeline, contact_method, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
      [name, email, company, position, message, budget, timeline, contact_method || 'email', 'new']
    );
    res.json({ 
      success: true, 
      data: { id: result.insertId },
      message: 'Your hiring request has been submitted successfully! I will get back to you soon.'
    });
  } catch (error) {
    console.error('Error submitting hire request:', error);
    res.status(500).json({ success: false, error: 'Failed to submit hire request' });
  }
});

app.get('/api/hire-requests', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM hire_requests ORDER BY created_at DESC');
    res.json({
      success: true,
      data: rows,
      total: rows.length,
      message: 'Hire requests retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching hire requests:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch hire requests' });
  }
});

app.put('/api/hire-requests/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const [result] = await pool.execute(
      'UPDATE hire_requests SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating hire request status:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

// Image processing API endpoint
app.get('/api/images/rounded/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const { size = 300 } = req.query;
    
    const imagePath = path.join(__dirname, 'public/uploads/portfolio', filename);
    
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }
    
    res.json({
      success: true,
      data: {
        original: `/uploads/portfolio/${filename}`,
        rounded: `/uploads/portfolio/rounded_${filename.replace(/\.[^/.]+$/, '.png')}`,
        sizes: {
          thumbnail: `/uploads/portfolio/thumbnail_${filename}`,
          small: `/uploads/portfolio/small_${filename}`,
          medium: `/uploads/portfolio/medium_${filename}`,
          large: `/uploads/portfolio/large_${filename}`
        }
      }
    });
  } catch (error) {
    console.error('Error getting image info:', error);
    res.status(500).json({ success: false, error: 'Failed to get image info' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Admin: http://localhost:5173/admin-hasan`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🖼️  Rounded images: http://localhost:${PORT}/api/upload/rounded`);
});