export interface MealsNutritionalPlanDetailsDTO {
    weekDay: string;
    mealType: string;
    nutritionalPlan: string;
    meal: {
        id: number;
        name: string;
        imageUrl: string;
        description: string;
        calories: number;
        proteins: number;
        carbs: number;
        fat: number;
        dietType: string;
    };
}