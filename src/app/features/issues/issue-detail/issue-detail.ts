import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { IssueType } from '../../../models/enum/IssueTypeEnum';
import { IssueStatus } from '../../../models/enum/IssueStatusEnum';
import { IssuePriority } from '../../../models/enum/IssuePriorityEnum';
import { IssueDetailModel } from '../../../models/issue-details.model';

import { IssueService } from '../../../core/services/issue-service';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './issue-detail.html',
  styleUrls: ['./issue-detail.css'],
})
export class IssueDetail implements OnInit {

  issue!: any;

  users: any[] = [];

  IssueStatus = IssueStatus;
  IssueType = IssueType;
  IssuePriority = IssuePriority;

  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const issueId = params.get('issueId')!;
      const projectId = this.route.parent?.snapshot.paramMap.get('projectId')!;

      if (!projectId || !issueId) {
        console.error('Invalid route params', { projectId, issueId });
        return;
      }

      this.issueService.getIssueById(projectId, issueId)
        .subscribe(res => {

          this.issue = {
            ...res,

            comments: res.comments || [],

            attachments: [
              {
                fileName: 'design-doc.pdf',
                url: '#'
              }
            ],

            linkedIssues: [
              {
                key: 'JIRA-88',
                title: 'Authentication Refactor'
              }
            ],

            subTasks: [
              {
                title: 'Fix API Validation',
                completed: false
              },
              {
                title: 'Write Unit Tests',
                completed: true
              }
            ]
          };

        });

    });

    this.userService.loadUsers().subscribe(res => {
      this.users = res;
    });

  }


  addComment(): void {

    if (!this.newComment.trim()) return;

    this.issue.comments.push({
      id: crypto.randomUUID(),
      author: 'You',
      message: this.newComment,
      createdAt: new Date()
    });

    this.newComment = '';

  }


  uploadAttachment(event: any): void {

    const files = event.target.files;

    if (!files.length) return;

    for (let file of files) {

      this.issue.attachments.push({
        fileName: file.name,
        url: '#'
      });

    }

  }


  saveIssue(): void {

    const payload = {

      request: {
        Title: this.issue.title,

        Description: this.issue.description,

        ParentIssueId: this.issue.parentIssueId,

        Priority: this.issue.priority,

        Type: this.issue.issuetype,

        IssueStatus: this.issue.issuestatus,

        AssigneeId: this.issue.assignee,

        StoryPoints: Number(this.issue.storyPoints || 0),

        DueDate: this.issue.dueDate
          ? new Date(this.issue.dueDate).toISOString()
          : null
      }

    };

    this.issueService.updateIssue(this.issue.id, payload)
      .subscribe({
        next: () => alert('Issue updated successfully'),
        error: () => alert('Update failed')
      });

  }

}