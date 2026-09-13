export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
}