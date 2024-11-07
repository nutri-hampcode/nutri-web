import { DietType, Goal } from '../../../../shared/models/diet.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../../core/services/profile.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Customer, Allergies } from '../../../../shared/models/user-profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  private userProfileService = inject(ProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  profileForm: FormGroup;
  error = '';
  allergiesOptions = Object.values(Allergies);
  dietTypes: DietType[] = [];
  goals: Goal[] = [];

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      height: [''],
      weight: [''],
      age: [''],
      allergies: [''],
      dietType: ['', Validators.required], // Campo requerido
      goal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
    this.loadDietTypes();
    this.loadGoals();
  }

  loadProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (data) => {
          // Aplicamos los datos del perfil al formulario
          this.profileForm.patchValue(data);
        },
        error: () => {
          this.error = 'Error al cargar el perfil';
        }
      });
    }
  }

  loadDietTypes(): void {
    this.userProfileService.getDietTypes().subscribe({
      next: (data) => {
        this.dietTypes = data;
      },
      error: () => {
        this.error = 'Error al cargar los tipos de dieta';
      }
    });
  }

  loadGoals(): void {
    this.userProfileService.getGoals().subscribe({
      next: (data) => {
        this.goals = data;
      },
      error: () => {
        this.error = 'Error al cargar las metas';
      }
    });
  }

  onSubmit(): void {
    const payload = {
      name: this.profileForm.value.name,
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      age: this.profileForm.value.age,
      height: this.profileForm.value.height,
      weight: this.profileForm.value.weight,
      allergies: this.profileForm.value.allergies,
      goalId: Number(this.profileForm.value.goal), // Convertimos `goal` a `goalId`
      dietTypeId: Number(this.profileForm.value.dietType) // Convertimos `dietType` a `dietTypeId`
    };

    console.log('Formulario antes de enviar:', payload);

    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.updateUserProfile(userId, payload).subscribe({
        next: () => {
          this.router.navigate(['/user/profile']);
        },
        error: () => {
          this.error = 'Error al actualizar el perfil';
        }
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/user/profile']);
  }
}
