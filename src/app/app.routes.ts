import { Routes } from '@angular/router';
import { UserRegistartion } from './user-registartion/user-registartion';
import UserLogin from './user-login/user-login';
import { Dashboard } from './dashboard/dashboard';
import { Project } from './project/project';
import { Issue } from './issue/issue';

export const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Auth
  { path: 'register', component: UserRegistartion },
  { path: 'login', component: UserLogin },

  // Main app
  { path: 'dashboard', component: Dashboard },
  { path: 'projects', component: Project },
  { path: 'issues', component: Issue },

  // Fallback
  { path: '**', redirectTo: 'dashboard' }
];