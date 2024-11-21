import { Component, inject } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NutritionistService } from '../../../../core/services/nutritionist.service';
import { Availability, NutriWithSchedules } from '../../../../shared/models/availability.model';
import { Doctor } from '../../../../shared/models/doctor.model';
import { CommonModule } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-nutritionists',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatIconModule, FormsModule, MatButtonModule],
  templateUrl: './nutritionists.component.html',
  styleUrls: ['./nutritionists.component.css']
})

export class NutritionistsComponent {
  private nutritionistService = inject(NutritionistService);
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);
  private appointmentService = inject(AppointmentService);

  media_url: string = 'https://nutri-api-latest.onrender.com/api/v1/media/';
  nutritionists: Doctor[] = [];
  availabilityMap: { [doctorId: number]: Availability[] } = {};
  selectedDateDoctors: NutriWithSchedules[] = [];
  selectedDate: Date | null = null;
  displayedNutritionists: NutriWithSchedules[] = [];
  selectedNutritionistId: number | null = null;
  isDropdownOpen = false;
  selectedNutritionistName: string | null = null;

  currentPage: number = 0;
  itemsPerPage: number = 2;

  ngOnInit() {
    this.loadNutritionistsAvailability();
  }

  loadNutritionistsAvailability() {
    this.nutritionistService.getDoctors().subscribe({
      next: (data: Doctor[]) => {
        this.nutritionists = data;
        console.log(this.nutritionists);
        data.forEach((doctor) => {
          this.loadAvailability(doctor.id);
        });
      },
      error: (error) => {
        this.showSnackBar('Error loading doctors');
        console.error(error);
      }
    });
  }

  loadAvailability(doctorId: number) {
    this.nutritionistService.getAvailability(doctorId).subscribe({
      next: (data: Availability[]) => {
        this.availabilityMap[doctorId] = data;
        console.log(data);
      },
      error: (error) => {
        this.showSnackBar(`Error loading availability for doctor ${doctorId}`);
        console.error(error);
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectNutritionist(nutritionist: any) {
    if (nutritionist === null) {
      this.selectedNutritionistId = null;  
      this.selectedNutritionistName = 'Elige un nutricionista'; 
    } else {
      this.selectedNutritionistId = nutritionist.id;
      this.selectedNutritionistName = `${nutritionist.firstName} ${nutritionist.lastName}`;
    }
    this.isDropdownOpen = false;
  }

  buscar() {
    if (!this.selectedDate) {
      this.showSnackBar("Please, choose a date");
      return;
    }

    const selectedDateStr = this.selectedDate.toISOString().split('T')[0];

    this.selectedDateDoctors = this.nutritionists
      .filter(nutritionist => !this.selectedNutritionistId || nutritionist.id === this.selectedNutritionistId)
      .map(nutritionist => {
        const schedules = this.availabilityMap[nutritionist.id]?.filter(schedule => schedule.date === selectedDateStr) || [];
        return schedules.length > 0 ? { ...nutritionist, schedules } as NutriWithSchedules : null;
      })
      .filter(nutritionist => nutritionist !== null);

    if (this.selectedDateDoctors.length === 0) {
      this.showSnackBar("Nutritionist not available for the selected date");
    }

    this.currentPage = 0;
    this.updateDisplayedNutritionists();
  }

  updateDisplayedNutritionists() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedNutritionists = this.selectedDateDoctors.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.updateDisplayedNutritionists();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedNutritionists();
    }
  }

  hasNextPage(): boolean {
    return (this.currentPage + 1) * this.itemsPerPage < this.selectedDateDoctors.length;
  }

  goToAppointment(scheduleId: number) {
    console.log(scheduleId);
    this.appointmentService.setScheduleId(scheduleId);
    const baseURL = ['/user', 'appointments'];
    this.router.navigate(baseURL);
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
