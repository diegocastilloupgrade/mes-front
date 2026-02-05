// src/app/dashboard/dashboard-admin.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <h1>Dashboard Administrador</h1>

    <div class="cards-grid">
      <mat-card class="stat-card">
        <mat-card-header>
          <mat-icon>precision_manufacturing</mat-icon>
          <mat-card-title>Máquinas</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-value">24</div>
          <div class="stat-label">Total activas</div>
        </mat-card-content>
      </mat-card>

      <mat-card class="stat-card">
        <mat-card-header>
          <mat-icon>build</mat-icon>
          <mat-card-title>Operaciones</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-value">12</div>
          <div class="stat-label">Pendientes</div>
        </mat-card-content>
      </mat-card>

      <mat-card class="stat-card">
        <mat-card-header>
          <mat-icon>warning</mat-icon>
          <mat-card-title>Incidencias</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-value">3</div>
          <div class="stat-label">Abiertas</div>
        </mat-card-content>
      </mat-card>

      <mat-card class="stat-card">
        <mat-card-header>
          <mat-icon>checklist</mat-icon>
          <mat-card-title>Checklists</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-value">87%</div>
          <div class="stat-label">Completadas</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    h1 { margin-bottom: 2rem; }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .stat-card mat-card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .stat-card mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: var(--mat-sys-primary);
    }
    .stat-value {
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--mat-sys-primary);
    }
    .stat-label {
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.9rem;
    }
  `]
})
export class DashboardAdminComponent {}
