import { Routes } from '@angular/router';

import { authGuard } from '@core/guards';
import { LayoutComponent, Layout } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'auth',
    component: LayoutComponent,
    data: { layout: Layout.empty },
    loadChildren: () => import('./features/auth'),
  },
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    data: { layout: Layout.sidebar },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard'),
      },
      {
        path: 'documents',
        loadChildren: () => import('./features/documents'),
      },
    ],
  },
];
