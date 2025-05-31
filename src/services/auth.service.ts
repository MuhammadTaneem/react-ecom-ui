import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password,
    });
  },

  async logout(): Promise<void> {
    return apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
}; 