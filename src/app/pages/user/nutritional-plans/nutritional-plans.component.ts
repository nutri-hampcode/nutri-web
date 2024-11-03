import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NutritionalPlanService } from '../../../core/services/nutritional-plan.service';
import { UserService } from '../../../core/services/user.service';
import { NutritionalPlanDetailsDTO } from '../../../shared/models/nutritional-plan-details.dto';
import { NutritionalPlanMealsComponent } from "../nutritional-plan-meals/nutritional-plan-meals.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
    selector: 'app-nutritional-plans', // Double-check this selector usage is consistent
    standalone: true,
    imports: [CommonModule, RouterLink, NutritionalPlanMealsComponent, NavbarComponent],
    templateUrl: './nutritional-plans.component.html',
    styleUrls: ['./nutritional-plans.component.css']
})
export class NutritionalPlansComponent implements OnInit { // Changed the class name for clarity
    nutritionalPlan!: NutritionalPlanDetailsDTO;
    planId!: number;

    constructor(
        private route: ActivatedRoute,
        private nutritionalPlanService: NutritionalPlanService,
        private userService: UserService
    ) {}

    ngOnInit() {
        const userId = this.userService.getUserId();
        console.log('User ID retrieved from UserService:', userId); 
        if (userId) {
            console.log('Fetching nutritional plan for user ID:', userId);
            this.getNutritionalPlanForUser(userId);
        } else {
            console.error('User ID is not set. User may not be authenticated.');
        }
    }

    getNutritionalPlanForUser(userId: number) {
        this.nutritionalPlanService.getNutritionalPlanForUser(userId).subscribe(
            (data) => {
                console.log('Nutritional plan data retrieved:', data);
                if (Array.isArray(data) && data.length > 0) {
                    this.nutritionalPlan = data[0]; // Use the first element
                    this.planId = this.nutritionalPlan.id; // Store the ID for meal retrieval
                } else {
                    console.warn('No nutritional plan data found for user');
                }
            },
            (error) => {
                console.error('Error fetching nutritional plan:', error);
            }
        );
    }    
}
