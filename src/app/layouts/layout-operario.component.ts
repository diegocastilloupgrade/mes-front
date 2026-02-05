// src/app/layouts/layout-operario.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-layout-operario',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .content {
      padding: 16px;
      min-height: calc(100vh - 64px);
      background: var(--mat-sys-surface);
    }
  `]
})
export class LayoutOperarioComponent {}
