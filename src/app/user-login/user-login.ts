import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export default class UserLogin {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.router.navigate(['/home']);
  }
}
