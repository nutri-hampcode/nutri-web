import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-exercise-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, NavbarComponent],
  templateUrl: './exercise-layout.component.html',
  styleUrl: './exercise-layout.component.css'
})
export class ExerciseLayoutComponent{

}