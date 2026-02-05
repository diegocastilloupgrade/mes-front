// src/app/shared/placeholder.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="placeholder-card">
      <mat-card-header>
        <mat-icon mat-card-avatar>construction</mat-icon>
        <mat-card-title>{{ titulo }}</mat-card-title>
        <mat-card-subtitle>Módulo en construcción</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Este módulo se implementará en los próximos pasos del desarrollo.</p>
        <p class="info">Por ahora puedes navegar al módulo de <strong>Máquinas</strong> que ya está funcional.</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .placeholder-card {
      max-width: 600px;
      margin: 2rem auto;
      text-align: center;
    }
    mat-icon[mat-card-avatar] {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    .info {
      margin-top: 1rem;
      color: var(--mat-sys-on-surface-variant);
    }
  `]
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  titulo = this.route.snapshot.data['titulo'] || 'Módulo';
}
