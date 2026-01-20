import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECT } from '../../../../mock-data/project.mock';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backlog.html',
  styleUrl: './backlog.css'
})
export class Backlog {
  project = PROJECT;
}
