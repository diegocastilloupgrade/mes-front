import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-dashboard-placeholder',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <h1>Dashboard {{ rol }}</h1>
      <p>Hola {{ nombre }} ({{ rol }})</p>

      <a routerLink="/login" (click)="logout()" class="logout-link">
        Cerrar sesión
      </a>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      text-align: center;
    }
    .logout-link {
      display: inline-block;
      margin-top: 1rem;
      color: var(--mat-sys-primary);
      font-weight: 600;
      text-decoration: none;
    }
  `]
})
export class DashboardPlaceholderComponent {
  private auth = inject(AuthService);

  get nombre() {
    return this.auth.user()?.nombre ?? 'Usuario';
  }

  get rol() {
    return this.auth.rol() ?? 'sin rol';
  }

  logout() {
    this.auth.logout();
  }
}
