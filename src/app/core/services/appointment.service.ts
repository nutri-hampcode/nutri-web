import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../../shared/models/availability.model';
import { Appointment } from '../../shared/models/appointment.model';
import { AppointmentHistory } from '../../shared/models/appointment-history.model';

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
  
  getAvailabilitySchedule(availabilityId: number): Observable<Availability> {
    return this.http.get<Availability>(`${environment.baseURL}/availability/${availabilityId}`);
  }

  addAppointment(appointment: Appointment, userId: number): Observable<Appointment>{
    return this.http.post<Appointment>(`${this.baseURL}/${userId}`, appointment);
  }

  getAppointmentHistory(userId: number): Observable<AppointmentHistory[]> {
    return this.http.get<AppointmentHistory[]>(`${this.baseURL}/history/${userId}`);
  }
}