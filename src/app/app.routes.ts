// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard, adminGuard, operarioGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login.page').then(m => m.LoginPage)
  },

  // Rutas ADMIN
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./layouts/layout-admin.component').then(m => m.LayoutAdminComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard-admin.component').then(m => m.DashboardAdminComponent)
      },
      {
        path: 'maquinas',
        loadComponent: () =>
          import('./maquinas/maquinas.page').then(m => m.MaquinasPage)
      },
      // Placeholders para las demás rutas (crearemos en próximos pasos)
      {
        path: 'operaciones',
        loadComponent: () =>
          import('./shared/placeholder.component').then(m => m.PlaceholderComponent),
        data: { titulo: 'Operaciones' }
      },
      {
        path: 'checklists',
        loadComponent: () =>
          import('./shared/placeholder.component').then(m => m.PlaceholderComponent),
        data: { titulo: 'Checklists' }
      },
      {
        path: 'incidencias',
        loadComponent: () =>
          import('./shared/placeholder.component').then(m => m.PlaceholderComponent),
        data: { titulo: 'Incidencias' }
      },
      {
        path: 'cronograma',
        loadComponent: () =>
          import('./shared/placeholder.component').then(m => m.PlaceholderComponent),
        data: { titulo: 'Cronograma' }
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./shared/placeholder.component').then(m => m.PlaceholderComponent),
        data: { titulo: 'Usuarios' }
      }
    ]
  },

  // Rutas OPERARIO
  {
    path: 'operario',
    canActivate: [operarioGuard],
    loadComponent: () =>
      import('./layouts/layout-operario.component').then(m => m.LayoutOperarioComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard-operario.component').then(m => m.DashboardOperarioComponent)
      }
    ]
  },

  // Ruta genérica dashboard (redirige según rol)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./auth/dashboard-redirect.component').then(m => m.DashboardRedirectComponent)
  },

  { path: '**', redirectTo: 'login' }
];
