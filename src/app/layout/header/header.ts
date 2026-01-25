import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProjectResponseModel } from '../../models/project/project-response.model';
import { ProjectService } from '../../core/services/project-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false; // later comes from AuthService
  userName = 'Aniruddh';   // later comes from token / profile API

  projects: ProjectResponseModel[] = [];
  selectedProjectId: string | null = null;
  isLoadingProjects = false;

  private subscriptions = new Subscription();

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}


  ngOnInit(): void {
    /**
     * TEMP: simulate authenticated user
     * Replace this later with AuthService.isAuthenticated$
     */
    this.isAuthenticated = this.checkAuth();

    if (this.isAuthenticated) {
      this.loadProjects();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(): void {
    // later: clear token + notify AuthService
    this.isAuthenticated = false;
    this.projects = [];
    this.selectedProjectId = null;

    this.router.navigate(['/login']);
  }

  private checkAuth(): boolean {
    // TEMP logic
    // later: return authService.isAuthenticated()
    return true;
  }

 

  private loadProjects(): void {
    this.isLoadingProjects = true;

    const sub = this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        // show only active projects in header
        this.projects = projects.filter(p => p.status === 'Active');
        this.isLoadingProjects = false;

        if (this.projects.length && !this.selectedProjectId) {
          this.selectedProjectId = this.projects[0].id;
          this.navigateToProject(this.selectedProjectId);
        }
      },
      error: (err) => {
        console.error('Failed to load projects', err);
        this.isLoadingProjects = false;
      }
    });

    this.subscriptions.add(sub);
  }

  onProjectChange(projectId: string): void {
    if (!projectId || projectId === this.selectedProjectId) {
      return;
    }

    this.selectedProjectId = projectId;
    this.navigateToProject(projectId);
  }

  private navigateToProject(projectId: string): void {
    this.router.navigate(['app/projects', projectId, 'dashboard']);
  }
}
