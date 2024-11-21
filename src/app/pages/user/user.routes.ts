import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { DhAddComponent } from './diet-hist/dh-add/dh-add.component';
import { DhShowComponent } from './diet-hist/dh-show/dh-show.component';
import { NutritionalPlansComponent } from './nutritional-plans/nutritional-plans.component';
import { NutritionistsComponent } from './nutritionaladvice/nutritionists/nutritionists.component';
import { AppointmentsComponent } from './nutritionaladvice/appointments/appointments.component';
import { HistoryAppointmentComponent } from './nutritionaladvice/history-appointment/history-appointment.component';
import { ProfileShowComponent } from './user-profile/profile-show/profile-show.component';
import { ProfileEditComponent } from './user-profile/profile-edit/profile-edit.component';

export const userRoutes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: 'diet-hist', component: DhAddComponent },
            { path: 'diet-hist/show', component: DhShowComponent },
            { path: 'nutritional-plans', component: NutritionalPlansComponent },
            { path: 'nutri-adv', component: NutritionistsComponent},
            { path: 'appointments', component: AppointmentsComponent },
            { path: 'appointments/history', component: HistoryAppointmentComponent },
            { path: "profile", component: ProfileShowComponent},
            { path: "profile/edit", component: ProfileEditComponent},
        ]
    }
];
