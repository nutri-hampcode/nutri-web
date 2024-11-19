import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserDietHistService } from '../../../../core/services/user-diet-hist.service.service';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealResponse } from '../../../../shared/models/meal-response.model';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MealType } from '../../../../shared/models/meal-type.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dh-add',
  standalone: true,
  imports: [CommonModule, RouterLink, MatFormFieldModule, MatInputModule, MatNativeDateModule,
    MatSelectModule, MatOptionModule, FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatButtonModule],
  templateUrl: './dh-add.component.html',
  styleUrl: './dh-add.component.css'
})
export class DhAddComponent {
  private userDietHistService = inject(UserDietHistService);
  private authService = inject(AuthService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

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
      
      const authData = this.authService.getUser();
      const userId = authData?.id;
      if(userId){
        this.userDietHistService.addUserDietHist({
            portion_quantity: formValues.portion_quantity,
            date: formattedDate,
            mealType: formValues.mealType
          }, userId, mealId).subscribe({
          next: () => {
            this.showSnackBar('Meal added successfully');
          },
          error: (error) => {
            this.showSnackBar(error.error.message);
          }
        })}
    }
    else{
      this.showSnackBar('Please fill all the fields');
    }
  }
  
  loadMealsByDietType(dietTypeId: number) {
    this.userDietHistService.getMealsByDietType(dietTypeId).subscribe({
        next: (meals: MealResponse[]) => {
            this.meals = meals;
        },
        error: (error) => {
            console.log(dietTypeId);
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


  private showSnackBar(message:string): void{
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
