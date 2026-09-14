import { Routes } from '@angular/router';
import { authGuard } from './componenets/guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./componenets/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./componenets/register/register.component').then(m => m.RegisterComponent) },
  { path: 'articles', loadComponent: () => import('./componenets/article-list/article-list.component').then(m => m.ArticleListComponent) },
  { path: 'articles/:id', loadComponent: () => import('./components/article-detail/article-detail.component').then(m => m.ArticleDetailComponent) },
  { path: 'my-articles/new', loadComponent: () => import('./componenets/article-form/article-form.component').then(m => m.ArticleFormComponent), canActivate: [authGuard] },
  { path: 'my-articles/:id/edit', loadComponent: () => import('./componenets/article-form/article-form.component').then(m => m.ArticleFormComponent), canActivate: [authGuard] },
  { path: 'users', loadComponent: () => import('./componenets/user-list/user-list.component').then(m => m.UserListComponent) },
  { path: 'profile', loadComponent: () => import('./componenets/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
];