import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistartionInterface } from '../models/user-registration.model';
import { UserLoginInterface } from '../models/user-login.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = "https://localhost:44322/api/Users";
private apiUrllogin = "https://localhost:44322/login";

  constructor(private http: HttpClient) {}

  registerUser(user: UserRegistartionInterface) {
    return this.http.post(this.apiUrl, user);
  }
  userlogin(userLogin : UserLoginInterface)
  {
    return this.http.post<AuthResponse>(this.apiUrllogin, userLogin);
  }

}
