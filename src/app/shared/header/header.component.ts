import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { FirebaseAuthService } from '../firebase-auth.service';
import { ToastService } from '../toast.service';

import * as fromRootReducer from '../../store/app.root-reducer';
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
    private toastService: ToastService,
    private store: Store<fromRootReducer.AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    //subscribing to user and if user is logged in, setting isUserAuthenticated to true or false otherwise
    this.subscription = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
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
    this.firebaseAuthService.getAllRecipes().subscribe();
  }

  handleLogOut(): void {
    this.router.navigate(['/auth']);
    localStorage.removeItem('_token');
    this.toastService.showInfo('See you again', 'Logged out successfully');
    this.isUserAuthenticated = false;
    this.isLogOut = true;
  }
}
