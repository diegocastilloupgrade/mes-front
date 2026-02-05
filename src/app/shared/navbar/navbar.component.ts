// src/app/shared/navbar/navbar.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-icon-button (click)="toggleSidebar()" *ngIf="isMobile()">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="navbar-title">MES - {{ auth.rol() === 'admin' ? 'Admin' : 'Operario' }}</span>

      <span class="spacer"></span>

      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>account_circle</mat-icon>
      </button>

      <mat-menu #menu="matMenu">
        <div class="user-info">
          <p><strong>{{ auth.user()?.nombre }}</strong></p>
          <p class="user-role">{{ auth.rol() }}</p>
        </div>
        <button mat-menu-item (click)="logout()">
          <mat-icon>logout</mat-icon>
          Cerrar sesión
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .navbar { position: sticky; top: 0; z-index: 1000; }
    .navbar-title { font-weight: 600; }
    .spacer { flex: 1 1 auto; }
    .user-info { 
      padding: 8px 16px; 
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 8px;
    }
    .user-info p { margin: 4px 0; font-size: 0.9rem; }
    .user-role { 
      color: var(--mat-sys-on-surface-variant); 
      text-transform: capitalize;
    }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  isMobile = signal(false);
  sidebarOpen = signal(false);

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => this.isMobile.set(result.matches));
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
