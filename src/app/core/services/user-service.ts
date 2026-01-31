import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProjectResponseModel } from '../../models/project/project-response.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiBaseUrl;

   constructor(private http : HttpClient) {
  }
  getUserById(userId : string): Observable<User> 
  {
      return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
    }
}
