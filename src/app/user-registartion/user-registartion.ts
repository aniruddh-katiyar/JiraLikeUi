import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRegistartionInterface } from '../models/user-registration.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user-registartion',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-registartion.html',
  styleUrl: './user-registartion.css',
})
export class UserRegistartion {

  constructor(private userService: UserService) {}

  model: UserRegistartionInterface = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  submitted = false;

  submittedData: UserRegistartionInterface = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  onSubmit() {

  this.userService.registerUser(this.model)
    .subscribe({
      next: (response: Object) => {
        this.submitted = true;
        this.submittedData = { ...this.model };
      },
      error: (err: Object) => {
        console.log('Registration failed:', err);
      }
    });

}

}
