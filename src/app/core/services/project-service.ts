import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateProjectRequest } from '../../models/project/create-project-request';
import { ProjectResponseModel } from '../../models/project/project-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly apiUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) {}
    createProject(payload: CreateProjectRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, payload);
  
  }
   getAllProjects(): Observable<ProjectResponseModel[]> {
   
    return this.http.get<ProjectResponseModel[]>(`${this.apiUrl}/projects`);
  }
}
