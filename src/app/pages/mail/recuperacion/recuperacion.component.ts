import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { PasswordRecoveryService } from '../../../core/services/password-recovery.service';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule,
    MatSnackBarModule,MatButtonModule, RouterLink],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {
  recoveryForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar= inject(MatSnackBar);
  private passwordRecoveryService = inject(PasswordRecoveryService);

  constructor(){
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  controlHasError(control: string, error: string){
    return this.recoveryForm.controls[control].hasError(error);
  }

  onSubmit(){
    if(this.recoveryForm.invalid){
      return;
    };
    
    const email = this.recoveryForm.get('email')?.value;
    
    this.passwordRecoveryService.sendPasswordResetEmail(email).subscribe({
      next: () => {
        this.showSnackBar('Se ha enviado un correo con las instrucciones para recuperar tu contraseña');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error sending reset email:', error);
        this.showSnackBar('Error al enviar el correo de recuperación. Por favor, intenta de nuevo.');
      },
    });
  }

  private showSnackBar(message:string): void{
    this.snackBar.open('Recovery Successful', 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
