import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectContext {

  private projectIdSubject = new BehaviorSubject<string | null>(null);

  /** Observable for components */
  projectId$ = this.projectIdSubject.asObservable();

  /** Set current project */
  setProjectId(projectId: string): void {
    this.projectIdSubject.next(projectId);
  }

  /** Get current project synchronously */
  getProjectId(): string | null {
    return this.projectIdSubject.value;
  }

  /** Clear on logout if needed */
  clear(): void {
    this.projectIdSubject.next(null);
  }
}
