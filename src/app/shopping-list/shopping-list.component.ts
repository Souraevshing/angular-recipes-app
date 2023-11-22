import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private subscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getAllIngredients();
    //after getting all ingredients, getting list of ingredient added to list by subscribing to newIngredients
    this.subscription = this.shoppingListService.newIngredients.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  //assigning subscription to new variable and unsubscribe from it when component is destroyed
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleEditShoppingList(index: number): void {
    this.shoppingListService.isEditing.next(index);
  }
}
