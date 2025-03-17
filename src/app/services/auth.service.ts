// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(email: string, password: string): boolean {
    // Validación simple: en un escenario real se usaría una API
    if (email === 'user@demo.com' && password === '123456') {
      this.isAuthenticated = true;
      localStorage.setItem('token', 'fake-jwt-token');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
