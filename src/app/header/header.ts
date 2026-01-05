import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'] // ✅ MUST be plural
})
export class Header implements OnInit {

  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // initial check
    this.updateLoginState();

    // re-check on every route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginState();
      }
    });
  }

  updateLoginState(): void {
    this.isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
