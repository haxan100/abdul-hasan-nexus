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
}

export const api = new ApiService();