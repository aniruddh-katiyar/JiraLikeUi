import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateProjectRequest } from '../../../models/project/create-project-request';
import { ProjectService } from '../../../core/services/project-service';
import { BotService } from '../../../core/services/bot-service';

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
    key: '',
    projectDescription: ''
  };

  isSubmitting = false;
  isGeneratingAi = false;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private botService: BotService
  ) {}

  onSubmit(): void {
    if (!this.project.name || !this.project.key || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.projectService.createProject(this.project).subscribe({
      next: () => this.router.navigate(['/app/projects']),
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

  autoGenerateProjectDescription(): void {
    if (
      !this.project.projectDescription ||
      this.isGeneratingAi ||
      this.isSubmitting
    ) {
      return;
    }

    this.isGeneratingAi = true;

    this.botService.askBot(this.project.projectDescription).subscribe({
      next: (text: string) => {
        this.project.projectDescription = text;

        // ✅ AUTO-RESIZE without new imports
        setTimeout(() => this.autoResizeTextarea(), 0);
      },
      error: (err) => {
        console.error('AI generation failed', err);
      },
      complete: () => {
        this.isGeneratingAi = false;
      }
    });
  }

  // ✅ Added method — no imports required
   autoResizeTextarea(): void {
    const textarea = document.querySelector(
      '.project-description'
    ) as HTMLTextAreaElement | null;

    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
