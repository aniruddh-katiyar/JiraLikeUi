import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../../core/services/issue-service';
import { CreateIssueRequest } from '../../../models/create_issue_request.model';
import { IssueResponse } from '../../../models/create_issue_response.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.html',
  styleUrl: './create-issue.css',
  imports:[ReactiveFormsModule, MatSnackBarModule]
})
export class CreateIssueComponent implements OnInit {

  issueForm!: FormGroup;
  projectId!: string;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnack : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.parent?.snapshot.paramMap.get('projectId')!;
console.log(this.projectId)

    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      type: [0, Validators.required],
      priority: [1, Validators.required],
      parentIssueId: [null]
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
      parentIssueId: this.issueForm.value.parentIssueId || null
    };

    this.issueService.createIssue(this.projectId, payload)
      .subscribe({
        next: (response: IssueResponse) => {
          console.log('Issue created:', response);
          this.router.navigate([
            `app/projects/${this.projectId}/issues`
           
          ]);
           this.matSnack.open('Issue Created Successfully.', 'close',
        {
        duration: 3000,
        horizontalPosition :'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      }
      );
        },
        error: () => {
          this.isSubmitting = false;
           this.matSnack.open('Issue is not created.', 'close',
        {
        duration: 3000,
        horizontalPosition :'center',
        verticalPosition: 'top',
        panelClass: ['failed-snackbar']
      }
      );
        }
      });
     
  }
}
