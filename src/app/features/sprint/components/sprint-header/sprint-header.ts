import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sprint-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sprint-header.html',
  styleUrls: ['./sprint-header.css']
})
export class SprintHeaderComponent {
  @Input() name: string = 'Sprint 12';
  @Input() startDate: string = '01 Jan';
  @Input() endDate: string = '14 Jan';
  @Input() status: string = 'Active';
}
