import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>MES Prototipo</span>
    </mat-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main { padding: 16px; }
  `]
})
export class AppComponent {}
