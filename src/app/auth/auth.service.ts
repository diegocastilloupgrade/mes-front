import { Injectable, signal, computed, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'operario';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  user = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.user());
  rol = computed(() => this.user()?.rol ?? null);

  constructor() {
    const saved = localStorage.getItem('mes_user');
    if (saved) {
      const user: User = JSON.parse(saved);
      this.setUser(user);
    }

    effect(() => {
      const u = this.user();
      if (u) this.currentUserSubject.next(u);
    });
  }

  login(email: string, password: string): User | null {
    const users: User[] = [
      { id: '1', nombre: 'Admin MES', email: 'admin@mes.es', rol: 'admin' },
      { id: '2', nombre: 'Operario MES', email: 'operario@mes.es', rol: 'operario' }
    ];

    const user = users.find(u => u.email === email && password === '1234');
    if (user) {
      this.setUser(user);
      return user;
    }
    return null;
  }

  private setUser(user: User) {
    this.user.set(user);
    localStorage.setItem('mes_user', JSON.stringify(user));
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('mes_user');
    this.currentUserSubject.next(null);
  }
}
