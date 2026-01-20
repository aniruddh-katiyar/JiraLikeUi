import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sprint-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sprint-summary.html',
  styleUrls: ['./sprint-summary.css']
})
export class SprintSummaryComponent {
  @Input() committed: number = 20;
  @Input() completed: number = 14;
  @Input() remaining: number = 6;
}
