import { Doctor } from "./doctor.model";

export interface Availability {
    reserved: boolean;
    date: string;
    time: string;
    doctorName: string;
}

export interface NutriWithSchedules extends Doctor {
    schedules: Availability[];
}