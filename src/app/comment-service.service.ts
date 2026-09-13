import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CommentRequest } from './models/comment';

const API_URL = 'http://localhost:8080/api/comments';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsByArticle(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}/article/${articleId}`);
  }

  addComment(payload: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(API_URL, payload);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}