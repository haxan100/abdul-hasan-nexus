import { config } from '@/config';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Portfolio endpoints
  async getPortfolios() {
    return this.request('/portfolio');
  }

  async getPortfolioById(id: number) {
    return this.request(`/portfolio/${id}`);
  }

  async addPortfolio(portfolioData: any) {
    return this.request('/portfolio', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    });
  }

  async updatePortfolio(id: number, portfolioData: any) {
    return this.request(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(portfolioData),
    });
  }

  async deletePortfolio(id: number) {
    return this.request(`/portfolio/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact endpoints
  async getContacts() {
    return this.request('/contact');
  }

  async addContact(contactData: any) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async updateContact(id: number, contactData: any) {
    return this.request(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async deleteContact(id: number) {
    return this.request(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  // Skills endpoints
  async getSkills() {
    return this.request('/skills');
  }

  async addSkill(skillData: any) {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
  }

  async updateSkill(id: number, skillData: any) {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skillData),
    });
  }

  async deleteSkill(id: number) {
    return this.request(`/skills/${id}`, {
      method: 'DELETE',
    });
  }

  // Technologies endpoints
  async getTechnologies() {
    return this.request('/technologies');
  }

  async addTechnology(technologyData: any) {
    return this.request('/technologies', {
      method: 'POST',
      body: JSON.stringify(technologyData),
    });
  }

  async updateTechnology(id: number, technologyData: any) {
    return this.request(`/technologies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(technologyData),
    });
  }

  async deleteTechnology(id: number) {
    return this.request(`/technologies/${id}`, {
      method: 'DELETE',
    });
  }

  // Experience endpoints
  async getExperiences() {
    return this.request('/experience');
  }

  async addExperience(experienceData: any) {
    return this.request('/experience', {
      method: 'POST',
      body: JSON.stringify(experienceData),
    });
  }

  async updateExperience(id: number, experienceData: any) {
    return this.request(`/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experienceData),
    });
  }

  async deleteExperience(id: number) {
    return this.request(`/experience/${id}`, {
      method: 'DELETE',
    });
  }

  // Hire Me endpoints
  async submitHireRequest(hireData: any) {
    return this.request('/hire-me', {
      method: 'POST',
      body: JSON.stringify(hireData),
    });
  }

  async getHireRequests() {
    return this.request('/hire-requests');
  }

  async updateHireRequestStatus(id: number, status: string) {
    return this.request(`/hire-requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // API V2 Skills
  async getSkillsV2() {
    return this.request('-v2/skills');
  }

  // API V2 Portfolio
  async getPortfolioV2() {
    return this.request('-v2/portfolio');
  }

  async getPortfolioDetailV2(id: number) {
    return this.request(`-v2/portfolio/${id}`);
  }

  // API V2 Experience
  async getExperienceV2() {
    return this.request('-v2/experience');
  }

  // API V2 Contact
  async getContactV2() {
    return this.request('-v2/contact');
  }

  // API V2 Hero
  async getHeroV2() {
    return this.request('-v2/hero');
  }

  // API V2 About
  async getAboutV2() {
    return this.request('-v2/about');
  }

  // About Me endpoints
  async getAbout() {
    return this.request('/about');
  }

  async saveAbout(aboutData: any) {
    return this.request('/about', {
      method: 'POST',
      body: JSON.stringify(aboutData),
    });
  }

  // Hero Section endpoints
  async getHero() {
    return this.request('/hero');
  }

  async saveHero(heroData: any) {
    return this.request('/hero', {
      method: 'POST',
      body: JSON.stringify(heroData),
    });
  }
}

export const api = new ApiService();