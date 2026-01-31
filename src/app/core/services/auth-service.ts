import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserRegistartionInterface } from '../../models/user-registration.model';
import { UserLoginInterface } from '../../models/user-login.model';
import { AuthResponse } from '../../models/auth-response.model';
import { RegistrationResponse } from '../../models/registration-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // ✅ Restore auth state ONLY from access token
    const token = localStorage.getItem('access_token');
    this.isLoggedInSubject.next(!!token);
  }

  registerUser(user: UserRegistartionInterface): Observable<RegistrationResponse> 
  {
  return this.http.post<RegistrationResponse>(`${this.baseUrl}/auth/register`,user);
  }

  userlogin(userLogin: UserLoginInterface): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, userLogin)
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('refresh_token', res.refreshToken);
          localStorage.setItem('userId', res.userId);
          // ✅ update reactive state
          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
     localStorage.removeItem('userId');

    // ✅ update reactive state
    this.isLoggedInSubject.next(false);
  }

  clearSession(): void {
    this.logout();
  }

  // ✅ THIS IS THE IMPORTANT CHANGE
  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
