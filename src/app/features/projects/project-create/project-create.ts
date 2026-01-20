import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateProjectRequest } from '../../../models/project/create-project-request';
import { ProjectService } from '../../../core/services/project-service';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './project-create.html',
  styleUrls: ['./project-create.css'],
})
export class ProjectCreate {

  project: CreateProjectRequest = {
    name: '',
    key: ''
  };

  isSubmitting = false;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  onSubmit(): void {
    if (!this.project.name || !this.project.key || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.projectService.createProject(this.project).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        console.error('Create project failed', err);
        this.isSubmitting = false;
      }
    });
  }

  autoGenerateKey(): void {
    if (!this.project.name) return;

    this.project.key = this.project.name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z ]/g, '')
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 5);
  }
}
