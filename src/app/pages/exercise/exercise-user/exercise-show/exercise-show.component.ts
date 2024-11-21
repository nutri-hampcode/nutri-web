import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ExerciseService } from "../../../../core/services/exercise.service";
import { AuthService } from "../../../../core/services/auth.service";
import { ProfileService } from "../../../../core/services/profile.service";
import { Customer } from "../../../../shared/models/user-profile.model";
import { Exercise } from "../../../../shared/models/exercise.model";

@Component({
    selector: 'app-exercise',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './exercise-show.component.html',
    styleUrls: ['./exercise-show.component.css']
})
export class ExerciseShowComponent {    
    private userProfileService = inject(ProfileService);
    private exerciseService = inject(ExerciseService);
    private authService = inject(AuthService);
    private router = inject(Router);

    userProfile!: Customer;
    exercises: Exercise[] = [];
    error = '';
    loading = true;
    goalId = 0;

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
                    this.goalId = data.goalId;
                    if (this.goalId) {
                        this.getExercises(this.goalId);
                    }
                    this.loading = false;
                },
                error: (error) => {
                    this.error = 'Error al cargar el perfil';
                    this.loading = false;
                    console.error('Error:', error);
                }
            });
        }
    }


    getExercises(goalId: number): void {
        this.exerciseService.getExercisesByGoalId(goalId).subscribe(
            (data) => {
                this.exercises = data;
            },
            (error) => {
                this.error = 'Error al obtener los ejercicios';
                console.error('Error al obtener los ejercicios:', error);
            }
        );
    }
}
