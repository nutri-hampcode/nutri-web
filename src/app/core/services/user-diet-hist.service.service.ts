import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDietHistResponse } from '../../shared/models/user-diet-history-response.model';
import { UserDietHistRequest } from '../../shared/models/user-diet-hist-request.model';
import { Customer } from '../../shared/models/customer.model';
import { MealResponse } from '../../shared/models/meal-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserDietHistService {
  private baseURL = `${environment.baseURL}/diet_history`;
  private http = inject(HttpClient);

  getUserDietHist(userId: number, page: number): Observable<UserDietHistResponse> {
    return this.http.get<UserDietHistResponse>(`${this.baseURL}/page/${userId}?page=${page}&size=2`);
  }

  addUserDietHist(diet_history: UserDietHistRequest, userId: number, mealId: number): Observable<any> {
    return this.http.post<UserDietHistRequest>(`${this.baseURL}/user/${userId}/meal/${mealId}`, diet_history);
  }

  getUserDietType(userId: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.baseURL}/users/${userId}`);
  }

  getMealsByDietType(dietTypeId: number): Observable<MealResponse[]> {
    return this.http.get<MealResponse[]>(`${environment.baseURL}/meal/diet_type/${dietTypeId}`);
  }
}
