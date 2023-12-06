import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRootReducer from '../../store/app.root-reducer';
import { Router } from '@angular/router';
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

  handleLogOut(): void {
    this.router.navigate(['/auth']);
    localStorage.removeItem('_token')
    this.isUserAuthenticated = false;
    this.isLogOut = true;
  }
}
