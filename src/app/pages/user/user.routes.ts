import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout.component';
import { DietHistComponent } from './diet-hist/diet-hist.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'diet-hist', component: DietHistComponent}
    ]
  }
];
