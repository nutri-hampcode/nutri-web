import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';  // Ensure Router is imported
import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { HomeService } from '../../../core/services/home.service';
import { Exercise } from '../../../shared/models/exercise.model';
import { MealsNutritionalPlanDetailsDTO } from '../../../shared/models/meals-nutritional-plan-details.dto';
import { AuthService } from '../../../core/services/auth.service';
import { inject } from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { Customer } from '../../../shared/models/user-profile.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterLink,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
  
})
export class HomeComponent  {
    private authService = inject(AuthService);
    private userProfileService = inject(ProfileService);
    private homeService = inject(HomeService);
    userProfile!: Customer;
    images = [{ url: 'https://hips.hearstapps.com/hmg-prod/images/crepes-1640022818.jpeg' },{ url: 'https://s2.abcstatics.com/abc/sevilla/media/gurmesevilla/2012/01/comida-rapida-casera.jpg' }, { url: 'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg' },{ url: 'https://fotografias.larazon.es/clipping/cmsimages01/2023/11/16/080445F5-DC20-409E-A8B9-498C90C12C90/dieta-mexicana-reduce-inflamacion-colesterol-malo-debido-sus-componentes_69.jpg?crop=1280,720,x0,y0&width=1280&height=720&optimize=low&format=jpg' }];
    meals: MealsNutritionalPlanDetailsDTO[] = [];
    exercises: Exercise[] = [];
    translateX = 0;
    currentIndex = 0;
    goalId: number = 1;
  
  
    ngOnInit(): void {
      this.loadProfile();
      this.loadMeals();
    }

    loadProfile(): void {
        const authData = this.authService.getUser();
        const userId = authData?.id;


        if (userId) {
            this.userProfileService.getUserProfile(userId).subscribe({
                next: (data) => {
                    this.userProfile = data;
                    this.goalId = data.goalId;
                    this.loadExercises(this.goalId);
                    console.log('Contenido de userProfile:', this.userProfile); // Ver el contenido de userProfile
                }
            });
          }
      }

    loadMeals() {
        const planId = 1; // Reemplaza esto con el ID de plan real
        this.homeService.getMealsForPlan(planId).subscribe({
          next:(data) => {
            this.meals = data;
            console.log('Contenido de meals:', this.meals); // Ver el contenido de meals
          },
          error:(error) => {
            console.error('Error al cargar los recetas:', error);
          },
          complete:() => {
          }}
        );
      }

      loadExercises(goalId: number) {
        this.homeService.getExercisesByGoalId(goalId).subscribe({
          next:(data) => {
            this.exercises = data;
            console.log('Contenido de exercises:', this.exercises); // Ver el contenido de meals
          },
          error:(error) => {
            console.error('Error al cargar los ejercicios:', error);
          },
          complete:() => {
          }}
        );
      }

  
    next() {
      if (this.currentIndex < this.meals.length - 1) {
        this.currentIndex++;
        this.updateTranslateX();
      }
    }
    next2() {
      if (this.currentIndex < this.exercises.length - 1) {
        this.currentIndex++;
        this.updateTranslateX();
      }
    }
  
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateTranslateX();
      }
    }
  
    private updateTranslateX() {
      // Asumiendo que cada elemento del carousel tiene un ancho de 300px
      this.translateX = -this.currentIndex * 300;
    }
  }