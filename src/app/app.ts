import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRegistartion } from './user-registartion/user-registartion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserRegistartion],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('JiraLikeUi');
}
