import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../../shared/models/availability.model';
import { Doctor } from '../../shared/models/doctor.model';

@Injectable({
  providedIn: 'root'
})

export class NutritionistService {
    private baseURL = `${environment.baseURL}/availability`;
    private http = inject(HttpClient);

    getAvailability(doctorId: number): Observable<Availability[]> {
        return this.http.get<Availability[]>(`${this.baseURL}/doctor/${doctorId}`);
    }
    
    getDoctors(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(`${environment.baseURL}/doctors`);
    }
}