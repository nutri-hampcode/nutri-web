import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NutritionalPlanDetailsDTO } from '../../shared/models/nutritional-plan-details.dto';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NutritionalPlanService {
    private baseURL = `${environment.baseURL}/nutritional_plans`;
    private http = inject(HttpClient);

    getNutritionalPlanById(id: number): Observable<NutritionalPlanDetailsDTO> {
        return this.http.get<NutritionalPlanDetailsDTO>(`${this.baseURL}/plans/${id}`);
    }    

    getNutritionalPlanForUser(userId: number): Observable<NutritionalPlanDetailsDTO> {
        return this.http.get<NutritionalPlanDetailsDTO>(`${this.baseURL}/user/${userId}/plans`);
    }
}