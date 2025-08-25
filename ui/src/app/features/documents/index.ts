import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./documents-list/documents-list.component'),
  },
] as Routes;
