import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { UserLoginInterface } from '../models/user-login.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {

  constructor(private router: Router, private userService: UserService) {
    console.log('API Base URL:', environment.apiBaseUrl);
  }

  userLogin: UserLoginInterface = {
    email: '',
    password: ''
  };

  apiMessage = '';
  loading = false;
  submitted = false;

  onSubmit() {
    this.loading = true;
    this.apiMessage = '';

    this.userService.userlogin(this.userLogin)
      .subscribe({
        next: (response: any) => {
          //  SOURCE OF TRUTH: accessToken exists
          if (response?.accessToken) {
            this.handleLoginSuccess(response);
          } else {
            this.handleLoginFailure('Login failed');
          }
        },
        error: (err: any) => {
          //  Backend may return 500 but still send tokens
          const body = err?.error;

          if (body?.accessToken) {
            //  Backend inconsistency workaround
            this.handleLoginSuccess(body);
          } else {
            this.handleLoginFailure('Invalid credentials');
            console.error('Login error:', err);
          }
        }
      });
  }

  private handleLoginSuccess(response: {
    accessToken: string;
    refreshToken?: string;
  }) {
    localStorage.setItem('accessToken', response.accessToken);

    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    localStorage.setItem('loggedIn', 'true');

    this.apiMessage = 'You are logged in';
    this.submitted = true;
    this.loading = false;

    console.warn(
      'Login treated as success based on accessToken. Backend response contract is inconsistent.'
    );

    this.router.navigate(['/dashboard']);
  }

  private handleLoginFailure(message: string) {
    this.apiMessage = message;
    this.loading = false;
    this.submitted = false;
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.submitted = false;
    this.apiMessage = '';
  }
}
