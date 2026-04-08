import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-member-component',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-member-component.html',
  styleUrl: './add-member-component.css',
})
export class AddMemberComponent {
 memberForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required],
      joined: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.memberForm.valid) {
      console.log('New Member:', this.memberForm.value);
      // TODO: integrate with backend API
      alert('Member added successfully!');
      this.memberForm.reset();
    }
  }

}
