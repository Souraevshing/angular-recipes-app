import { Component } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { AuthService } from '../../auth/auth.service';
import { AuthComponent } from '../../auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private firbaseAuthService: FirebaseAuthService) {}

  handleSaveRecipes(): void {
    this.firbaseAuthService.saveAllRecipes();
  }

  handleFetchRecipes() {
    this.firbaseAuthService.getAllRecipes().subscribe();
  }

  signUpUser(): void {}
}
