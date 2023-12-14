import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  handleEditShoppingList(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
