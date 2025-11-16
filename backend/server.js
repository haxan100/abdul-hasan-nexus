const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Admin: http://localhost:5173/admin-hasan`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});