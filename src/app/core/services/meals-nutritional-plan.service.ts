import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealsNutritionalPlanDetailsDTO } from '../../shared/models/meals-nutritional-plan-details.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealsNutritionalPlanService {
  private baseURL = `${environment.baseURL}/meals_nutritional_plans`;
  private http = inject(HttpClient);

  getMealsForPlan(planId: number): Observable<MealsNutritionalPlanDetailsDTO[]> {
    return this.http.get<MealsNutritionalPlanDetailsDTO[]>(`${this.baseURL}/nutritional-plan/${planId}/all`);
  }

  getMealById(mealId: number): Observable<MealsNutritionalPlanDetailsDTO> {
    return this.http.get<MealsNutritionalPlanDetailsDTO>(`${this.baseURL}/meal/${mealId}`);
  }
}
