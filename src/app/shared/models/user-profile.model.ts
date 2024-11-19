import { DietType, Goal } from './diet.model'; 

export enum Allergies {
    NONE = 'NONE',
    PEANUTS = 'PEANUTS',
    DAIRY = 'DAIRY',
    GLUTEN = 'GLUTEN',
    EGGS = 'EGGS',
    SOY = 'SOY',
    SHELLFISH = 'SHELLFISH'
}

export interface Customer {
    id:number,
    name:string,
    username:string,
    email:string,
    height?: number;
    weight?: number;
    age?: number;
    goalId: number;
    dietTypeId: number;
    allergies?: Allergies;
    dietType?: DietType;
    goal?: Goal;
    role:{
        id:number,
        name:string
    }
}