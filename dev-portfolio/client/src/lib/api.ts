import { API_BASE_URL } from "@/App";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ProjectData {
  id?: number;
  title: string;
  description: string;
  technologies: string;
  status: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface BlogPostData {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string;
  status: string;
}

export interface VisitorStats {
  totalVisitors: number;
  uniqueIPs: number;
  uniqueSessions: number;
  pageViews: number;
}

export interface ProfileData {
  id?: number;
  name: string;
  birthDate?: string;
  location?: string;
  university?: string;
  major?: string;
  graduationStatus?: string;
  militaryStatus?: string;
  introduction?: string;
  email?: string;
  githubUrl?: string;
  blogUrl?: string;
}

// Contact API
export const contactApi = {
  submit: async (data: ContactFormData): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  getAll: async (page = 0, size = 10): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts?page=${page}&size=${size}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};

// Project API
export const projectApi = {
  getAll: async (): Promise<ApiResponse<ProjectData[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  create: async (data: ProjectData): Promise<ApiResponse<ProjectData>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  update: async (id: number, data: ProjectData): Promise<ApiResponse<ProjectData>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  delete: async (id: number): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};

// Blog API
export const blogApi = {
  getAll: async (page = 0, size = 10): Promise<ApiResponse<BlogPostData[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog?page=${page}&size=${size}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  create: async (data: BlogPostData): Promise<ApiResponse<BlogPostData>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};

// Visitor API
export const visitorApi = {
  recordVisit: async (page: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ipAddress: 'client',
          userAgent: navigator.userAgent,
          referer: document.referrer,
          page,
          sessionId: getSessionId(),
        }),
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  getStats: async (): Promise<ApiResponse<VisitorStats>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors/stats`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};

// Profile API (기본정보)
export const profileApi = {
  get: async (): Promise<ApiResponse<ProfileData>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  update: async (data: ProfileData): Promise<ApiResponse<ProfileData>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};

// Auth API
export const authApi = {
  login: async (username: string, password: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success && data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      return data;
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  logout: (): void => {
    localStorage.removeItem('token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
};

// Session ID helper
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random()}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}
