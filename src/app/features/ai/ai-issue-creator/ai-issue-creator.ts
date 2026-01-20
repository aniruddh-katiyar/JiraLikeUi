import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-issue-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-issue-creator.html',
  styleUrls: ['./ai-issue-creator.css']
})
export class AiIssueCreatorComponent {
  description: string = '';

  createIssue() {
    // later connect to AI service
    console.log('AI create issue:', this.description);
  }
}
