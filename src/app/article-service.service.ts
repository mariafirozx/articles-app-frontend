import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticleRequest } from '../app/models/article';

const API_URL = 'http://localhost:8080/api/articles';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(author?: number, content?: string): Observable<Article[]> {
    let params = new HttpParams();
    if (author) params = params.set('author', author);
    if (content) params = params.set('content', content);
    return this.http.get<Article[]>(API_URL, { params });
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${API_URL}/${id}`);
  }

  getMyArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${API_URL}/my`);
  }

  createArticle(payload: ArticleRequest): Observable<Article> {
    return this.http.post<Article>(API_URL, payload);
  }

  updateArticle(id: number, payload: ArticleRequest): Observable<Article> {
    return this.http.put<Article>(`${API_URL}/${id}`, payload);
  }

  publishArticle(id: number): Observable<Article> {
    return this.http.put<Article>(`${API_URL}/${id}/publish`, {});
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}