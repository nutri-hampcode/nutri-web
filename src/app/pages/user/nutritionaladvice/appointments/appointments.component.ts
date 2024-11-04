import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { Availability } from '../../../../shared/models/availability.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink, MatFormField, MatInputModule,
     FormsModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  scheduleId: number | null = null;
  private appointmentService = inject(AppointmentService);
  availability: Availability | null = null;
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  appForm: FormGroup;

  constructor() {
    this.appForm = this.fb.group({
      reason: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('Retrieving schedule ID ', this.appointmentService.getScheduleId());
    this.scheduleId = this.appointmentService.getScheduleId();
    this.loadAvailability();
  }

  loadAvailability() {
    if(this.scheduleId !== null) {
    this.appointmentService.getAvailabilitySchedule(this.scheduleId).subscribe({
      next: (data: Availability) => {
        this.availability = data;
      },
      error: (error) => {
        this.showSnackBar('Error loading availability');
        console.error(error);
      }
    });}
  }

  onSubmit() {
    if (this.appForm.valid) {
      const reason = this.appForm.value.reason;
      const avaId = this.scheduleId;

      const authData = this.authService.getUser();
      const userId = authData?.id;
      if(userId && avaId){
        this.appointmentService.addAppointment({
            reason: reason,
            availabilityId: avaId,
          }, userId).subscribe({
          next: () => {
            this.showSnackBar('Appointment reserved successfully');
          },
          error: (error) => {
            this.showSnackBar(error.error.message);
          }
        })}
    }
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
