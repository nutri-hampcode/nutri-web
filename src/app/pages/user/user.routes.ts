import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout.component';
import { DhAddComponent } from './diet-hist/dh-add/dh-add.component';
import { DhShowComponent } from './diet-hist/dh-show/dh-show.component';
import { NutritionalPlansComponent } from './nutritional-plans/nutritional-plans.component';

export const userRoutes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: 'diet-hist', component: DhAddComponent },
            { path: 'diet-hist/show', component: DhShowComponent },
            { path: 'nutritional-plans', component: NutritionalPlansComponent }
        ]
    }
];
