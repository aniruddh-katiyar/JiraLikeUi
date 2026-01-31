import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateIssueRequest } from '../../models/create_issue_request.model';
import { CreateIssueComponent } from '../../features/issues/create-issue/create-issue';
import { IssueResponse } from '../../models/create_issue_response.model';

@Injectable({
  providedIn: 'root',
})
export class IssueService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createIssue(projectId: string, payload: CreateIssueRequest): Observable<IssueResponse> 
  {
    return this.http.post<IssueResponse>(
      `${this.apiUrl}/projects/${projectId}/issues`,
      payload
    );
  }

  GetIssuesbyProject(projectId : string) : Observable<IssueResponse[]>
  {
    return this.http.get<IssueResponse[]>(
      `${this.apiUrl}/projects/${projectId}/issues`
    );
  }

  RemoveIssuebyIssueId(issueId: string) : Observable<boolean>
  {
    return this.http.delete<boolean>(
       `${this.apiUrl}/issues/${issueId}/delete`
    )
  }
}
