# Portfolio API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/portfolio` | Get all portfolio items |
| GET | `/portfolio/:id` | Get specific portfolio detail |
| GET | `/experience` | Get all work experiences |
| GET | `/skills` | Get all technical skills |
| GET | `/technologies` | Get additional technologies |
| GET | `/contact` | Get contact links |

---

## 1. Portfolio APIs

### GET `/api/portfolio`
**Description:** Mendapatkan semua portfolio items dengan foto, judul, dan caption

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "E-Commerce Website",
      "caption": "Modern online shopping platform with React & Node.js",
      "image": "/images/portfolio/ecommerce-thumb.jpg",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
      "category": "Web Development",
      "featured": true,
      "createdAt": "2024-01-15"
    },
    {
      "id": "2",
      "title": "Mobile Banking App",
      "caption": "Secure banking application with biometric authentication",
      "image": "/images/portfolio/banking-thumb.jpg",
      "technologies": ["React Native", "Firebase", "Redux"],
      "category": "Mobile Development",
      "featured": true,
      "createdAt": "2024-02-20"
    },
    {
      "id": "3",
      "title": "AI Chatbot Dashboard",
      "caption": "Intelligent customer service bot with analytics",
      "image": "/images/portfolio/chatbot-thumb.jpg",
      "technologies": ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
      "category": "AI/ML",
      "featured": false,
      "createdAt": "2024-03-10"
    },
    {
      "id": "4",
      "title": "Real Estate Platform",
      "caption": "Property listing and management system",
      "image": "/images/portfolio/realestate-thumb.jpg",
      "technologies": ["Vue.js", "Laravel", "MySQL", "Google Maps API"],
      "category": "Web Development",
      "featured": true,
      "createdAt": "2024-04-05"
    }
  ],
  "total": 4,
  "message": "Portfolio items retrieved successfully"
}
```

### GET `/api/portfolio/:id`
**Description:** Mendapatkan detail lengkap portfolio tertentu

**Parameters:**
- `id` (string): Portfolio ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "E-Commerce Website",
    "caption": "Modern online shopping platform with React & Node.js",
    "description": "A full-stack e-commerce solution featuring user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. Built with modern technologies and responsive design principles.",
    "images": [
      "/images/portfolio/ecommerce-1.jpg",
      "/images/portfolio/ecommerce-2.jpg",
      "/images/portfolio/ecommerce-3.jpg",
      "/images/portfolio/ecommerce-4.jpg"
    ],
    "technologies": [
      {
        "name": "React",
        "category": "Frontend",
        "version": "18.2.0"
      },
      {
        "name": "Node.js",
        "category": "Backend",
        "version": "18.17.0"
      },
      {
        "name": "MongoDB",
        "category": "Database",
        "version": "6.0"
      },
      {
        "name": "Stripe",
        "category": "Payment",
        "version": "12.0.0"
      }
    ],
    "features": [
      "User Authentication & Authorization",
      "Product Catalog with Search & Filter",
      "Shopping Cart & Wishlist",
      "Secure Payment Processing",
      "Order Tracking System",
      "Admin Dashboard",
      "Responsive Design",
      "Email Notifications"
    ],
    "liveUrl": "https://ecommerce-demo.vercel.app",
    "githubUrl": "https://github.com/username/ecommerce-website",
    "category": "Web Development",
    "duration": "3 months",
    "client": "Personal Project",
    "status": "Completed",
    "createdAt": "2024-01-15",
    "updatedAt": "2024-01-30"
  },
  "message": "Portfolio detail retrieved successfully"
}
```

---

## 2. Work Experience API

### GET `/api/experience`
**Description:** Mendapatkan semua pengalaman kerja

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "company": "Tech Innovators Inc.",
      "position": "Senior Full Stack Developer",
      "duration": "Jan 2023 - Present",
      "startDate": "2023-01-15",
      "endDate": null,
      "location": "Jakarta, Indonesia",
      "type": "Full-time",
      "description": "Lead development of enterprise web applications using React, Node.js, and cloud technologies. Mentor junior developers and collaborate with cross-functional teams to deliver high-quality software solutions.",
      "responsibilities": [
        "Develop and maintain scalable web applications",
        "Lead technical architecture decisions",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with product managers and designers",
        "Implement CI/CD pipelines and DevOps practices"
      ],
      "technologies": ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
      "achievements": [
        "Improved application performance by 40%",
        "Led migration to microservices architecture",
        "Reduced deployment time from 2 hours to 15 minutes"
      ]
    },
    {
      "id": "2",
      "company": "Digital Solutions Ltd.",
      "position": "Frontend Developer",
      "duration": "Jun 2021 - Dec 2022",
      "startDate": "2021-06-01",
      "endDate": "2022-12-31",
      "location": "Bandung, Indonesia",
      "type": "Full-time",
      "description": "Developed responsive web applications and mobile apps using modern JavaScript frameworks. Worked closely with UX/UI designers to implement pixel-perfect designs.",
      "responsibilities": [
        "Build responsive web applications using React and Vue.js",
        "Develop mobile applications with React Native",
        "Collaborate with design team for UI/UX implementation",
        "Optimize applications for performance and SEO",
        "Write unit and integration tests"
      ],
      "technologies": ["React", "Vue.js", "React Native", "JavaScript", "SASS", "Jest"],
      "achievements": [
        "Delivered 15+ successful projects",
        "Improved mobile app performance by 35%",
        "Implemented automated testing reducing bugs by 50%"
      ]
    },
    {
      "id": "3",
      "company": "StartupXYZ",
      "position": "Junior Web Developer",
      "duration": "Aug 2020 - May 2021",
      "startDate": "2020-08-01",
      "endDate": "2021-05-31",
      "location": "Surabaya, Indonesia",
      "type": "Full-time",
      "description": "Started career as junior developer, learning modern web technologies and contributing to various client projects. Gained experience in full-stack development.",
      "responsibilities": [
        "Assist in developing web applications",
        "Fix bugs and implement new features",
        "Learn and apply new technologies",
        "Participate in code reviews and team meetings",
        "Support senior developers in project delivery"
      ],
      "technologies": ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap"],
      "achievements": [
        "Successfully completed 10+ client projects",
        "Learned 5 new technologies in first 6 months",
        "Received 'Fast Learner' recognition award"
      ]
    }
  ],
  "total": 3,
  "message": "Work experiences retrieved successfully"
}
```

---

## 3. Technical Skills API

### GET `/api/skills`
**Description:** Mendapatkan semua technical skills dengan timeline dan deskripsi

**Response:**
```json
{
  "success": true,
  "data": {
    "frontend": [
      {
        "id": "1",
        "name": "React",
        "category": "Frontend Framework",
        "level": 95,
        "timeline": "4+ years",
        "startYear": 2020,
        "description": "Expert in building complex SPAs, hooks, context API, and performance optimization",
        "projects": 25,
        "certifications": ["React Developer Certification"],
        "icon": "/icons/react.svg"
      },
      {
        "id": "2",
        "name": "TypeScript",
        "category": "Programming Language",
        "level": 90,
        "timeline": "3+ years",
        "startYear": 2021,
        "description": "Strong typing, interfaces, generics, and advanced TypeScript patterns",
        "projects": 20,
        "certifications": [],
        "icon": "/icons/typescript.svg"
      },
      {
        "id": "3",
        "name": "Vue.js",
        "category": "Frontend Framework",
        "level": 85,
        "timeline": "2+ years",
        "startYear": 2022,
        "description": "Composition API, Vuex/Pinia state management, and Vue ecosystem",
        "projects": 12,
        "certifications": [],
        "icon": "/icons/vue.svg"
      },
      {
        "id": "4",
        "name": "Next.js",
        "category": "React Framework",
        "level": 88,
        "timeline": "2+ years",
        "startYear": 2022,
        "description": "SSR, SSG, API routes, and performance optimization with Next.js",
        "projects": 15,
        "certifications": [],
        "icon": "/icons/nextjs.svg"
      }
    ],
    "backend": [
      {
        "id": "5",
        "name": "Node.js",
        "category": "Backend Runtime",
        "level": 92,
        "timeline": "4+ years",
        "startYear": 2020,
        "description": "Express.js, RESTful APIs, microservices, and server-side optimization",
        "projects": 30,
        "certifications": ["Node.js Application Developer"],
        "icon": "/icons/nodejs.svg"
      },
      {
        "id": "6",
        "name": "Python",
        "category": "Programming Language",
        "level": 80,
        "timeline": "2+ years",
        "startYear": 2022,
        "description": "Django, FastAPI, data analysis, and machine learning integration",
        "projects": 8,
        "certifications": [],
        "icon": "/icons/python.svg"
      },
      {
        "id": "7",
        "name": "PHP",
        "category": "Programming Language",
        "level": 75,
        "timeline": "3+ years",
        "startYear": 2021,
        "description": "Laravel framework, MVC architecture, and legacy system maintenance",
        "projects": 10,
        "certifications": [],
        "icon": "/icons/php.svg"
      }
    ],
    "database": [
      {
        "id": "8",
        "name": "MongoDB",
        "category": "NoSQL Database",
        "level": 85,
        "timeline": "3+ years",
        "startYear": 2021,
        "description": "Document modeling, aggregation pipelines, and performance optimization",
        "projects": 18,
        "certifications": [],
        "icon": "/icons/mongodb.svg"
      },
      {
        "id": "9",
        "name": "PostgreSQL",
        "category": "SQL Database",
        "level": 82,
        "timeline": "2+ years",
        "startYear": 2022,
        "description": "Complex queries, indexing, stored procedures, and database design",
        "projects": 12,
        "certifications": [],
        "icon": "/icons/postgresql.svg"
      },
      {
        "id": "10",
        "name": "Redis",
        "category": "Cache Database",
        "level": 70,
        "timeline": "1+ years",
        "startYear": 2023,
        "description": "Caching strategies, session management, and performance optimization",
        "projects": 8,
        "certifications": [],
        "icon": "/icons/redis.svg"
      }
    ],
    "devops": [
      {
        "id": "11",
        "name": "Docker",
        "category": "Containerization",
        "level": 80,
        "timeline": "2+ years",
        "startYear": 2022,
        "description": "Container orchestration, multi-stage builds, and deployment automation",
        "projects": 15,
        "certifications": [],
        "icon": "/icons/docker.svg"
      },
      {
        "id": "12",
        "name": "AWS",
        "category": "Cloud Platform",
        "level": 75,
        "timeline": "2+ years",
        "startYear": 2022,
        "description": "EC2, S3, Lambda, RDS, and serverless architecture implementation",
        "projects": 10,
        "certifications": ["AWS Cloud Practitioner"],
        "icon": "/icons/aws.svg"
      }
    ]
  },
  "totalSkills": 12,
  "averageLevel": 83,
  "message": "Technical skills retrieved successfully"
}
```

---

## 4. Additional Technologies API

### GET `/api/technologies`
**Description:** Mendapatkan teknologi tambahan yang pernah digunakan

**Response:**
```json
{
  "success": true,
  "data": {
    "tools": [
      {
        "id": "1",
        "name": "VS Code",
        "category": "Code Editor",
        "description": "Primary development environment with extensive extensions",
        "usage": "Daily",
        "icon": "/icons/vscode.svg"
      },
      {
        "id": "2",
        "name": "Figma",
        "category": "Design Tool",
        "description": "UI/UX design collaboration and prototyping",
        "usage": "Weekly",
        "icon": "/icons/figma.svg"
      },
      {
        "id": "3",
        "name": "Postman",
        "category": "API Testing",
        "description": "API development, testing, and documentation",
        "usage": "Daily",
        "icon": "/icons/postman.svg"
      }
    ],
    "libraries": [
      {
        "id": "4",
        "name": "Tailwind CSS",
        "category": "CSS Framework",
        "description": "Utility-first CSS framework for rapid UI development",
        "usage": "Daily",
        "icon": "/icons/tailwind.svg"
      },
      {
        "id": "5",
        "name": "Material-UI",
        "category": "UI Library",
        "description": "React components implementing Google's Material Design",
        "usage": "Weekly",
        "icon": "/icons/mui.svg"
      },
      {
        "id": "6",
        "name": "Framer Motion",
        "category": "Animation Library",
        "description": "Production-ready motion library for React applications",
        "usage": "Monthly",
        "icon": "/icons/framer.svg"
      }
    ],
    "testing": [
      {
        "id": "7",
        "name": "Jest",
        "category": "Testing Framework",
        "description": "JavaScript testing framework with snapshot testing",
        "usage": "Weekly",
        "icon": "/icons/jest.svg"
      },
      {
        "id": "8",
        "name": "Cypress",
        "category": "E2E Testing",
        "description": "End-to-end testing framework for web applications",
        "usage": "Monthly",
        "icon": "/icons/cypress.svg"
      }
    ],
    "version_control": [
      {
        "id": "9",
        "name": "Git",
        "category": "Version Control",
        "description": "Distributed version control system for tracking changes",
        "usage": "Daily",
        "icon": "/icons/git.svg"
      },
      {
        "id": "10",
        "name": "GitHub",
        "category": "Code Hosting",
        "description": "Git repository hosting and collaboration platform",
        "usage": "Daily",
        "icon": "/icons/github.svg"
      }
    ],
    "deployment": [
      {
        "id": "11",
        "name": "Vercel",
        "category": "Hosting Platform",
        "description": "Frontend deployment platform with automatic deployments",
        "usage": "Weekly",
        "icon": "/icons/vercel.svg"
      },
      {
        "id": "12",
        "name": "Netlify",
        "category": "Hosting Platform",
        "description": "Static site hosting with continuous deployment",
        "usage": "Monthly",
        "icon": "/icons/netlify.svg"
      },
      {
        "id": "13",
        "name": "Heroku",
        "category": "Cloud Platform",
        "description": "Platform-as-a-service for deploying applications",
        "usage": "Monthly",
        "icon": "/icons/heroku.svg"
      }
    ]
  },
  "totalTechnologies": 13,
  "message": "Additional technologies retrieved successfully"
}
```

---

## 5. Contact Links API

### GET `/api/contact`
**Description:** Mendapatkan semua link kontak dan social media

**Response:**
```json
{
  "success": true,
  "data": {
    "social_media": [
      {
        "id": "1",
        "platform": "GitHub",
        "url": "https://github.com/yourusername",
        "username": "yourusername",
        "icon": "/icons/github.svg",
        "color": "#333",
        "description": "Source code repositories and open source contributions",
        "followers": 1250,
        "public_repos": 45
      },
      {
        "id": "2",
        "platform": "LinkedIn",
        "url": "https://linkedin.com/in/yourprofile",
        "username": "yourprofile",
        "icon": "/icons/linkedin.svg",
        "color": "#0077B5",
        "description": "Professional network and career updates",
        "connections": 500
      },
      {
        "id": "3",
        "platform": "YouTube",
        "url": "https://youtube.com/@yourchannel",
        "username": "@yourchannel",
        "icon": "/icons/youtube.svg",
        "color": "#FF0000",
        "description": "Programming tutorials and tech reviews",
        "subscribers": 2500,
        "videos": 85
      },
      {
        "id": "4",
        "platform": "Twitter",
        "url": "https://twitter.com/yourusername",
        "username": "@yourusername",
        "icon": "/icons/twitter.svg",
        "color": "#1DA1F2",
        "description": "Tech insights and industry updates",
        "followers": 800
      },
      {
        "id": "5",
        "platform": "Instagram",
        "url": "https://instagram.com/yourusername",
        "username": "yourusername",
        "icon": "/icons/instagram.svg",
        "color": "#E4405F",
        "description": "Behind the scenes and personal updates",
        "followers": 1200
      }
    ],
    "professional": [
      {
        "id": "6",
        "platform": "Email",
        "url": "mailto:your.email@example.com",
        "username": "your.email@example.com",
        "icon": "/icons/email.svg",
        "color": "#EA4335",
        "description": "Direct professional communication",
        "type": "primary"
      },
      {
        "id": "7",
        "platform": "WhatsApp",
        "url": "https://wa.me/6281234567890",
        "username": "+62 812-3456-7890",
        "icon": "/icons/whatsapp.svg",
        "color": "#25D366",
        "description": "Quick messaging and voice calls",
        "type": "messaging"
      },
      {
        "id": "8",
        "platform": "Telegram",
        "url": "https://t.me/yourusername",
        "username": "@yourusername",
        "icon": "/icons/telegram.svg",
        "color": "#0088CC",
        "description": "Secure messaging platform",
        "type": "messaging"
      }
    ],
    "portfolio": [
      {
        "id": "9",
        "platform": "Personal Website",
        "url": "https://yourportfolio.com",
        "username": "yourportfolio.com",
        "icon": "/icons/website.svg",
        "color": "#6366F1",
        "description": "Complete portfolio and blog",
        "type": "website"
      },
      {
        "id": "10",
        "platform": "Dribbble",
        "url": "https://dribbble.com/yourusername",
        "username": "yourusername",
        "icon": "/icons/dribbble.svg",
        "color": "#EA4C89",
        "description": "Design portfolio and inspiration",
        "shots": 25,
        "followers": 150
      },
      {
        "id": "11",
        "platform": "Behance",
        "url": "https://behance.net/yourusername",
        "username": "yourusername",
        "icon": "/icons/behance.svg",
        "color": "#1769FF",
        "description": "Creative portfolio showcase",
        "projects": 18,
        "followers": 300
      }
    ]
  },
  "totalLinks": 11,
  "message": "Contact links retrieved successfully"
}
```

---

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Internal server error occurred"
  }
}
```

---

## Query Parameters

### Portfolio Filtering
```
GET /api/portfolio?category=Web Development&featured=true&limit=6
```

### Skills Filtering
```
GET /api/skills?category=frontend&level=80&sort=level
```

### Technologies Filtering
```
GET /api/technologies?category=tools&usage=daily
```

---

## Response Headers
```
Content-Type: application/json
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=3600
```

---

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## Authentication
Currently, all endpoints are public and don't require authentication.

---

## Changelog

### v1.0.0 (2024-12-19)
- Initial API release
- All endpoints implemented
- Complete documentation