import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../shared/models/user-profile.model';
import { DietType, Goal } from '../../shared/models/diet.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseURL = `${environment.baseURL}`;
  private http = inject(HttpClient);

  getUserProfile(userId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/users/${userId}`);
  }

  updateUserProfile(userId: number, data: any) {
  return this.http.put(`${this.baseURL}/users/${userId}`, data);
}

  getDietTypes(): Observable<DietType[]> {
    return this.http.get<DietType[]>(`${this.baseURL}/diet_type`);
  }
  getDietTypeByID(dietTypeId : number): Observable<DietType>{
    return this.http.get<DietType>(`${this.baseURL}/diet_type/${dietTypeId}`);
  }

  getGoals(): Observable<Goal[]> {
      return this.http.get<Goal[]>(`${this.baseURL}/goals`);
  }
  getGoalsByID(goalId : number): Observable<Goal>{
    return this.http.get<Goal>(`${this.baseURL}/goals/${goalId}`);
  }
  
}

