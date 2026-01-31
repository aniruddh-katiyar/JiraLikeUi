import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm(); // ✅ Initialize form
  }
isSubmitting = false;
  private createForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required]]
      },
      { validators: passwordMatchValidator } // ✅ attach custom validator
    );
  }

  OnSubmit(): void {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      return;
    }
 this.isSubmitting = true;

    // ✅ Exclude confirmPassword before sending
    const { confirmpassword, ...registerPayload } = this.registerForm.value;

    this.authService.registerUser(registerPayload).subscribe({
      next: (res) =>{ this.isSubmitting = false;
                    this.router.navigate(['/login'])
                  },
      error: () =>{
                   this.isSubmitting = false;
                   alert("Registration failed.")
                   }
    });
  }
}

// ✅ Custom validator function
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmpassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true }; // ❌ error if mismatch
  }
  return null; // ✅ valid if match
}