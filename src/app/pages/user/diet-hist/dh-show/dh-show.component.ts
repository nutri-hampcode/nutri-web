import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { UserDietHistService } from '../../../../core/services/user-diet-hist.service.service';
import { AuthService } from '../../../../core/services/auth.service';
import { UserDietHistResponse } from '../../../../shared/models/user-diet-history-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dh-show',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dh-show.component.html',
  styleUrl: './dh-show.component.css'
})
export class DhShowComponent {
  private userDietHistService = inject(UserDietHistService);
  private authService = inject(AuthService);
  private snackbar = inject(MatSnackBar);

  dietHist!: UserDietHistResponse;
  currentPage: number = 0;
  isHistoryVisible: boolean = false;

  ngOnInit() {
    this.loadDietHist(this.currentPage);
  }

  loadDietHist(page: number){
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if(userId){
      this.userDietHistService.getUserDietHist(userId, page).subscribe({
        next: (data) => {
          this.dietHist = data;
          console.log(data);
        },
        error: (error) => {
          this.showSnackBar('Error loading diet history');
          console.error(error);
        }
      });
    }
  }

  nextPage() {
    if (this.dietHist.number < this.dietHist.totalPages - 1) {
      this.currentPage++;
      this.loadDietHist(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadDietHist(this.currentPage);
    }
  }

  private showSnackBar(message:string): void{
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}

