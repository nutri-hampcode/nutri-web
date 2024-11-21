import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../../core/services/profile.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Customer } from '../../../../shared/models/user-profile.model';
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile-show.component.html',
    styleUrls: ['./profile-show.component.css']
})
export class ProfileShowComponent {
    private userProfileService = inject(ProfileService);
    private authService = inject(AuthService);
    private router = inject(Router);

    userProfile!: Customer;
    dietTypeName = ''; // Nuevo: Nombre del tipo de dieta
    goalName = '';     // Nuevo: Nombre de la meta
    error = '';
    loading = true;

    ngOnInit(): void {
        this.loadProfile();
    }

    loadProfile(): void {
        const authData = this.authService.getUser();
        const userId = authData?.id;
    
        if (userId) {
            this.userProfileService.getUserProfile(userId).subscribe({
                next: (data) => {
                    this.userProfile = data;
                    this.loading = false;
                    console.log(data.dietTypeId);
                    // Cargar nombre de tipo de dieta y meta solo si existen
                    if (data.dietTypeId !== undefined) {
                        this.loadDietTypeName(data.dietTypeId);
                    }
                    if (data.goalId !== undefined) {
                        this.loadGoalName(data.goalId);
                    }
                },
                error: (error) => {
                    this.error = 'Error al cargar el perfil';
                    this.loading = false;
                    console.error('Error:', error);
                }
            });
        }
    }    

    loadDietTypeName(dietTypeId: number): void {
        if (dietTypeId) {
            this.userProfileService.getDietTypeByID(dietTypeId).subscribe({
                next: (dietType) => {
                    this.dietTypeName = dietType.type;
                },
                error: (error) => {
                    console.error('Error al cargar el tipo de dieta:', error);
                }
            });
        }
    }

    loadGoalName(goalId: number): void {
        if (goalId) {
            this.userProfileService.getGoalsByID(goalId).subscribe({
                next: (goal) => {
                    this.goalName = goal.goalType;
                },
                error: (error) => {
                    console.error('Error al cargar la meta:', error);
                }
            });
        }
    }

    editProfile(): void {
        this.router.navigate(['/user/profile/edit']);
    }
}
