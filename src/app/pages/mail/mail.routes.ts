import { Routes } from '@angular/router';
import { MailLayoutComponent } from './mail-layout/mail-layout.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';
import { PasswordResetComponent } from './password-recovery/password-recovery.component';

export const mailRoutes: Routes = [
    {
        path: '',
        component: MailLayoutComponent,
        children: [
            {path: 'recuperacion', component: RecuperacionComponent },
            {path: 'reset/:token', component: PasswordResetComponent }
        ]
    }
];