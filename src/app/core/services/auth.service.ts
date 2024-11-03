import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.baseURL}`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private userService = inject(UserService);


  constructor() { }
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/auth/login`, authRequest)
    .pipe(
      tap(response => {
        this.storageService.setAuthData(response);
        this.userService.setUserId(response.id);
        console.log('User ID set in UserService:', response.id);
      })
    );
  }
  

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURL}/auth/register`, registerRequest);
  }

  isAuthenticated(): boolean {
    const authData = this.storageService.getAuthData();
    return authData !== null;  // Verifica si la respuesta de login es la esperada
  }  

  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }
  
  logout(): void {
    this.storageService.clearAuthData();
  }
}