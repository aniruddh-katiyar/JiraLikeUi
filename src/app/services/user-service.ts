import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistartionInterface } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = "https://localhost:44322/api/Users";

  constructor(private http: HttpClient) {}

  registerUser(user: UserRegistartionInterface) {
    return this.http.post(this.apiUrl, user);
  }

}
