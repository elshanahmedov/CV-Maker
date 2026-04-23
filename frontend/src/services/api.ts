const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface TextEnhancementData {
  text: string;
  sectionType?: string;
}

export interface TextEnhancementResponse {
  success: boolean;
  originalText: string;
  enhancedText: string;
  sectionType?: string;
  message?: string;
  error?: string;
}

export interface ApiResponse {
  message: string;
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}

class ApiService {
  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        message: 'Network error occurred',
        success: false,
        error: 'Failed to connect to server'
      };
    }
  }

  private async makeTextEnhancementRequest(endpoint: string, data: TextEnhancementData): Promise<TextEnhancementResponse> {
    try {
      console.log('Making text enhancement request to:', `${API_BASE_URL}/text-enhancer${endpoint}`);
      console.log('Request data:', data);

      const response = await fetch(`${API_BASE_URL}/text-enhancer${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', errorText);
        
        // Return a more user-friendly error message
        return {
          success: false,
          originalText: data.text,
          enhancedText: '',
          message: `Server error (${response.status}). The text enhancement service is temporarily unavailable.`,
          error: `HTTP ${response.status}`
        };
      }

      const result = await response.json();
      console.log('API response:', result);
      return result;
    } catch (error) {
      console.error('Text enhancement API request failed:', error);
      return {
        success: false,
        originalText: data.text,
        enhancedText: '',
        message: 'Unable to connect to the text enhancement service. Please check your internet connection and try again.',
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }

  async signup(userData: SignupData): Promise<ApiResponse> {
    return this.makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async signin(userData: SigninData): Promise<ApiResponse> {
    return this.makeRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async healthCheck(): Promise<ApiResponse> {
    return this.makeRequest('/health');
  }

  async enhanceText(text: string): Promise<TextEnhancementResponse> {
    if (!text || text.trim().length === 0) {
      return {
        success: false,
        originalText: text,
        enhancedText: '',
        message: 'Text cannot be empty',
        error: 'Invalid input'
      };
    }

    return this.makeTextEnhancementRequest('/enhance', { text });
  }

  async enhanceResumeSection(text: string, sectionType: string): Promise<TextEnhancementResponse> {
    if (!text || text.trim().length === 0) {
      return {
        success: false,
        originalText: text,
        enhancedText: '',
        message: 'Text cannot be empty',
        error: 'Invalid input'
      };
    }

    return this.makeTextEnhancementRequest('/enhance-resume-section', { text, sectionType });
  }
}

export const apiService = new ApiService();

// Export individual functions for easier imports
export const enhanceText = (text: string) => apiService.enhanceText(text);
export const enhanceResumeSection = (text: string, sectionType: string) => apiService.enhanceResumeSection(text, sectionType);