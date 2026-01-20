// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { UserRegistartionInterface } from '../models/user-registration.model';
// import { UserLoginInterface } from '../models/user-login.model';
// import { AuthResponse } from '../models/auth-response.model';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {

//   private baseUrl = environment.apiBaseUrl;

//   constructor(private http: HttpClient) {}

//   registerUser(user: UserRegistartionInterface) {
//     return this.http.post(
//       `${this.baseUrl}/users`,
//       user
//     );
//   }

//   userlogin(userLogin: UserLoginInterface) {
//     return this.http.post<AuthResponse>(
//       `${this.baseUrl}/auth/login`,
//       userLogin
//     );
//   }
// }
