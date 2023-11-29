import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { AuthService } from '../../auth/auth.service';
import { AuthComponent } from '../../auth/auth.component';
import { Subscription } from 'rxjs';
import { userInfo } from 'os';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated: boolean = false;
  isLogOut: boolean = false;
  private subscription!: Subscription;

  constructor(
    private firbaseAuthService: FirebaseAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //subscribing to user and if user is logged in, setting isUserAuthenticated to true or false otherwise
    this.subscription = this.authService.user.subscribe((isUserLogIn) => {
      this.isUserAuthenticated = !!isUserLogIn;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleSaveRecipes(): void {
    if (this.isUserAuthenticated) this.firbaseAuthService.saveAllRecipes();
  }

  handleFetchRecipes(): void {
    if (this.isUserAuthenticated)
      this.firbaseAuthService.getAllRecipes().subscribe();
  }

  handleLogOut(): void {
    this.isUserAuthenticated = false;
    this.authService.logOutUser();
    this.isLogOut = true;
  }
}
