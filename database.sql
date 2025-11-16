-- Drop database if exists and create new
DROP DATABASE IF EXISTS feporto_db;
CREATE DATABASE feporto_db;
USE feporto_db;

-- ===== COMPLETE DATABASE SCHEMA =====
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

-- Insert contact data
INSERT INTO contacts (platform, url, username, icon, color, description, type, followers) VALUES
('GitHub', 'https://github.com/hasanfardous', 'hasanfardous', '/icons/github.svg', '#333333', 'Source code repositories and open source contributions', 'Social', 1250),
('LinkedIn', 'https://linkedin.com/in/hasanfardous', 'hasanfardous', '/icons/linkedin.svg', '#0077B5', 'Professional network and career updates', 'Professional', 500),
('YouTube', 'https://youtube.com/@hasanfardous', '@hasanfardous', '/icons/youtube.svg', '#FF0000', 'Programming tutorials and tech reviews', 'Social', 2500),
('Twitter', 'https://twitter.com/hasanfardous', '@hasanfardous', '/icons/twitter.svg', '#1DA1F2', 'Tech insights and industry updates', 'Social', 800),
('Instagram', 'https://instagram.com/hasanfardous', 'hasanfardous', '/icons/instagram.svg', '#E4405F', 'Behind the scenes and personal updates', 'Social', 1200),
('Email', 'mailto:hasan@example.com', 'hasan@example.com', '/icons/email.svg', '#EA4335', 'Direct professional communication', 'Contact', 0),
('WhatsApp', 'https://wa.me/6281234567890', '+62 812-3456-7890', '/icons/whatsapp.svg', '#25D366', 'Quick messaging and voice calls', 'Contact', 0),
('Telegram', 'https://t.me/hasanfardous', '@hasanfardous', '/icons/telegram.svg', '#0088CC', 'Secure messaging platform', 'Contact', 0),
('Personal Website', 'https://hasanfardous.com', 'hasanfardous.com', '/icons/website.svg', '#6366F1', 'Complete portfolio and blog', 'Portfolio', 0),
('Dribbble', 'https://dribbble.com/hasanfardous', 'hasanfardous', '/icons/dribbble.svg', '#EA4C89', 'Design portfolio and inspiration', 'Portfolio', 150),
('Behance', 'https://behance.net/hasanfardous', 'hasanfardous', '/icons/behance.svg', '#1769FF', 'Creative portfolio showcase', 'Portfolio', 300);

-- Insert portfolio data
INSERT INTO portfolios (title, caption, description, image, technologies, category, featured, status) VALUES
('E-Commerce Website', 'Modern online shopping platform with React & Node.js', 'A full-stack e-commerce solution featuring user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. Built with modern technologies and responsive design principles.', '/images/portfolio/ecommerce-thumb.jpg', '["React", "Node.js", "MongoDB", "Stripe"]', 'Web Development', TRUE, 'Published'),
('Mobile Banking App', 'Secure banking application with biometric authentication', 'Mobile banking application with advanced security features including biometric authentication, transaction history, and real-time notifications.', '/images/portfolio/banking-thumb.jpg', '["React Native", "Firebase", "Redux"]', 'Mobile Development', TRUE, 'Published'),
('AI Chatbot Dashboard', 'Intelligent customer service bot with analytics', 'AI-powered chatbot with natural language processing, sentiment analysis, and comprehensive analytics dashboard for customer service optimization.', '/images/portfolio/chatbot-thumb.jpg', '["Python", "TensorFlow", "FastAPI", "PostgreSQL"]', 'AI/ML', FALSE, 'Draft'),
('Real Estate Platform', 'Property listing and management system', 'Comprehensive real estate platform with property listings, virtual tours, mortgage calculator, and agent management system.', '/images/portfolio/realestate-thumb.jpg', '["Vue.js", "Laravel", "MySQL", "Google Maps API"]', 'Web Development', TRUE, 'Published');

-- Insert experience data
INSERT INTO experiences (company, position, duration, start_date, location, type, description, technologies, current) VALUES
('Tech Innovators Inc.', 'Senior Full Stack Developer', 'Jan 2023 - Present', '2023-01-15', 'Jakarta, Indonesia', 'Full-time', 'Lead development of enterprise web applications using React, Node.js, and cloud technologies. Mentor junior developers and collaborate with cross-functional teams to deliver high-quality software solutions.', '["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"]', TRUE),
('Digital Solutions Ltd.', 'Frontend Developer', 'Jun 2021 - Dec 2022', '2021-06-01', 'Bandung, Indonesia', 'Full-time', 'Developed responsive web applications and mobile apps using modern JavaScript frameworks. Worked closely with UX/UI designers to implement pixel-perfect designs.', '["React", "Vue.js", "React Native", "JavaScript", "SASS", "Jest"]', FALSE),
('StartupXYZ', 'Junior Web Developer', 'Aug 2020 - May 2021', '2020-08-01', 'Surabaya, Indonesia', 'Full-time', 'Started career as junior developer, learning modern web technologies and contributing to various client projects. Gained experience in full-stack development.', '["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap"]', FALSE);

-- Insert skills data
INSERT INTO skills (name, category, level, timeline, start_year, description, projects) VALUES
('React', 'Frontend Framework', 95, '4+ years', 2020, 'Expert in building complex SPAs, hooks, context API, and performance optimization', 25),
('Node.js', 'Backend Runtime', 92, '4+ years', 2020, 'Express.js, RESTful APIs, microservices, and server-side optimization', 30),
('TypeScript', 'Programming Language', 90, '3+ years', 2021, 'Strong typing, interfaces, generics, and advanced TypeScript patterns', 20),
('Vue.js', 'Frontend Framework', 85, '2+ years', 2022, 'Composition API, Vuex/Pinia state management, and Vue ecosystem', 12),
('MongoDB', 'NoSQL Database', 85, '3+ years', 2021, 'Document modeling, aggregation pipelines, and performance optimization', 18),
('PostgreSQL', 'SQL Database', 82, '2+ years', 2022, 'Complex queries, indexing, stored procedures, and database design', 12),
('Docker', 'Containerization', 80, '2+ years', 2022, 'Container orchestration, multi-stage builds, and deployment automation', 15),
('AWS', 'Cloud Platform', 75, '2+ years', 2022, 'EC2, S3, Lambda, RDS, and serverless architecture implementation', 10);

-- Insert technologies data
INSERT INTO technologies (name, category, description, usage) VALUES
('VS Code', 'Code Editor', 'Primary development environment with extensive extensions', 'Daily'),
('Tailwind CSS', 'CSS Framework', 'Utility-first CSS framework for rapid UI development', 'Daily'),
('Figma', 'Design Tool', 'UI/UX design collaboration and prototyping', 'Weekly'),
('Postman', 'API Testing', 'API development, testing, and documentation', 'Daily'),
('Material-UI', 'UI Library', 'React components implementing Google Material Design', 'Weekly'),
('Jest', 'Testing Framework', 'JavaScript testing framework with snapshot testing', 'Weekly'),
('Git', 'Version Control', 'Distributed version control system for tracking changes', 'Daily'),
('GitHub', 'Code Hosting', 'Git repository hosting and collaboration platform', 'Daily'),
('Vercel', 'Hosting Platform', 'Frontend deployment platform with automatic deployments', 'Weekly'),
('Netlify', 'Hosting Platform', 'Static site hosting with continuous deployment', 'Monthly');