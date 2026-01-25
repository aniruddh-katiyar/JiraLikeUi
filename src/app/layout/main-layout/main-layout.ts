import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header';

import { FooterComponent } from '../footer/footer';

import { filter } from 'rxjs/internal/operators/filter';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    
    CommonModule,
    
],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout implements OnInit {

  projectId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resolveProjectId();

    // CRITICAL: layout is reused → listen to navigation
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.resolveProjectId();
      });
      console.log('Layout route config path:',
  this.route.snapshot.routeConfig?.path
);

  }

  private resolveProjectId(): void {
  this.projectId = undefined;

  let route = this.router.routerState.snapshot.root;

  while (route) {
    if (route.paramMap.has('projectId')) {
      this.projectId = route.paramMap.get('projectId')!;
      break;
    }
    route = route.firstChild!;
  }

  console.log('Layout projectId:', this.projectId);
}

}
