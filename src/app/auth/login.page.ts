import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <h1>Login MES</h1>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Contraseña</mat-label>
            <input matInput formControlName="password" type="password">
          </mat-form-field>

          <p class="demo">
            Demo: admin&#64;mes.es / operario&#64;mes.es → 1234
          </p>

          <button mat-raised-button color="primary" type="submit"
                  [disabled]="form.invalid || loading()">
            {{ loading() ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 16px;
    }
    .full-width { width: 100%; }
    .demo { font-size: 0.8rem; color: gray; margin-bottom: 16px; }
  `]
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = signal(false);

  onSubmit() {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    const { email, password } = this.form.getRawValue();

    const user = this.auth.login(email, password);

    setTimeout(() => {
      this.loading.set(false);

      if (!user) {
        this.snack.open('Credenciales incorrectas', 'OK', { duration: 3000 });
        return;
      }

      this.snack.open(`Bienvenido ${user.nombre}`, 'OK', { duration: 2000 });
      this.router.navigate(['/dashboard']);
    }, 600);
  }
}
