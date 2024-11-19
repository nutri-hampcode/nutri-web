import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MealsNutritionalPlanDetailsDTO } from '../../shared/models/meals-nutritional-plan-details.dto';
import { MealResponse } from '../../shared/models/meal-response.model';

import { Exercise } from '../../shared/models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseURL = `${environment.baseURL}`; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  getNutritionalPlanDetailsDTOById(id: number): Observable<MealsNutritionalPlanDetailsDTO> {
    return this.http.get<MealsNutritionalPlanDetailsDTO>(`${this.baseURL}/nutritional-plans/${id}`);
  }
  getMealsByNutritionalPlanId(nutritionalPlanId: number): Observable<MealResponse[]> {
    return this.http.get<MealResponse[]>(`${this.baseURL}/nutritional-plan/${nutritionalPlanId}/meals`);
  }
  getMealsForPlan(planId: number): Observable<MealsNutritionalPlanDetailsDTO[]> {
    return this.http.get<MealsNutritionalPlanDetailsDTO[]>(`${this.baseURL}/meals_nutritional_plans/nutritional-plan/${planId}/all`);
  }
  getExercisesByGoalId(goalId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseURL}/exercises/goal/${goalId}`);
  }
}
 