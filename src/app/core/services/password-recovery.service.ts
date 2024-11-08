// password-recovery.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private readonly API_URL = `${environment.baseURL}/mail`; // Adjust port if needed
  private http = inject(HttpClient);

  sendPasswordResetEmail(email: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    return this.http.post<void>(`${this.API_URL}/sendMail`, email,{headers});
  }

  checkTokenValidity(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/reset/check/${token}`);
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    return this.http.post<void>(`${this.API_URL}/reset/${token}`, newPassword,{headers});
  }
}