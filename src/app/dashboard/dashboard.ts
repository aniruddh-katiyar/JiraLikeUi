import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BotService } from '../services/bot-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  question = '';
  answer = '';
  loading = false;

  constructor(private botService: BotService) {}

  askBot() {
    if (!this.question.trim()) {
      return;
    }

    this.loading = true;
    this.answer = '';

    this.botService.askBot(this.question)
      .subscribe({
        next: (res: string) => {
          this.answer = res;
          this.loading = false;
        },
        error: () => {
          this.answer = 'Error communicating with bot.';
          this.loading = false;
        }
      });
  }
}
