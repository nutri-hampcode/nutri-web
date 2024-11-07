import { Doctor } from "./doctor.model";

export interface Availability {
    id: number;
    reserved: boolean;
    date: string;
    time: string;
    doctorName: string;
}

export interface NutriWithSchedules extends Doctor {
    doctorImg: string;
    schedules: Availability[];
}