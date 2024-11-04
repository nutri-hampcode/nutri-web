import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../core/services/appointment.service';
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  scheduleId: number | null = null;
  private appointmentService = inject(AppointmentService);

  ngOnInit() {
    console.log('Retrieving schedule ID ', this.appointmentService.getScheduleId());
  }
}
