import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { AuthService } from '../../auth/auth.service';
import { AuthComponent } from '../../auth/auth.component';
import { Subscription } from 'rxjs';
import { userInfo } from 'os';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated: boolean = false;
  isLogOut: boolean = false;
  private subscription!: Subscription;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //subscribing to user and if user is logged in, setting isUserAuthenticated to true or false otherwise
    this.subscription = this.authService.user.subscribe((user) => {
      this.isUserAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleSaveRecipes(): void {
    if (this.isUserAuthenticated) {
      this.firebaseAuthService.saveAllRecipes().subscribe();
    }
  }

  handleFetchRecipes(): void {
    if (this.isUserAuthenticated) {
      this.firebaseAuthService.getAllRecipes().subscribe();
    }
  }

  handleLogOut(): void {
    this.isUserAuthenticated = false;
    this.authService.logOutUser();
    this.isLogOut = true;
  }
}
