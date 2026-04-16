import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateIssueRequest } from '../../models/create_issue_request.model';
import { CreateIssueComponent } from '../../features/issues/create-issue/create-issue';
import { IssueResponse } from '../../models/create_issue_response.model';
import { IssueDetailModel } from '../../models/issue-details.model';

@Injectable({
  providedIn: 'root',
})
export class IssueService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createIssue(projectId: string, payload: CreateIssueRequest): Observable<IssueResponse> {
  return this.http.post<IssueResponse>(
    `${this.apiUrl}/projects/${projectId}/issues`,
    {
      Title: payload.title,
      Description: payload.description,
      ParentIssueId: payload.parentIssueId,

      Priority: payload.priority,
      Type: payload.type,

      IssueStatus: payload.status,
      AssigneeId: payload.assigneeId,

      StoryPoints: payload.storypoints,
      DueDate: payload.dueDate
    }
  );
}


  GetIssuesbyProject(projectId : string) : Observable<IssueResponse[]>
  {
    return this.http.get<IssueResponse[]>(
      `${this.apiUrl}/projects/${projectId}/issues`
    );
  }
getIssueById(projectId: string, issueId: string): Observable<IssueDetailModel> {
  return this.http.get<IssueDetailModel>(
    `${this.apiUrl}/projects/${projectId}/issues/${issueId}`
  );
}



updateIssue(issueId: string, payload: any): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/issues/${issueId}`,
    payload
  );
}
  RemoveIssuebyIssueId(issueId: string) : Observable<boolean>
  {
    return this.http.delete<boolean>(
       `${this.apiUrl}/issues/${issueId}/delete`
    )
  }
}
