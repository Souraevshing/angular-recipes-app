import { Component } from '@angular/core';
import { AuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  handleSaveRecipes(): void {
    this.authService.saveAllRecipes();
  }

  handleFetchRecipes() {
    this.authService.getAllRecipes().subscribe();
  }
}
