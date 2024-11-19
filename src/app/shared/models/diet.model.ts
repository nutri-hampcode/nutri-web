export interface DietType {
    id: number;
    type: string;  // Nombre del tipo de dieta, por ejemplo, "Vegetariana", "Vegana", etc.
    description?: string; // Descripción opcional del tipo de dieta
}
  
export interface Goal {
    id: number;
    goalType: string; // Nombre de la meta, como "Perder peso", "Ganar masa muscular", etc.
    description?: string; // Descripción opcional de la meta
}
