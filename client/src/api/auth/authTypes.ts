export interface RegisterCredentials {
  user: string;
  email: string;
  pwd: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginCredentials {
  user: string;
  pwd: string;
}

export interface ErrorResponse {
  message: string;
}
