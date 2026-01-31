import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Activity } from '../../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityHttpService {

  constructor(private http: HttpClient) {}

  getProjectActivities(projectId: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${environment.apiBaseUrl}/projects/${projectId}/activity`
    );
  }
}
