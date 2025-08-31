import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () => import('./todos/todos'),
  },
  {
    path: 'todos/:id',
    loadComponent: () => import('./todo-details/todo-details'),
  },
  {
    path: '**',
    redirectTo: 'todos',
    pathMatch: 'full',
  }
];
