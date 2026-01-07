import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { UserLoginInterface } from '../models/user-login.model';
import { AuthResponse } from '../models/auth-response.model';


@Component({
  selector: 'app-user-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin {

  constructor(private router: Router, private userService: UserService) {}

  userLogin: UserLoginInterface = {
    email: '',
    password: ''
  };

  apiMessage = '';
  loading = false;

  onSubmit() {

    this.loading = true;

    this.userService.userlogin(this.userLogin)
      .subscribe({
        next: (response: AuthResponse) => {

          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);

          this.apiMessage = "Login successful";

          this.router.navigate(['/home']);

          this.loading = false;
        },

        error: (err: Object) => {
          this.apiMessage = "Invalid credentials";
          this.loading = false;
        }
      });

  }

}
