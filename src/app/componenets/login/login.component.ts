import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  
  form!: FormGroup;
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  
  ngOnInit() {
    // Initialize form HERE (after constructor runs)
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  errorMessage = '';

  submit(): void {
    if (this.form.invalid) return;
    this.errorMessage = '';

    this.auth.login(this.form.value as { username: string; password: string }).subscribe({
      next: () => this.router.navigate(['/articles']),
      error: () => this.errorMessage = 'Invalid username or password'
    });
  }
}
