// src/app/layouts/layout-admin.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink,
    MatSidenavModule, MatListModule, MatIconModule,
    NavbarComponent
  ],
  template: `
  <app-navbar></app-navbar>

  <mat-sidenav-container class="sidenav-container">
    <mat-sidenav #drawer mode="side" [opened]="!isMobile()" class="sidenav">
      <mat-nav-list>
        <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active">
          <mat-icon matListItemIcon>dashboard</mat-icon>
          <span matListItemTitle>Dashboard</span>
        </a>
        <a mat-list-item routerLink="/admin/maquinas" routerLinkActive="active">
          <mat-icon matListItemIcon>precision_manufacturing</mat-icon>
          <span matListItemTitle>Máquinas</span>
        </a>
        <a mat-list-item routerLink="/admin/operaciones" routerLinkActive="active">
          <mat-icon matListItemIcon>build</mat-icon>
          <span matListItemTitle>Operaciones</span>
        </a>
        <a mat-list-item routerLink="/admin/checklists" routerLinkActive="active">
          <mat-icon matListItemIcon>checklist</mat-icon>
          <span matListItemTitle>Checklists</span>
        </a>
        <a mat-list-item routerLink="/admin/incidencias" routerLinkActive="active">
          <mat-icon matListItemIcon>warning</mat-icon>
          <span matListItemTitle>Incidencias</span>
        </a>
        <a mat-list-item routerLink="/admin/cronograma" routerLinkActive="active">
          <mat-icon matListItemIcon>calendar_month</mat-icon>
          <span matListItemTitle>Cronograma</span>
        </a>
        <a mat-list-item routerLink="/admin/usuarios" routerLinkActive="active">
          <mat-icon matListItemIcon>group</mat-icon>
          <span matListItemTitle>Usuarios</span>
        </a>
      </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content class="main-content">
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: calc(100vh - 64px);
    }
    .sidenav {
      width: 250px;
      border-right: 1px solid var(--mat-sys-outline-variant);
    }
    .main-content {
      padding: 24px;
      background: var(--mat-sys-surface);
    }
    .active {
      background-color: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }
    @media (max-width: 1024px) {
      .main-content { padding: 16px; }
    }
  `]
})
export class LayoutAdminComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isMobile = signal(false);

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => this.isMobile.set(result.matches));
  }
}
