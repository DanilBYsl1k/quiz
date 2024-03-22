import { Component, Signal, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  localStorage = signal(localStorage.getItem('token'));
  
  constructor(private authService: AuthService){}

  removeItem(): void {
    this.localStorage.set(localStorage.getItem('token'));
    this.authService.logout();
  }
}
