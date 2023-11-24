import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Curry',
      'fuck chicken',
      'https://images.unsplash.com/photo-1606471191009-63994c53433b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaWNrZW4lMjBjdXJyeXxlbnwwfHwwfHx8MA%3D%3D',
      [new Ingredient('Chicken', 10)]
    ),
    new Recipe(
      'Panyeer',
      'fuck panyeer',
      'https://media.istockphoto.com/id/1460543157/photo/fry-pepper-paneer.jpg?s=1024x1024&w=is&k=20&c=4mSkUwr3ZBD4UYmtzJ-BWN9zkMrxt17zYLulY34_9bY=',
      [new Ingredient('Panyeer', 5)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getAllRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  //getting recipe based on `id` passed as params inside the url
  getRecipeById(index: number): Recipe {
    return this.recipes[index];
  }

  //add ingredients to recipe
  addRecipeIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipeById(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
