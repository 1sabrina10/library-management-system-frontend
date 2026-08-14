import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private key = 'token';

  saveToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }

  removeToken(): void {
    localStorage.removeItem(this.key);
  }

  getRole(): string | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];

      const decodedPayload = JSON.parse(atob(payload));

      return decodedPayload.role ?? null;

    } catch (error) {
      console.error('Erreur lecture token', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}