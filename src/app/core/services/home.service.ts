import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MealsNutritionalPlanDetailsDTO } from '../../shared/models/meals-nutritional-plan-details.dto';
import { Exercise } from '../../shared/models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseURL = `${environment.baseURL}/home`; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  getMealsForPlan(planId: number): Observable<MealsNutritionalPlanDetailsDTO[]> {
    return this.http.get<MealsNutritionalPlanDetailsDTO[]>(`${this.baseURL}/nutritional-plan/${planId}/all`);
  }
  getExercisesByGoalId(goalId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseURL}/goal/${goalId}`);
}

}
