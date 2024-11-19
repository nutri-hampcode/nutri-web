// password-reset.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { PasswordRecoveryService } from '../../../core/services/password-recovery.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, 
    MatCardModule,MatSnackBarModule,MatButtonModule,CommonModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  private token: string = '';

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private passwordRecoveryService = inject(PasswordRecoveryService);

  constructor() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (!this.token) {
      this.showSnackBar('Token inválido');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.passwordRecoveryService.checkTokenValidity(this.token).subscribe({
      next: (isValid) => {
        if (!isValid) {
          this.showSnackBar('El enlace ha expirado o es inválido');
          this.router.navigate(['/auth/login']);
        }
      },
      error: () => {
        this.showSnackBar('Error al verificar el token');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  controlHasError(control: string, error: string) {
    return this.resetForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    const newPassword = this.resetForm.get('password')?.value;
    
    this.passwordRecoveryService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.showSnackBar('Contraseña actualizada exitosamente');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error resetting password:', error);
        this.showSnackBar('Error al restablecer la contraseña. Por favor, intenta de nuevo.');
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}