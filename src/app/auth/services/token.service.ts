import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isLogged(): boolean {
    return !!this.getToken();
  }

  setToken(accessToke: string): void {
    localStorage.setItem('accessToke', accessToke);
    console.log('Token Guardado:', accessToke);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToke');
  }

  getUserNameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const user = JSON.parse(decoded);
    return user.name || null;
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const user = JSON.parse(decoded);
    return user.id || null;
  }
  
  getUserEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const user = JSON.parse(decoded);
    return user.email || null;
  }

  getUserPhotoFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const user = JSON.parse(decoded);
    return user.image || null;
  }
}
