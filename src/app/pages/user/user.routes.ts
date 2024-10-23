import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      
    ]
  }
];
