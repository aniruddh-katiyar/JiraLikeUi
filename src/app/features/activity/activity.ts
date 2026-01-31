import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ActivitySignalRService } from '../../core/services/activity-signalr.service';
import { Activity } from '../../models/activity.model';
import { ActivatedRoute } from '@angular/router';
import { ActivityHttpService } from '../../core/services/activity.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.html',
  styleUrls: ['./activity.css']
})
export class ActivityComponent implements OnInit, OnDestroy {

  activities: Activity[] = [];
  private sub!: Subscription;

  constructor(
    private activityHub: ActivitySignalRService,
    private activityHttp: ActivityHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId =
      this.route.parent?.snapshot.paramMap.get('projectId');

    if (!projectId) return;

    this.activityHttp.getProjectActivities(projectId)
      .subscribe(history => {
        this.activities = history;
      });

    this.sub = this.activityHub.activity$.subscribe(activity => {
      if (!activity) return;

      const exists = this.activities.some(
        a => a.createdAt === activity.createdAt &&
             a.entityId === activity.entityId
      );

      if (!exists) {
        this.activities.unshift(activity);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  trackByTime(_: number, item: Activity): string {
    return item.createdAt;
  }
}
