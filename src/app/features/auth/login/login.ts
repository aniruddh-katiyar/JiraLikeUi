import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;
constructor(private fb : FormBuilder, private authService : AuthService, private router: Router
  )
  {
    this.createForm();
  }
   private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    
}
onSubmit(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const loginPayload = this.loginForm.value;

  this.authService.userlogin(loginPayload).subscribe({
    next: (res: any) => {
      // 🔴 THIS WAS MISSING
      // Store login state
      if (res?.token) {
        localStorage.setItem('access_token', res.token);
      }

      // Optional: mark logged in
      localStorage.setItem('isLoggedIn', 'true');

      // Navigate AFTER state is set
      this.router.navigate(['/app/projects']);
    },
    error: () => {
      alert('Login failed');
    }
  });
}

}
