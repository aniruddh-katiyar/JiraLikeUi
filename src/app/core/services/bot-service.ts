import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BotService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Backend returns PLAIN TEXT
 askBot(rawDescription: string): Observable<string> {
  return this.http.post<string>(
    `${this.baseUrl}/ai/projectdiscription`,
    JSON.stringify(rawDescription),
    {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json'
    }
  );
}



}
