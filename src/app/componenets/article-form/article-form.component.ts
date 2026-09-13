import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../article-service.service';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html'
})
export class ArticleFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    content: ['', Validators.required]
  });

  articleId: number | null = null;
  isEditMode = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.articleId = Number(idParam);
      this.articleService.getArticle(this.articleId).subscribe(article => {
        this.form.patchValue({
          title: article.title,
          description: article.description,
          content: article.content
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    const payload = this.form.value as { title: string; description: string; content: string };

    const request = this.isEditMode && this.articleId
      ? this.articleService.updateArticle(this.articleId, payload)
      : this.articleService.createArticle(payload);

    request.subscribe({
      next: article => this.router.navigate(['/articles', article.id]),
      error: () => this.errorMessage = 'Failed to save article'
    });
  }
}