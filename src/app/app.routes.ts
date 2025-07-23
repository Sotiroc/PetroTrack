import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  { 
    path: 'calculate-cost', 
    loadComponent: () => import('./components/calculate-cost/calculate-cost').then(m => m.CalculateCostComponent)
  },
  { path: '**', redirectTo: '/dashboard' }
];
