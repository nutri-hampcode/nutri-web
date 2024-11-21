import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';  // Ensure Router is imported
import { Component, Input, OnInit } from '@angular/core';
import { MealsNutritionalPlanDetailsDTO } from '../../../shared/models/meals-nutritional-plan-details.dto';
import { MealsNutritionalPlanService } from '../../../core/services/meals-nutritional-plan.service';

@Component({
    selector: 'app-nutritional-plan-meals',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './nutritional-plan-meals.component.html',
    styleUrls: ['./nutritional-plan-meals.component.css']
})
export class NutritionalPlanMealsComponent implements OnInit {
    @Input() planId!: number;
    mealsByDay: { [key: string]: { [key: string]: MealsNutritionalPlanDetailsDTO[] } } = {};
    media_url: string = 'https://nutri-api-latest.onrender.com/api/v1/media/';
    // Define the ordered list of days
    daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    constructor(
        private mealsNutritionalPlanService: MealsNutritionalPlanService,
        private router: Router  // Inject Router here
    ) {}

    ngOnInit() {
        if (this.planId) {
            this.getMeals(); 
        } else {
            console.error('planId is not provided to NutritionalPlanMealsComponent');
        }
    }

    getMeals() {
        this.mealsNutritionalPlanService.getMealsForPlan(this.planId).subscribe(
            (data: MealsNutritionalPlanDetailsDTO[]) => {
                console.log('Data received from API:', data);
                this.mealsByDay = this.transformMeals(data);
                console.log('Meals organized by day and type:', this.mealsByDay);
            },
            (error) => {
                console.error('Error fetching meals:', error);
            }
        );
    }    

    private transformMeals(mealsNutritionalPlans: MealsNutritionalPlanDetailsDTO[]): { [key: string]: { [key: string]: MealsNutritionalPlanDetailsDTO[] } } {
        const result: { [key: string]: { [key: string]: MealsNutritionalPlanDetailsDTO[] } } = {};
    
        const validMealTypes = ['Breakfast', 'Brunch', 'Snack', 'Dinner'];
    
        mealsNutritionalPlans.forEach(item => {
            const day = item.weekDay; 
            let type = item.mealType; 
    
            if (!validMealTypes.includes(type)) {
                console.warn(`Invalid meal type "${type}" for item:`, item);
                type = 'Other'; 
            }
    
            if (!result[day]) {
                result[day] = {};
            }
            if (!result[day][type]) {
                result[day][type] = [];
            }
    
            if (item.meal) {
                const mealDetails = { ...item.meal };
                result[day][type].push({ ...item, meal: mealDetails });
            } else {
                console.warn("Meal is undefined for item:", item);
            }
        });
    
        console.log('Final organized meals:', result);
        return result;
    }

    navigateToMealDetail(mealId: number) {
        this.router.navigate(['/meal-detail', mealId]);
    }
}
