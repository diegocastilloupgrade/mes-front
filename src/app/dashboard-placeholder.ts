import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-dashboard-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>Dashboard {{ rol }}</h2>
      <p>Hola {{ nombre }}</p>

      <button mat-raised-button color="primary" (click)="logout()">
        Cerrar sesión
      </button>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
    }
    h2 { margin-bottom: 1rem; }
  `]
})
export class DashboardPlaceholderComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  get nombre() {
    return this.auth.user()?.nombre ?? 'Usuario';
  }

  get rol() {
    return this.auth.rol() ?? 'sin rol';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
