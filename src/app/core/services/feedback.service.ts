import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Feedback } from "../../shared/models/feedback.model";
import { Customer } from "../../shared/models/user-profile.model";

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private baseUrl = `${environment.baseURL}/feedbacks`;

  constructor(private http: HttpClient) {}

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.baseUrl, feedback);
  }
}
