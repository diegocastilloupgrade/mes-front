// src/app/auth/dashboard-redirect.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-dashboard-redirect',
  standalone: true,
  template: '<p>Redirigiendo...</p>'
})
export class DashboardRedirectComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    const rol = this.auth.rol();
    if (rol === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (rol === 'operario') {
      this.router.navigate(['/operario/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
