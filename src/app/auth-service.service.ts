import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../app/models/user';

const API_URL = 'http://localhost:8080/api/auth';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<{ userId: number; username: string } | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: { username: string; email: string; password: string; fullName: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/register`, payload).pipe(
      tap(res => this.storeSession(res))
    );
  }

  login(payload: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/login`, payload).pipe(
      tap(res => this.storeSession(res))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private storeSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ userId: res.userId, username: res.username }));
    this.currentUser.set({ userId: res.userId, username: res.username });
  }

  private loadUser(): { userId: number; username: string } | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}