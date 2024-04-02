export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface AuthUserResponse {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user?: AuthUserResponse;
}
