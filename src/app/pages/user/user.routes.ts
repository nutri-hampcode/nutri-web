import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ProfileShowComponent } from './user-profile/profile-show/profile-show.component';
import { ProfileEditComponent } from './user-profile/profile-edit/profile-edit.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {path : "profile", component: ProfileShowComponent},
      {path : "profile/edit", component: ProfileEditComponent}
    ]
  }
];
