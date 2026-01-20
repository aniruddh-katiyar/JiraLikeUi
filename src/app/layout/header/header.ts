import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectResponseModel } from '../../models/project/project-response.model';
import { ProjectService } from '../../core/services/project-service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit {

  projects: ProjectResponseModel[] = [];
  selectedProjectId: string | null = null;
  isLoading = true;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        // show only active projects in header
        this.projects = projects.filter(p => p.status === 'Active');
        this.isLoading = false;

        if (this.projects.length && !this.selectedProjectId) {
          this.selectedProjectId = this.projects[0].id;
        }
      },
      error: (err) => {
        console.error('Failed to load projects', err);
        this.isLoading = false;
      }
    });
  }

  onProjectChange(projectId: string): void {
    if (!projectId) return;

    this.selectedProjectId = projectId;
    this.router.navigate(['/projects', projectId, 'dashboard']);
  }
}
