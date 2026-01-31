import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProjectResponseModel } from '../../models/project/project-response.model';
import { ProjectService } from '../../core/services/project-service';
import { AuthService } from '../../core/services/auth-service';
import { UserService } from '../../core/services/user-service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userName = 'Aniruddh'; // later decode from token or profile API

  projects: ProjectResponseModel[] = [];
  selectedProjectId: string | null = null;
  isLoadingProjects = false;
 userId: string | null = null;
 
  private subscriptions = new Subscription();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state
    const authSub = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
     this.userId = localStorage.getItem('userId');
      if (isLoggedIn) {
        this.loadProjects();
      } else {
        this.projects = [];
        this.selectedProjectId = null;
      }
    });
   if (this.userId) {
      this.loadUserName(this.userId);
}

    this.subscriptions.add(authSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  private loadProjects(): void {
    this.isLoadingProjects = true;

    const sub = this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects.filter(p => p.status === 'Active');
        this.isLoadingProjects = false;

        if (this.projects.length && !this.selectedProjectId) {
          this.selectedProjectId = this.projects[0].id;
          this.navigateToProject(this.selectedProjectId);
        }
      },
      error: () => {
        this.isLoadingProjects = false;
      }
    });

    this.subscriptions.add(sub);
  }

  onProjectChange(projectId: string): void {
    if (projectId && projectId !== this.selectedProjectId) {
      this.selectedProjectId = projectId;
      this.navigateToProject(projectId);
    }
  }

  private navigateToProject(projectId: string): void {
    this.router.navigate(['app/projects', projectId, 'dashboard']);
  }

   private loadUserName(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user: User) => {
        this.userName = user.name;
      },
      error: (err) => {
        console.error('Failed to load user', err);
        this.userName = '';
      }
    });
  }
}
