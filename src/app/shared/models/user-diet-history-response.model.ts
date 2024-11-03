export interface UserDietHistResponse {
    content: DietEntry[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
  
export interface DietEntry {
    date: Date;
    portion_quantity: number;
    user_name: string;
    meal_type: string;
    meal: {
        name: string;
        description: string;
        calories: number;
        proteins: number;
        carbs: number;
        fat: number;
        dietType: string;
    };
}
  