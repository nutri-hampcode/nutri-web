import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
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

@Component({
  selector: 'app-nutritionists',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatIconModule, FormsModule],
  templateUrl: './nutritionists.component.html',
  styleUrls: ['./nutritionists.component.css']
})

export class NutritionistsComponent {
  private nutritionistService = inject(NutritionistService);
  private snackbar = inject(MatSnackBar);

  nutritionists: Doctor[] = [];
  availabilityMap: { [doctorId: number]: Availability[] } = {};
  selectedDateDoctors: NutriWithSchedules[] = [];
  selectedDate: Date | null = null;

  ngOnInit() {
    this.loadNutritionistsAvailability();
  }

  loadNutritionistsAvailability() {
    this.nutritionistService.getDoctors().subscribe({
      next: (data: Doctor[]) => {
        this.nutritionists = data;
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
        console.log(this.availabilityMap);
      },
      error: (error) => {
        this.showSnackBar(`Error loading availability for doctor ${doctorId}`);
        console.error(error);
      }
    });
  }

  buscar() {
    if (!this.selectedDate) {
      this.showSnackBar("Por favor, selecciona una fecha");
      return;
    }
  
    const selectedDateStr = this.selectedDate.toISOString().split('T')[0];
    
    this.selectedDateDoctors = this.nutritionists
    .map(nutritionist => {
      const schedules = this.availabilityMap[nutritionist.id]?.filter(schedule => schedule.date === selectedDateStr) || [];
      return schedules.length > 0 ? { ...nutritionist, schedules } as NutriWithSchedules : null;
    })
    .filter(nutritionist => nutritionist !== null);
  
    if (this.selectedDateDoctors.length === 0) {
      this.showSnackBar("No hay nutricionistas disponibles para la fecha seleccionada");
    }
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
  }


  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
