import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  isProfileMenuVisible = false;
  isNavbarCollapsed = true;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/auth/login']);
  }

  toggleProfileMenu() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

}
