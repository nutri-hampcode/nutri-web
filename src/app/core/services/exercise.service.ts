import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../../shared/models/user-profile.model";
import { Exercise } from "../../shared/models/exercise.model";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService{
    private baseURL = `${environment.baseURL}`;
    private http = inject(HttpClient);

    getExercisesByGoalId(goalId: number): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.baseURL}/exercises/goal/${goalId}`);
    }
    getExerciseById(id:number):Observable<Exercise>{
        return this.http.get<Exercise>(`${this.baseURL}/exercises/${id}`);
    }
}