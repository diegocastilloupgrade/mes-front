// src/app/dashboard/dashboard-operario.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-dashboard-operario',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <h1>Mis Tareas</h1>

    <mat-card class="task-card" *ngFor="let task of tasks">
      <mat-card-header>
        <mat-card-title>{{ task.maquina }}</mat-card-title>
        <mat-chip [color]="task.prioridad === 'alta' ? 'warn' : 'primary'">
          {{ task.prioridad }}
        </mat-chip>
      </mat-card-header>
      <mat-card-content>
        <p>{{ task.descripcion }}</p>
        <p class="task-meta">
          <mat-icon>schedule</mat-icon>
          {{ task.fecha }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">Completar</button>
      </mat-card-actions>
    </mat-card>

    <p *ngIf="tasks.length === 0" class="no-tasks">
      No tienes tareas pendientes
    </p>
  `,
  styles: [`
    h1 { margin-bottom: 1.5rem; }
    .task-card {
      margin-bottom: 1rem;
    }
    .task-card mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .task-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.9rem;
      margin-top: 8px;
    }
    .task-meta mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .no-tasks {
      text-align: center;
      color: var(--mat-sys-on-surface-variant);
      margin-top: 2rem;
    }
  `]
})
export class DashboardOperarioComponent {
  tasks = [
    {
      id: '1',
      maquina: 'Torno CNC T-200',
      descripcion: 'Mantenimiento preventivo mensual',
      fecha: '05/02/2026 - 14:00',
      prioridad: 'alta'
    },
    {
      id: '2',
      maquina: 'Fresadora F-350',
      descripcion: 'Revisión sistema de refrigeración',
      fecha: '05/02/2026 - 16:00',
      prioridad: 'media'
    },
    {
      id: '3',
      maquina: 'Prensa P-500',
      descripcion: 'Inspección seguridad y lubricación',
      fecha: '06/02/2026 - 09:00',
      prioridad: 'media'
    }
  ];
}
