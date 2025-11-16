// Mock database service for frontend
export class DatabaseService {
  constructor() {}

  async connect() {
    console.log('Using mock database service');
    return true;
  }

  // Portfolio queries
  async getPortfolios() {
    // Mock data for now
    return {
      success: true,
      data: [
        {
          id: "1",
          title: "E-Commerce Website",
          caption: "Modern online shopping platform with React & Node.js",
          image: "/images/portfolio/ecommerce-thumb.jpg",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          category: "Web Development",
          featured: true,
          createdAt: "2024-01-15"
        }
      ]
    };
  }

  async getPortfolioById(id: string) {
    // Mock data for now
    return {
      success: true,
      data: {
        id,
        title: "E-Commerce Website",
        caption: "Modern online shopping platform",
        description: "Full-stack e-commerce solution...",
        images: ["/images/portfolio/ecommerce-1.jpg"],
        technologies: ["React", "Node.js"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/user/repo"
      }
    };
  }

  // Experience queries
  async getExperiences() {
    return {
      success: true,
      data: [
        {
          id: "1",
          company: "Tech Innovators Inc.",
          position: "Senior Full Stack Developer",
          duration: "Jan 2023 - Present",
          description: "Lead development of enterprise applications",
          technologies: ["React", "Node.js", "AWS"]
        }
      ]
    };
  }

  // Skills queries
  async getSkills() {
    return {
      success: true,
      data: {
        frontend: [
          {
            id: "1",
            name: "React",
            category: "Frontend Framework",
            level: 95,
            timeline: "4+ years",
            description: "Expert in React development"
          }
        ]
      }
    };
  }

  // Technologies queries
  async getTechnologies() {
    return {
      success: true,
      data: {
        tools: [
          {
            id: "1",
            name: "VS Code",
            category: "Code Editor",
            description: "Primary development environment",
            usage: "Daily"
          }
        ]
      }
    };
  }

  // Contact queries - Mock data for now
  async getContacts() {
    return {
      success: true,
      data: {
        social_media: [
          { id: 1, platform: "GitHub", url: "https://github.com/hasanfardous", username: "hasanfardous", type: "Social", description: "Source code repositories", followers: 1250 },
          { id: 4, platform: "Twitter", url: "https://twitter.com/hasanfardous", username: "@hasanfardous", type: "Social", description: "Tech insights", followers: 800 },
          { id: 5, platform: "Instagram", url: "https://instagram.com/hasanfardous", username: "hasanfardous", type: "Social", description: "Personal updates", followers: 1200 }
        ],
        professional: [
          { id: 2, platform: "LinkedIn", url: "https://linkedin.com/in/hasanfardous", username: "hasanfardous", type: "Professional", description: "Professional network", followers: 500 },
          { id: 6, platform: "Email", url: "mailto:hasan@example.com", username: "hasan@example.com", type: "Professional", description: "Direct communication", followers: 0 }
        ],
        portfolio: [
          { id: 9, platform: "Personal Website", url: "https://hasanfardous.com", username: "hasanfardous.com", type: "Portfolio", description: "Complete portfolio", followers: 0 },
          { id: 10, platform: "Dribbble", url: "https://dribbble.com/hasanfardous", username: "hasanfardous", type: "Portfolio", description: "Design portfolio", followers: 150 }
        ]
      },
      totalLinks: 7,
      message: 'Contact links retrieved successfully'
    };
  }

  async addContact(contactData: any) {
    console.log('Adding contact:', contactData);
    return { success: true, data: { id: Date.now() } };
  }

  async updateContact(id: number, contactData: any) {
    console.log('Updating contact:', id, contactData);
    return { success: true, data: { id } };
  }

  async deleteContact(id: number) {
    console.log('Deleting contact:', id);
    return { success: true, data: { id } };
  }
}

// Export singleton instance
export const db = new DatabaseService();