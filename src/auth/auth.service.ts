import { AlertService } from '../services/alert.service'; 
import { Injectable } from '@angular/core'; 
import { StorageService } from '../services/local-storage.service';
import { Router } from '@angular/router'; 
import { AuthApiService } from '../services/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    readonly authApi: AuthApiService,
    readonly storage: StorageService,
    readonly router: Router,
    readonly alert: AlertService) { }

  isAuthenticated = false;

  async login(obj: any): Promise<any | undefined> {
   return await this.authApi.login(obj); 
  }

  getToken() {
    return this.storage.getItem('Token');
  }

  setToken(token: string) {
    return this.storage.setItem('Token', token);
  }

  isLoggedIn() {
    return this.getToken() !== null
  }


  logout(): void {
    this.storage.removeItem('Token');
    this.storage.removeItem('User');
    location.href = "/#/login";
    location.reload();
    this.alert.Success("LogOut")
  }

  checkAuthentication(): boolean { 
    return this.isLoggedIn()
  }
}
