import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECT } from '../../../../mock-data/project.mock';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {

  tasks = PROJECT.epics.flatMap(e =>
    e.stories.flatMap(s => s.tasks)
  );

  get todo() {
    return this.tasks.filter(t => t.status === 'TODO');
  }

  get inProgress() {
    return this.tasks.filter(t => t.status === 'IN_PROGRESS');
  }

  get done() {
    return this.tasks.filter(t => t.status === 'DONE');
  }

  move(task: any, next: string) {
    task.status = next;
  }
}
