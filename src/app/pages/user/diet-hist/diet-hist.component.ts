import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { UserDietHistService } from '../../../core/services/user-diet-hist.service.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserDietHistResponse } from '../../../shared/models/user-diet-history-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealResponse } from '../../../shared/models/meal-response.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MealType } from '../../../shared/models/meal-type.mode';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-user-diet-hist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatFormFieldModule, MatInputModule, MatNativeDateModule,
     MatSelectModule, MatOptionModule, FormsModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './diet-hist.component.html',
  styleUrl: './diet-hist.component.css',
})

export class DietHistComponent {
  private userDietHistService = inject(UserDietHistService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  dietHist!: UserDietHistResponse;
  currentPage: number = 0;
  isHistoryVisible: boolean = false;
  mealForm: FormGroup;
  meals: MealResponse[] =[];
  MealType = MealType;

  constructor() {
    this.mealForm = this.fb.group({
      portion_quantity: ['', Validators.required],
      date: ['', Validators.required],
      mealType: [null, Validators.required],
      meal: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadDietTypeAndMeals();
  }

  onSubmit() {
    if (this.mealForm.valid) {
      const formValues = this.mealForm.value;
      const mealId = parseInt(formValues.meal, 10);
      const formattedDate = formValues.date;

      console.log('Form Values:', {
        portion_quantity: formValues.portion_quantity,
        date: formattedDate,
        mealType: formValues.mealType,
        meal: formValues.meal
      });

      const authData = this.authService.getUser();
      const userId = authData?.id;
      if(userId){
        this.userDietHistService.addUserDietHist({
            portion_quantity: formValues.portion_quantity,
            date: formattedDate,
            mealType: formValues.mealType
          }, userId, mealId).subscribe({
          next: () => {
            this.showSnackBar('Platillo agregado correctamente');
          },
          error: (error) => {
            this.showSnackBar(error.error.message);
          }
        })}
    }
  }
  
  loadMealsByDietType(dietTypeId: number) {
    this.userDietHistService.getMealsByDietType(dietTypeId).subscribe({
        next: (meals: MealResponse[]) => {
            this.meals = meals;
        },
        error: (error) => {
            this.showSnackBar('Error loading meals for the selected diet type');
            console.error(error);
        }
    });
  }


  loadDietTypeAndMeals() {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userDietHistService.getUserDietType(userId).subscribe(user => {
        this.loadMealsByDietType(user.dietTypeId);
      });

  }}

  onDietHist(){
    this.isHistoryVisible = !this.isHistoryVisible;
    if (this.isHistoryVisible) {
      this.loadDietHist(this.currentPage);
    }
  }

  loadDietHist(page: number){
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if(userId){
      this.userDietHistService.getUserDietHist(userId, page).subscribe({
        next: (data) => {
          this.dietHist = data;
          console.log(data);
        },
        error: (error) => {
          this.showSnackBar('Error al cargar el historial de dietas');
          console.error(error);
        }
      });
    }
  }

  nextPage() {
    if (this.dietHist.number < this.dietHist.totalPages - 1) {
      this.currentPage++;
      this.loadDietHist(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadDietHist(this.currentPage);
    }
  }

  private showSnackBar(message:string): void{
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
