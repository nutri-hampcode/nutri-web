import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exercise } from '../../shared/models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseURL = `${environment.baseURL}/home`; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  getExercisesByGoalId(goalId: number): Observable<Exercise[]> {
      return this.http.get<Exercise[]>(`${this.baseURL}/goal/${goalId}`);
  }

}
