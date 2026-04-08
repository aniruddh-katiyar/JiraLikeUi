import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../../core/services/issue-service';
import { CreateIssueRequest } from '../../../models/create_issue_request.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user-service';
import { CommonModule } from '@angular/common';

interface User {
  id: string;
  name: string;
  shortCode?: string;
}

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.html',
 styleUrls: ['./create-issue.css'],
   imports: [
    CommonModule,          // ✅ REQUIRED for *ngFor
    ReactiveFormsModule    // ✅ REQUIRED for ngValue + formControl
  ]
})
export class CreateIssueComponent implements OnInit {

  issueForm!: FormGroup;
  projectId!: string;
  isSubmitting = false;

  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.projectId = this.route.parent?.snapshot.paramMap.get('projectId')!;

    // Load users
    this.userService.loadUsers().subscribe(res => {
      this.users = res;
    });

    // FULL DTO mapped
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      type: [0, Validators.required],
      priority: [1, Validators.required],
      parentIssueId: [null],

      assigneeId: [null],
      status: [0],
      storypoints: [null],
      dueDate: [null]
    });
  }

  submit(): void {

    if (this.issueForm.invalid || this.isSubmitting) {
      this.issueForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload: CreateIssueRequest = {
      title: this.issueForm.value.title,
      description: this.issueForm.value.description,
      type: this.issueForm.value.type,
      priority: this.issueForm.value.priority,
      parentIssueId: this.issueForm.value.parentIssueId,

      assigneeId: this.issueForm.value.assigneeId,
      status: this.issueForm.value.status,
      storypoints: this.issueForm.value.storypoints 
  ? Number(this.issueForm.value.storypoints) 
  : 0,
      dueDate: this.issueForm.value.dueDate 
  ? new Date(this.issueForm.value.dueDate).toISOString()
  : null,
    };

    this.issueService.createIssue(this.projectId, payload).subscribe({
      next: () => {
        this.router.navigate([`app/projects/${this.projectId}/issues`]);

        this.snack.open('Issue Created Successfully', 'Close', {
          duration: 3000
        });
      },
      error: () => {
        this.isSubmitting = false;

        this.snack.open('Failed to create issue', 'Close', {
          duration: 3000
        });
      }
    });
  }
}