import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article';
import { User } from '../../models/user';
import { ArticleService } from '../../article-service.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  users: User[] = [];

  selectedAuthor: number | null = null;
  contentQuery = '';

  constructor(private articleService: ArticleService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService
      .getArticles(this.selectedAuthor ?? undefined, this.contentQuery || undefined)
      .subscribe(articles => this.articles = articles);
  }

  onFilterChange(): void {
    this.loadArticles();
  }

  clearFilters(): void {
    this.selectedAuthor = null;
    this.contentQuery = '';
    this.loadArticles();
  }
}