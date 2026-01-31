import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECT } from '../../../../mock-data/project.mock';
import { IssueService } from '../../../core/services/issue-service';
import { IssueResponse } from '../../../models/create_issue_response.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backlog.html',
  styleUrl: './backlog.css'
})
export class Backlog {
  project = PROJECT;

  issues: IssueResponse[] = [];
    isLoading = true;

    projectId! : string;
  constructor(private issueService : IssueService, private route: ActivatedRoute,
    private router: Router,) {}

    ngOnInit(): void {
      this.projectId = this.route.parent?.snapshot.paramMap.get('projectId')!;
      this.loadProjects();
    }
  
    loadProjects(): void {
      this.issueService.GetIssuesbyProject(this.projectId).subscribe({
        next: (issues) => {
          this.issues = issues;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load issues', err);
          this.isLoading = false;
        }
      });
    }
  }

