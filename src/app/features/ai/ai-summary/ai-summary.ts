import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-summary.html',
  styleUrls: ['./ai-summary.css']
})
export class AiSummaryComponent {
  @Input() summary: string =
    'Login intermittently fails due to session timeout mismatch.';
}
