import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Article } from '../../models/article';
import { Comment } from '../../models/comment';
import { ArticleService } from '../../article-service.service';
import { CommentService } from '../../comment-service.service';
import { AuthService } from '../../auth-service.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  comments: Comment[] = [];
  newCommentText = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private commentService: CommentService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
  }

  load(id: number): void {
    this.articleService.getArticle(id).subscribe({
      next: article => {
        this.article = article;
        this.loadComments(id);
      },
      error: () => this.errorMessage = 'Article not found or not accessible'
    });
  }

  loadComments(articleId: number): void {
    this.commentService.getCommentsByArticle(articleId).subscribe(comments => this.comments = comments);
  }

  isOwner(): boolean {
    return !!this.article && this.auth.currentUser()?.userId === this.article.authorId;
  }

  publish(): void {
    if (!this.article) return;
    this.articleService.publishArticle(this.article.id).subscribe(updated => this.article = updated);
  }

  deleteArticle(): void {
    if (!this.article || !confirm('Delete this article?')) return;
    this.articleService.deleteArticle(this.article.id).subscribe(() => this.router.navigate(['/articles']));
  }

  addComment(): void {
    if (!this.article || !this.newCommentText.trim()) return;
    this.commentService.addComment({ text: this.newCommentText, articleId: this.article.id }).subscribe(() => {
      this.newCommentText = '';
      this.loadComments(this.article!.id);
    });
  }

  deleteComment(commentId: number): void {
    if (!confirm('Delete this comment?')) return;
    this.commentService.deleteComment(commentId).subscribe(() => this.loadComments(this.article!.id));
  }

  canDeleteComment(comment: Comment): boolean {
    return this.auth.currentUser()?.userId === comment.authorId;
  }
}