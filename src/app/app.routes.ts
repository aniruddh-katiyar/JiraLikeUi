import { Routes } from '@angular/router';


import { MainLayout } from './layout/main-layout/main-layout';



import { Register } from './features/auth/register/register';

import { ProjectList } from './features/projects/project-list/project-list';
import { ProjectCreate } from './features/projects/project-create/project-create';


import { Dashboard } from './features/dashboard/dashboard';
import { Board } from './features/issues/board/board';
import { Backlog } from './features/issues/backlog/backlog';

import { Chat } from './features/chat/chat';
import { SprintPageComponent } from './features/sprint/sprint-page/sprint-page';
import { AiIssueCreatorComponent } from './features/ai/ai-issue-creator/ai-issue-creator';
import { AiSummaryComponent } from './features/ai/ai-summary/ai-summary';
import { MemberComponent } from './features/member-component/member-component';
import { SettingComponent } from './features/setting-component/setting-component';
import { Home } from './core/home/home';
import { ProjectLayout } from './layout/project-layout/project-layout';
import { Login } from './features/auth/login/login';
import { AuthGuard } from './core/gaurds/AuthGaurd';
import { CreateIssueComponent } from './features/issues/create-issue/create-issue';
import { ActivityComponent } from './features/activity/activity';

export const routes: Routes = [

  /* Public */
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  /* App shell */
  {
    path: 'app',
     canActivate: [AuthGuard],
    component: MainLayout,
    children: [

      { path: '', redirectTo: 'projects', pathMatch: 'full' },

      { path: 'projects', component: ProjectList },
      { path: 'createproject', component: ProjectCreate },

      /* Project scoped */
      {
        path: 'projects/:projectId',
        component: ProjectLayout,   
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: Dashboard },
          { path: 'backlog', component: Backlog },
          { path: 'issues', component: Board },
          { path: 'issues/create', component: CreateIssueComponent },
          { path: 'sprint', component: SprintPageComponent },
          { path: 'activity', component: ActivityComponent },
          { path: 'chat', component: Chat },
          { path: 'members', component: MemberComponent },
          { path: 'setting', component: SettingComponent },
          { path: 'ai/create-issue', component: AiIssueCreatorComponent },
          { path: 'ai/summary', component: AiSummaryComponent }
        ]
      }
    ]
  }
];
