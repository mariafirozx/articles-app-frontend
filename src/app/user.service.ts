import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';

const API_URL = 'http://localhost:8080/api/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/${id}`);
  }
}