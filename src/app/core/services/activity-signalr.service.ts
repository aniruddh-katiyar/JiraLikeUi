import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitySignalRService {

  private hubConnection!: signalR.HubConnection;

  private activitySubject = new BehaviorSubject<any>(null);
  activity$ = this.activitySubject.asObservable();

  // 🔑 Start ONCE
  startConnection(): void {
    if (this.hubConnection) return; // prevent multiple starts

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiBaseUrl}/activityHub`, {
        accessTokenFactory: () => localStorage.getItem('token') ?? ''
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('✅ SignalR connected');
        this.registerListeners();
      })
      .catch(err => console.error('❌ SignalR error:', err));
  }

  // 🔑 Listen to backend events
  private registerListeners(): void {
    this.hubConnection.on('IssueCreated', (activity) => {
      console.log('🔥 Activity received:', activity);
      this.activitySubject.next(activity);
    });
  }

  // 🔑 Join project group
  joinProject(projectId: string): void {
    if (!this.hubConnection) return;

    this.hubConnection
      .invoke('JoinProject', projectId)
      .catch(err => console.error('JoinProject failed:', err));
  }

  stopConnection(): void {
    this.hubConnection?.stop();
    this.hubConnection = undefined!;
  }
}
