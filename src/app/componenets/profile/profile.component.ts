import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../article-service.service';
import { AuthService } from '../../auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService, public auth: AuthService) {}

  ngOnInit(): void {
    this.articleService.getMyArticles().subscribe(articles => this.articles = articles);
  }

  publish(article: Article): void {
    this.articleService.publishArticle(article.id).subscribe(updated => {
      const index = this.articles.findIndex(a => a.id === updated.id);
      this.articles[index] = updated;
    });
  }

  deleteArticle(id: number): void {
    if (!confirm('Delete this article?')) return;
    this.articleService.deleteArticle(id).subscribe(() => {
      this.articles = this.articles.filter(a => a.id !== id);
    });
  }
}