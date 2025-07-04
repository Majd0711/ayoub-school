// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Upload URL for images
const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/uploads';

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheEntry<any>>();

// List of endpoints that should never be cached
const NEVER_CACHE_ENDPOINTS = [
  '/programs',
  '/news',
  '/team',
  '/contacts'
];

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function to add auth headers
const addAuthHeaders = (headers: HeadersInit = {}): HeadersInit => {
  const token = getAuthToken();
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  return headers;
};

// Request queue interface
interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  url: string;
  options: RequestInit;
  timestamp: number;
}

// Request queue and concurrency control
const MAX_CONCURRENT_REQUESTS = 5;
let activeRequests = 0;
const requestQueue: QueuedRequest[] = [];

// Process the next request in the queue
const processQueue = () => {
  // Remove any requests that have been in the queue too long (5 minutes)
  const now = Date.now();
  while (requestQueue.length > 0 && 
         now - requestQueue[0].timestamp > 5 * 60 * 1000) {
    const expired = requestQueue.shift();
    expired?.reject(new Error('Request timed out in queue'));
  }

  // Start new requests if we're under the limit
  while (activeRequests < MAX_CONCURRENT_REQUESTS && requestQueue.length > 0) {
    const { resolve, reject, url, options } = requestQueue.shift()!;
    activeRequests++;
    
    const processRequest = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          headers: addAuthHeaders(options.headers)
        });
        resolve(response);
      } catch (error) {
        reject(error);
      } finally {
        activeRequests--;
        processQueue();
      }
    };
    
    processRequest();
  }
};

// Active requests map to prevent duplicate requests
const pendingRequests = new Map<string, Promise<any>>();

// Helper function to generate a cache key
const getCacheKey = (url: string, options: RequestInit): string => {
  return `${options.method || 'GET'}:${url}:${JSON.stringify(options.body || {})}`;
};

// Helper function to add timestamp to URL to prevent caching
const addTimestamp = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_t=${Date.now()}`;
};

// Helper function to determine if a URL should be cached
const shouldCacheUrl = (url: string): boolean => {
  // Don't cache file uploads or auth requests
  return !url.includes('/upload') && !url.includes('/auth');
};

// Request interceptor
const requestInterceptor = async (url: string, options: RequestInit) => {
  const method = options.method || 'GET';
  const cacheKey = getCacheKey(url, options);
  
  // Check cache for GET requests
  if (method === 'GET') {
    // Only check cache if this URL should be cached
    if (shouldCacheUrl(url)) {
      const cacheEntry = cache.get(cacheKey);
      if (cacheEntry && (Date.now() - cacheEntry.timestamp < CACHE_TTL)) {
        console.log(`[API] Cache hit: ${method} ${url}`);
        return { cached: true, data: cacheEntry.data };
      }
    }
    
    // Check for active request
    if (pendingRequests.has(cacheKey)) {
      console.log(`[API] Request already in progress: ${method} ${url}`);
      return { cached: true, promise: pendingRequests.get(cacheKey) };
    }
  }
  
  console.log(`[API] ${method} ${url}`);
  
  // Add timestamp to prevent caching for GET requests
  const finalUrl = method === 'GET' ? addTimestamp(url) : url;
    
  return { url: finalUrl, options, cacheKey };
};

// Response interceptor
const responseInterceptor = async <T>(response: Response): Promise<{ data: T }> => {
  if (!response.ok) {
    const errorData = await response.text().catch(() => ({}));
    throw new Error(
      `API Error: ${response.status} - ${response.statusText}\n${JSON.stringify(errorData)}`
    );
  }
  
  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return { data: {} as T };
  }
  
  const data = await response.json();
  return { data };
};

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to handle API requests with retry mechanism and caching
async function apiRequest<T>(
  url: string, 
  options: RequestInit = {}
): Promise<{ data?: T; error?: string; fromCache?: boolean }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
  try {
    // Generate cache key
    const cacheKey = getCacheKey(url, options);
    
    // Check cache first for GET requests
    if (options.method === 'GET' || !options.method) {
      if (shouldCacheUrl(url)) {
        const cached = cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
          return { data: cached.data as T, fromCache: true };
        }
      }
    }
    
    // Prepare request options
    const requestOptions: RequestInit = {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'include', // Changed from 'omit' to 'include' to allow cookies/auth
    };

    // Add timestamp to GET requests to prevent browser caching
    const finalUrl = options.method === 'GET' ? addTimestamp(url) : url;
    
    console.log(`[API] ${options.method || 'GET'} ${finalUrl}`);
    
    const response = await fetch(finalUrl, requestOptions);
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Cache successful GET responses if appropriate
    if ((options.method === 'GET' || !options.method) && shouldCacheUrl(url)) {
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
    }
    
    return { data };
    
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`[API] Request Failed:`, {
      url,
      method: options.method || 'GET',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { 
      error: error instanceof Error ? error.message : 'Failed to fetch data'
    };
  }
}

// Types
export interface Program {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  image: string;
  features: string[];
  modules: { title: string; description: string }[];
  seats: number;
  isActive: boolean;
  displayOnHome: boolean;
  displayOrder: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface News {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  image?: string;
  type: string;
  category?: string;
  eventDate?: string;
  eventLocation?: string;
  isActive: boolean;
  isFeatured?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  slug?: string;
  position: string;
  bio: string;
  image: string;
  department: string;
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  experience?: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  specializations?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  order: number;
  isActive: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  programOfInterest?: string;
  status?: 'new' | 'in-progress' | 'responded' | 'closed';
  notes?: {
    note: string;
    addedBy: string;
    addedAt: string;
  }[];
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Programs API
export const programsApi = {
  getAll: async (): Promise<Program[]> => {
    try {
      console.log('Fetching all programs from:', `${API_BASE_URL}/programs`);
      const response = await fetch(`${API_BASE_URL}/programs`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Programs API response:', result);

      if (result.success && Array.isArray(result.data)) {
        return result.data;
      } else {
        console.warn('Invalid programs data format:', result);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch programs:', error);
      return [];
    }
  },

  getByCategory: async (category: string): Promise<Program[]> => {
    try {
      console.log('Fetching programs for category:', category);
      const response = await fetch(
        `${API_BASE_URL}/programs?category=${encodeURIComponent(category)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors',
          credentials: 'include'
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Category programs response:', result);

      if (result.success && Array.isArray(result.data)) {
        return result.data;
      } else {
        console.warn('Invalid category programs data format:', result);
        return [];
      }
    } catch (error) {
      console.error(`Failed to fetch programs for category ${category}:`, error);
      return [];
    }
  },

  getById: async (id: string): Promise<Program | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Program details response:', result);

      if (result.success && result.data) {
        return result.data;
      } else {
        console.warn('Invalid program details format:', result);
        return null;
      }
    } catch (error) {
      console.error(`Failed to fetch program ${id}:`, error);
      return null;
    }
  }
};

// News API
export const newsApi = {
  getAll: async (page = 1, limit = 10) => {
    const { data, error } = await apiRequest<{ news: News[]; pagination: any }>(
      `${API_BASE_URL}/news?page=${page}&limit=${limit}&isActive=true`
    );
    if (error) {
      console.error('Failed to fetch news:', error);
      return { news: [], pagination: {} };
    }
    return data || { news: [], pagination: {} };
  },

  getFeatured: async (limit = 3) => {
    const { data, error } = await apiRequest<News[]>(
      `${API_BASE_URL}/news?isFeatured=true&limit=${limit}&isActive=true`
    );
    if (error) {
      console.error('Failed to fetch featured news:', error);
      return [];
    }
    return data || [];
  },

  getByType: async (type: string, limit = 10) => {
    const { data, error } = await apiRequest<News[]>(
      `${API_BASE_URL}/news?type=${type}&limit=${limit}&isActive=true`
    );
    if (error) {
      console.error(`Failed to fetch ${type} news:`, error);
      return [];
    }
    return data || [];
  },

  getById: async (id: string) => {
    const { data, error } = await apiRequest<News>(`${API_BASE_URL}/news/${id}`);
    if (error) {
      console.error(`Failed to fetch news item ${id}:`, error);
      return null;
    }
    return data || null;
  },

  search: async (query: string, page = 1, limit = 10) => {
    const { data, error } = await apiRequest<{ news: News[]; pagination: any }>(
      `${API_BASE_URL}/news/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    if (error) {
      console.error(`Failed to search news with query ${query}:`, error);
      return { news: [], pagination: { total: 0, pages: 0, current: 1 } };
    }
  },
};

// Team API
export const teamApi = {
  getAll: async (): Promise<TeamMember[]> => {
    const { data, error } = await apiRequest<TeamMember[]>(`${API_BASE_URL}/team`);
    if (error) {
      console.error('Failed to fetch team members:', error);
      return [];
    }
    return data || [];
  },
};

// Contact API
export const contactApi = {
  submitForm: async (contactData: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean }> => {
    const { data, error } = await apiRequest<{ success: boolean }>(`${API_BASE_URL}/contact`, {
      method: 'POST',
      body: JSON.stringify(contactData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (error) {
      console.error('Failed to submit contact form:', error);
      return { success: false };
    }
    
    return data || { success: false };
  },
};

// Export API services
const api = {
  programs: programsApi,
  news: newsApi,
  team: teamApi,
  contact: contactApi,
};

export default api;

// ============= Direct API Functions =============

// Programs
export async function getPrograms() {
  try {
    console.log('Fetching all programs from API');
    const response = await fetch(`${API_BASE_URL}/programs`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Programs data:', data);
    
    // The API returns { success: true, data: [...] }
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    } else if (data.success && !data.data) {
      return [];
    } else {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error; // Re-throw the error to be handled by the component
  }
}

export async function getProgram(idOrSlug: string) {
  const { data } = await apiRequest<Program>(`${API_BASE_URL}/programs/${idOrSlug}`);
  return data || null;
}

export const createProgram = async (formData: FormData): Promise<Program> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/programs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: formData, // Don't set Content-Type header for multipart/form-data
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create program');
    }
    
    const result = await response.json();
    clearProgramsCache();
    return result.data;
  } catch (error: any) {
    throw new Error(`Failed to create program: ${error.message}`);
  }
};

export const updateProgram = async (id: string, formData: FormData): Promise<Program> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: formData, // Don't set Content-Type header for multipart/form-data
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update program');
    }
    
    const result = await response.json();
    clearProgramsCache();
    return result.data;
  } catch (error: any) {
    throw new Error(`Failed to update program: ${error.message}`);
  }
};

export const deleteProgram = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete program');
    }
    
    clearProgramsCache();
  } catch (error: any) {
    throw new Error(`Failed to delete program: ${error.message}`);
  }
};

export const toggleProgramActive = async (id: string): Promise<Program> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/programs/${id}/toggle-active`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to toggle program status');
    }
    
    const result = await response.json();
    clearProgramsCache();
    return result.data;
  } catch (error: any) {
    throw new Error(`Failed to toggle program status: ${error.message}`);
  }
};

// News
export async function getNews(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  const { data } = await apiRequest<News[]>(
    `${API_BASE_URL}/news${query ? `?${query}` : ''}`
  );
  return data || [];
}

export const createNews = async (formData: FormData): Promise<News> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      credentials: 'include',
      body: formData, // Don't set Content-Type header for multipart/form-data
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create news');
    }
    
    const result = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(`Failed to create news: ${error.message}`);
  }
};

export const updateNews = async (id: string, formData: FormData): Promise<News> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData, // Don't set Content-Type header for multipart/form-data
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update news');
    }
    
    const result = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(`Failed to update news: ${error.message}`);
  }
};

export const deleteNews = async (id: string): Promise<void> => {
  await apiRequest(`${API_BASE_URL}/news/${id}`, {
    method: 'DELETE',
  });
};

export const toggleNewsActive = async (id: string): Promise<News> => {
  const { data } = await apiRequest<News>(`${API_BASE_URL}/news/${id}/toggle-active`, {
    method: 'PUT',
  });
  return data as News;
};

export const toggleNewsFeatured = async (id: string): Promise<News> => {
  const { data } = await apiRequest<News>(`${API_BASE_URL}/news/${id}/toggle-featured`, {
    method: 'PUT',
  });
  return data as News;
};

export async function getFeaturedNews(limit = 3) {
  const { data } = await apiRequest<News[]>(
    `${API_BASE_URL}/news?isFeatured=true&limit=${limit}&isActive=true`
  );
  return data || [];
}

export async function getNewsByType(type: string, limit = 10) {
  const { data } = await apiRequest<News[]>(
    `${API_BASE_URL}/news?type=${type}&limit=${limit}&isActive=true`
  );
  return data || [];
}

export async function getNewsById(id: string) {
  const { data } = await apiRequest<News>(`${API_BASE_URL}/news/${id}`);
  return data || null;
}

// Other utility functions
export async function sendContactForm(formData: any) {
  const { data } = await apiRequest<{ success: boolean }>(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  return data || { success: false };
}

// Contact management functions
export async function getContacts(params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/contacts${queryParams ? `?${queryParams}` : ''}`;
  const { data } = await apiRequest<{ data: Contact[]; pagination: any }>(url);
  return data || { data: [], pagination: { page: 1, limit: 10, total: 0 } };
}

export async function getContact(id: string) {
  const { data } = await apiRequest<Contact>(`${API_BASE_URL}/contacts/${id}`);
  return data || null;
}

export async function updateContact(id: string, contactData: any) {
  const { data } = await apiRequest<Contact>(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(contactData)
  });
  return data || null;
}

export async function deleteContact(id: string): Promise<void> {
  await apiRequest(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE'
  });
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  metaTags: {
    title: string;
    description: string;
    keywords: string;
  };
  logo?: string;
  favicon?: string;
}

export async function getSiteSettings() {
  const { data } = await apiRequest<SiteSettings>(`${API_BASE_URL}/settings`);
  return data || {};
}

export const updateSiteSettings = async (formData: FormData): Promise<SiteSettings> => {
  const { data } = await apiRequest<SiteSettings>(`${API_BASE_URL}/settings`, {
    method: 'PUT',
    body: formData,
    headers: {
      // Don't set Content-Type here as it will be automatically set with the boundary for FormData
    },
  });
  return data as SiteSettings;
};

export async function getTeamMembers() {
  const { data } = await apiRequest<TeamMember[]>(`${API_BASE_URL}/team`);
  return data || [];
}

export const createTeamMember = async (formData: FormData): Promise<TeamMember> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const { data, error } = await apiRequest<TeamMember>(`${API_BASE_URL}/team`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
      // Don't set Content-Type here as it will be automatically set with the boundary for FormData
    },
  });

  if (error) {
    throw new Error(error);
  }

  if (!data) {
    throw new Error('Failed to create team member');
  }

  clearTeamCache();
  return data;
};

export const updateTeamMember = async (id: string, formData: FormData): Promise<TeamMember> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const { data, error } = await apiRequest<TeamMember>(`${API_BASE_URL}/team/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
      // Don't set Content-Type here as it will be automatically set with the boundary for FormData
    },
  });

  if (error) {
    throw new Error(error);
  }

  if (!data) {
    throw new Error('Failed to update team member');
  }

  clearTeamCache();
  return data;
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  // First verify the team member exists
  const { data: teamMember, error: getError } = await apiRequest<TeamMember>(`${API_BASE_URL}/team/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  if (getError) {
    if (getError.includes('404')) {
      throw new Error('Team member not found');
    }
    throw new Error(getError);
  }

  if (!teamMember) {
    throw new Error('Team member not found');
  }

  // Then proceed with deletion
  const { error: deleteError } = await apiRequest(`${API_BASE_URL}/team/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  if (deleteError) {
    throw new Error(deleteError);
  }

  clearTeamCache();
};

// Partner type definition
interface Partner {
  _id: string;
  name: string;
  logo: string;
  url: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export async function getPartners() {
  const { data } = await apiRequest<Partner[]>(`${API_BASE_URL}/partners`);
  return data || [];
}

// Authentication functions
export async function login(email: string, password: string) {
  const { data, error } = await apiRequest<{ token: string; user: any }>(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (data && data.token) {
    // Store token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { success: true, user: data.user };
  }
  
  return { success: false, message: error || 'Login failed' };
}

export async function logout() {
  try {
    await apiRequest(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage regardless of API response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  }
}

export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const { data } = await apiRequest<{ user: any }>(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data?.user || null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

// Function to clear cache for specific endpoints or all cache
export const clearCache = (endpoint?: string) => {
  if (!endpoint) {
    // Clear all cache
    console.log('[API] Clearing all cache');
    cache.clear();
    return;
  }

  // Clear cache for specific endpoint
  console.log(`[API] Clearing cache for endpoint: ${endpoint}`);
  const keysToDelete: string[] = [];
  
  cache.forEach((_, key) => {
    if (key.includes(endpoint)) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => cache.delete(key));
};

// Function to clear cache for programs
export const clearProgramsCache = () => clearCache('/programs');

// Function to clear cache for news
export const clearNewsCache = () => clearCache('/news');

// Function to clear cache for team
export const clearTeamCache = () => clearCache('/team');

// Helper function to get full URL for uploaded images
export const getImageUrl = (path: string, type: 'news' | 'programs' | 'team' = 'news'): string => {
  if (!path) return '/images/placeholder.svg';
  
  // If path is already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If path is a relative path starting with /, assume it's from the public folder
  if (path.startsWith('/')) {
    return path;
  }
  
  // Otherwise, assume it's from the backend uploads folder
  return `${UPLOADS_URL}/${type}/${path}`;
};

// Program Management Functions
export const getHomePrograms = async (): Promise<Program[]> => {
  const { data } = await apiRequest<Program[]>(`${API_BASE_URL}/programs/home`);
  return data || [];
};

export const toggleProgramHomeVisibility = async (programId: string): Promise<Program> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/programs/${programId}/toggle-home`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to toggle program home visibility');
    }
    
    const result = await response.json();
    clearProgramsCache();
    return result.data;
  } catch (error: any) {
    throw new Error(`Failed to toggle program home visibility: ${error.message}`);
  }
};

export const reorderPrograms = async (programs: { id: string; displayOrder: number }[]): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/programs/reorder`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ programs })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reorder programs');
    }
    
    clearProgramsCache();
  } catch (error: any) {
    throw new Error(`Failed to reorder programs: ${error.message}`);
  }
};

// Stats
export async function getAllStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Stats data:', data);

    if (data.success && data.data) {
      return data.data;
    } else {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}