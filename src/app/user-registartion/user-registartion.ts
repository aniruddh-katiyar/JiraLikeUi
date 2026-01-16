import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service';
import { UserRegistartionInterface } from '../models/user-registration.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-registartion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-registartion.html',
  styleUrl: './user-registartion.css',
})
export class UserRegistartion {

  constructor(private userService: UserService) {
    console.log('API Base URL:', environment.apiBaseUrl);
  }

  model: UserRegistartionInterface = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  submitted = false;
  loading = false;
  errorMessage = '';

  submittedData: UserRegistartionInterface = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    // 🔒 Frontend-enforced role (backend has no validation)
    this.model.role = 'User';

    this.userService.registerUser(this.model)
      .subscribe({
        next: (response: any) => {
          // ✅ SOURCE OF TRUTH: userId exists → DB insert succeeded
          if (response?.userId) {
            this.markSuccess();
          } else {
            this.handleFailure('Registration failed (no userId returned)');
          }
        },
        error: (err: any) => {
          // ⚠️ Backend may return 500 but still insert user
          const body = err?.error;

          if (body?.userId) {
            // ✅ Backend inconsistency workaround
            this.markSuccess();
          } else {
            this.handleFailure('Registration failed');
            console.error('Registration error:', err);
          }
        }
      });
  }

  private markSuccess() {
    this.submitted = true;
    this.loading = false;
    this.submittedData = { ...this.model };

    console.warn(
      'Registration treated as success based on userId. Backend response contract is inconsistent.'
    );
  }

  private handleFailure(message: string) {
    this.loading = false;
    this.errorMessage = message;
  }
}
