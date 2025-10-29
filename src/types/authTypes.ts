export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  avatar: File;
  message?: string;
}

export interface AuthResponse {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export interface LoginInterface {
  fullName: string;
  email: string;
  password: string;
}
