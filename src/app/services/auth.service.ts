import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  company: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validCredentials = {
    email: 'admin@gmail.com',
    password: 'admin123',
    company: 'IT'
  };

  private currentUser: User | null = null;

  constructor(private router: Router) { }

  login(email: string, password: string, company: string): boolean {
    if (
      email === this.validCredentials.email &&
      password === this.validCredentials.password &&
      company === this.validCredentials.company
    ) {
      this.currentUser = { email, company };
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
