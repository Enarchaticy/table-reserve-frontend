export interface ApiResponse {
  message?: string;
  id?: string;
}

export interface LoginResponse {
  token: string;
  user: { id: string; email: string; name: string };
}
