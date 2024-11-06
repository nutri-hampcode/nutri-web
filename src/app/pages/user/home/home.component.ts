import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';  // Ensure Router is imported
import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

import { HomeService } from '../../../core/services/home.service';
import { Exercise } from '../../../shared/models/exercise.model';
import { MealsNutritionalPlanDetailsDTO } from '../../../shared/models/meals-nutritional-plan-details.dto';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterLink,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
  
})
export class HomeComponent implements OnInit {
    images = [{ url: 'https://s2.abcstatics.com/abc/sevilla/media/gurmesevilla/2012/01/comida-rapida-casera.jpg' }, { url: 'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg' }, { url: 'https://hips.hearstapps.com/hmg-prod/images/crepes-1640022818.jpeg' },{ url: 'https://fotografias.larazon.es/clipping/cmsimages01/2023/11/16/080445F5-DC20-409E-A8B9-498C90C12C90/dieta-mexicana-reduce-inflamacion-colesterol-malo-debido-sus-componentes_69.jpg?crop=1280,720,x0,y0&width=1280&height=720&optimize=low&format=jpg' }];
    meals: MealsNutritionalPlanDetailsDTO[] = [];
    exercises: Exercise[] = [];
    translateX = 0;
    currentIndex = 0;
  
    constructor(private homeService: HomeService) {}
  
    ngOnInit() {
      this.loadExercises();
      this.loadMeals();
    }
  
    loadExercises() {
      const goalId = 1; // Reemplaza esto con el ID de objetivo real
      this.homeService.getExercisesByGoalId(goalId).subscribe({
        next:(data) => {
          this.exercises = data;
        },
        error:(error) => {
          console.error('Error al cargar los ejercicios:', error);
        },
        complete:() => {
        }}
      );
    }

    loadMeals() {
        const planId = 1; // Reemplaza esto con el ID de plan real
        this.homeService.getMealsForPlan(planId).subscribe({
          next:(data) => {
            this.meals = data;
          },
          error:(error) => {
            console.error('Error al cargar los recetas:', error);
          },
          complete:() => {
          }}
        );
      }
  
    next() {
      if (this.currentIndex < this.images.length - 1) {
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