import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';
import { NutritionalPlansComponent } from './pages/user/nutritional-plans/nutritional-plans.component';
import { MealDetailsComponent } from './pages/user/meal-details/meal-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes),
        canActivate:[authInverseGuard]
    },
    {
        path: 'user',
        loadChildren: () => import('./pages/user/user.routes').then(c => c.userRoutes),
        canActivate:[authGuard]
    },
    { path: 'nutritional-plans', component: NutritionalPlansComponent  },
    { path: 'meal/:id', component: MealDetailsComponent },
];
