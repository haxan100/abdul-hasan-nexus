# Database Setup Guide

## 🗄️ Database Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# Database Configuration
VITE_DB_HOST=localhost
VITE_DB_PORT=3306
VITE_DB_NAME=feporto_db
VITE_DB_USER=root
VITE_DB_PASSWORD=your_password

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
```

### MySQL Database Schema

```sql
-- Create database
CREATE DATABASE feporto_db;
USE feporto_db;

-- Portfolio table
CREATE TABLE portfolios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    caption TEXT,
    description TEXT,
    image VARCHAR(255),
    images JSON,
    technologies JSON,
    features JSON,
    live_url VARCHAR(255),
    github_url VARCHAR(255),
    category VARCHAR(100),
    duration VARCHAR(100),
    client VARCHAR(255),
    status ENUM('Draft', 'Published') DEFAULT 'Draft',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Work Experience table
CREATE TABLE experiences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    duration VARCHAR(100),
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    type ENUM('Full-time', 'Part-time', 'Contract', 'Freelance') DEFAULT 'Full-time',
    description TEXT,
    responsibilities JSON,
    technologies JSON,
    achievements JSON,
    current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Technical Skills table
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    level INT DEFAULT 0,
    timeline VARCHAR(100),
    start_year INT,
    description TEXT,
    projects INT DEFAULT 0,
    certifications JSON,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Technologies table
CREATE TABLE technologies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    usage ENUM('Daily', 'Weekly', 'Monthly', 'Rarely') DEFAULT 'Monthly',
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact Links table
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    icon VARCHAR(255),
    color VARCHAR(7),
    description TEXT,
    type ENUM('Social', 'Professional', 'Contact', 'Portfolio') DEFAULT 'Social',
    followers INT DEFAULT 0,
    additional_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Sample Data

```sql
-- Insert sample portfolios
INSERT INTO portfolios (title, caption, description, image, technologies, category, featured, status) VALUES
('E-Commerce Website', 'Modern online shopping platform with React & Node.js', 'A full-stack e-commerce solution featuring user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard.', '/images/portfolio/ecommerce-thumb.jpg', '["React", "Node.js", "MongoDB", "Stripe"]', 'Web Development', TRUE, 'Published'),
('Mobile Banking App', 'Secure banking application with biometric authentication', 'Mobile banking application with advanced security features including biometric authentication, transaction history, and real-time notifications.', '/images/portfolio/banking-thumb.jpg', '["React Native", "Firebase", "Redux"]', 'Mobile Development', TRUE, 'Published');

-- Insert sample experiences
INSERT INTO experiences (company, position, duration, start_date, location, type, description, technologies, current) VALUES
('Tech Innovators Inc.', 'Senior Full Stack Developer', 'Jan 2023 - Present', '2023-01-15', 'Jakarta, Indonesia', 'Full-time', 'Lead development of enterprise web applications using React, Node.js, and cloud technologies.', '["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"]', TRUE),
('Digital Solutions Ltd.', 'Frontend Developer', 'Jun 2021 - Dec 2022', '2021-06-01', 'Bandung, Indonesia', 'Full-time', 'Developed responsive web applications and mobile apps using modern JavaScript frameworks.', '["React", "Vue.js", "React Native", "JavaScript", "SASS", "Jest"]', FALSE);

-- Insert sample skills
INSERT INTO skills (name, category, level, timeline, start_year, description, projects) VALUES
('React', 'Frontend Framework', 95, '4+ years', 2020, 'Expert in building complex SPAs, hooks, context API, and performance optimization', 25),
('Node.js', 'Backend Runtime', 92, '4+ years', 2020, 'Express.js, RESTful APIs, microservices, and server-side optimization', 30),
('TypeScript', 'Programming Language', 90, '3+ years', 2021, 'Strong typing, interfaces, generics, and advanced TypeScript patterns', 20);

-- Insert sample technologies
INSERT INTO technologies (name, category, description, usage) VALUES
('VS Code', 'Code Editor', 'Primary development environment with extensive extensions', 'Daily'),
('Tailwind CSS', 'CSS Framework', 'Utility-first CSS framework for rapid UI development', 'Daily'),
('Docker', 'Containerization', 'Container orchestration, multi-stage builds, and deployment automation', 'Weekly');

-- Insert sample contacts
INSERT INTO contacts (platform, url, username, type, description) VALUES
('GitHub', 'https://github.com/yourusername', 'yourusername', 'Social', 'Source code repositories and open source contributions'),
('LinkedIn', 'https://linkedin.com/in/yourprofile', 'yourprofile', 'Professional', 'Professional network and career updates'),
('Email', 'mailto:your.email@example.com', 'your.email@example.com', 'Contact', 'Direct professional communication');
```

## 🔧 Database Service Usage

### Import and Use
```typescript
import { db } from '@/lib/database';

// Get all portfolios
const portfolios = await db.getPortfolios();

// Get specific portfolio
const portfolio = await db.getPortfolioById('1');

// Get experiences
const experiences = await db.getExperiences();
```

### Configuration Access
```typescript
import { config } from '@/config';

// Database config
console.log(config.database.host);
console.log(config.database.name);

// API config
console.log(config.api.baseUrl);
console.log(config.api.endpoints.portfolio);

// Admin config
console.log(config.admin.credentials.username);
```

## 🚀 Next Steps

1. **Install MySQL** or use existing MAMP/XAMPP
2. **Create database** using the schema above
3. **Configure environment** variables in `.env`
4. **Update database service** to use real MySQL connection
5. **Install mysql2** package: `npm install mysql2`
6. **Test connection** in admin dashboard

## 📦 Required Dependencies

```bash
npm install mysql2 dotenv
```

## 🔒 Security Notes

- Use environment variables for sensitive data
- Implement proper SQL injection protection
- Use connection pooling for production
- Add database migration system
- Implement proper error handling