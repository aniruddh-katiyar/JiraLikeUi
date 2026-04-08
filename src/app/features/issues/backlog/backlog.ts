import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECT } from '../../../../mock-data/project.mock';
import { IssueService } from '../../../core/services/issue-service';
import { IssueResponse } from '../../../models/create_issue_response.model';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { IssueStatus } from '../../../models/enum/IssueStatusEnum';
import { IssueType } from '../../../models/enum/IssueTypeEnum';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './backlog.html',
  styleUrl: './backlog.css'
})
export class Backlog {
  project = PROJECT;

  issues: IssueResponse[] = [];
    isLoading = true;
 issueStatus =  IssueStatus;
 issueType = IssueType;
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
    onIssueClick(issue : IssueResponse) : void
    {
     console.log('Clicked issue:', issue);

  this.router.navigate([
            `app/projects/${this.projectId}/issuedetails/${issue.id}`]);
    }
  }

