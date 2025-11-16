// Centralized Configuration
export const config = {
  // Database Configuration
  database: {
    host: process.env.VITE_DB_HOST || 'localhost',
    port: process.env.VITE_DB_PORT || 3306,
    name: process.env.VITE_DB_NAME || 'feporto_db',
    user: process.env.VITE_DB_USER || 'root',
    password: process.env.VITE_DB_PASSWORD || '',
    type: 'mysql' as const
  },

  // API Configuration
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    endpoints: {
      portfolio: '/portfolio',
      experience: '/experience',
      skills: '/skills',
      technologies: '/technologies',
      contact: '/contact',
      auth: '/auth'
    }
  },

  // Admin Configuration
  admin: {
    credentials: {
      username: 'hasan',
      password: 'hasan'
    },
    routes: {
      login: '/admin-hasan',
      dashboard: '/admin-hasan/dashboard'
    },
    sessionKey: 'adminAuth'
  },

  // App Configuration
  app: {
    name: 'FE Porto',
    version: '1.0.0',
    defaultTheme: 'dark' as const,
    itemsPerPage: 10
  },

  // Upload Configuration
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    uploadPath: '/uploads'
  }
};