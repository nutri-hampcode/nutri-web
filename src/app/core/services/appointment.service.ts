import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseURL = `${environment.baseURL}/appointments`;
  private http = inject(HttpClient);

  setScheduleId(id: number) {
    sessionStorage.setItem('scheduleId', id.toString());
  }
  
  getScheduleId(): number | null {
    const id = sessionStorage.getItem('scheduleId');
    return id ? Number(id) : null;
  }
  

}