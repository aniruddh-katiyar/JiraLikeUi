import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sprint-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sprint-board.html',
  styleUrls: ['./sprint-board.css']
})
export class SprintBoardComponent {
  @Input() todo: any[] = [];
  @Input() inProgress: any[] = [];
  @Input() done: any[] = [];
}
