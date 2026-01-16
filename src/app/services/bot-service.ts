import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Backend returns PLAIN TEXT
  askBot(question: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/bot/ask`,
      { question },
      { responseType: 'text' }
    );
  }
}
