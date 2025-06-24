// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Types
export interface Program {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  image: string;
  isActive: boolean;
  features?: string[];
  modules?: { title: string; description: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface News {
  _id: string;
  title: string;
  content: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function for making API requests
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Programs API
export const programsApi = {
  getAll: async (): Promise<Program[]> => {
    const response = await apiRequest<{ success: boolean, data: Program[] }>('/programs');
    return response.data;
  },
  
  getByCategory: async (category: string): Promise<Program[]> => {
    const response = await apiRequest<{ success: boolean, data: Program[] }>(`/programs?category=${category}`);
    return response.data;
  },
  
  getById: async (id: string): Promise<Program> => {
    const response = await apiRequest<{ success: boolean, data: Program }>(`/programs/${id}`);
    return response.data;
  },
};

// News API
export const newsApi = {
  getAll: async (): Promise<News[]> => {
    const response = await apiRequest<{ success: boolean, data: News[] }>('/news');
    return response.data;
  },
  
  getById: async (id: string): Promise<News> => {
    const response = await apiRequest<{ success: boolean, data: News }>(`/news/${id}`);
    return response.data;
  },
};

// Team API
export const teamApi = {
  getAll: async (): Promise<TeamMember[]> => {
    const response = await apiRequest<{ success: boolean, data: TeamMember[] }>('/team');
    return response.data;
  },
};

// Contact API
export const contactApi = {
  submitForm: async (contactData: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean }> => {
    const response = await apiRequest<{ success: boolean }>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
    return response;
  },
};

export default {
  programs: programsApi,
  news: newsApi,
  team: teamApi,
  contact: contactApi,
}; 