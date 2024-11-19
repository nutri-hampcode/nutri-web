import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { AppointmentHistory } from '../../../../shared/models/appointment-history.model';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history-appointment',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history-appointment.component.html',
  styleUrl: './history-appointment.component.css'
})
export class HistoryAppointmentComponent {
  private appointmentService = inject(AppointmentService);
  private authService = inject(AuthService);
  appointments: AppointmentHistory[] = [];
  currentPage: number = 0;
  pageSize: number = 1;

  ngOnInit() {
    this.loadAppointmentHistory();
  }

  loadAppointmentHistory() {
    const authData = this.authService.getUser();
    const userId = authData?.id;
    if (userId) {
      this.appointmentService.getAppointmentHistory(userId).subscribe({
        next: (data: AppointmentHistory[]) => {
          console.log(data);
          console.log('Appointments loaded');
          this.appointments = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  isAppointmentActive(appointmentDate: string, appointmentTime: string): string {
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const currentDateTime = new Date();

    return appointmentDateTime > currentDateTime ? 'Active' : 'Ended';
  }

  get paginatedAppointments() {
    const startIndex = this.currentPage * this.pageSize;
    return this.appointments.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.appointments.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
