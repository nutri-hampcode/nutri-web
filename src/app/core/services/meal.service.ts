import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealResponse } from '../../shared/models/meal-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseURL = `${environment.baseURL}/meals_nutritional_plans`;

  private http = inject(HttpClient);

  constructor() {}

  getMealsByNutritionalPlanId(nutritionalPlanId: number): Observable<MealResponse[]> {
    return this.http.get<MealResponse[]>(`${this.baseURL}/nutritional-plan/${nutritionalPlanId}/meals`);
  }
}