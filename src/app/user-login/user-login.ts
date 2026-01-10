import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { UserLoginInterface } from '../models/user-login.model';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {

  constructor(private router: Router, private userService: UserService) {}

  userLogin: UserLoginInterface = {
    email: '',
    password: ''
  };

  apiMessage = '';
  loading = false;
  submitted = false;

  onSubmit() {

    this.loading = true;

    this.userService.userlogin(this.userLogin)
      .subscribe({
        next: (response: { accessToken: string; refreshToken: string }) => {

          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('loggedIn', 'true');

          this.apiMessage = 'You are logged in';
          this.submitted = true;

          this.loading = false;

          this.router.navigate(['/dashboard']);
        },

        error: () => {
          this.apiMessage = 'Invalid credentials';
          this.loading = false;
        }
      });

  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.submitted = false;
    this.apiMessage = '';
  }

}
