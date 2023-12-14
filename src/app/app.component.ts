import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootReducer from './store/app.root-reducer';
import * as AuthActions from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromRootReducer.AppState>) {}
  /**
   * @deprecated implemented redux, therefore now not using it
   */
  //currentComponent: string = 'recipe';

  // handleNavigate(path: string): void {
  //   this.currentComponent = path;
  // }

  //login the user automatically if exists
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
