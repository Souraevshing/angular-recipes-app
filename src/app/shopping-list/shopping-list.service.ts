import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private toastService: ToastService) {}

  //add new ingredients and emit event to be able to see it on view-container
  newIngredients = new Subject<Ingredient[]>();
  isEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Chicken', 5),
    new Ingredient('Panyeer', 10),
  ];

  getAllIngredients(): Ingredient[] {
    this.toastService.showSuccess('Success!', 'Ingredients loaded');
    return this.ingredients.slice();
  }

  getIngredientById(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.newIngredients.next(this.ingredients.slice());
    this.toastService.showSuccess('Success!', 'Ingredient added');
  }

  //adding ingredients to recipe and emitting it to shopping-list
  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.newIngredients.next(this.ingredients.slice());
    this.toastService.showSuccess(
      'Success!',
      'Ingredients added to shopping list'
    );
  }

  //updates the ingredient at specified index and subscribe to give new ingredients
  updateIngredientToShoppingList(
    index: number,
    updatedIngredient: Ingredient
  ): void {
    this.ingredients[index] = updatedIngredient;
    this.newIngredients.next(this.ingredients.slice());
    this.toastService.showSuccess('Success!', 'Ingredient updated');
  }

  //delete the ingredient at specified index and subscribe to give updated ingredients
  deleteIngredientFromShoppingList(index: number): void {
    this.ingredients.splice(index, 1);
    this.newIngredients.next(this.ingredients.slice());
    this.toastService.showSuccess('Success!', 'Ingredient deleted');
  }
}
