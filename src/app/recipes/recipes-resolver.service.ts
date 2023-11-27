import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { FirebaseAuthService } from '../shared/firebase-auth.service';
import { RecipeService } from './recipe.service';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<any> {
  constructor(
    private authService: FirebaseAuthService,
    private recipeService: RecipeService,
    private toastService: ToastService
  ) {}

  //getting the data before we reload the page on routes `/edit` and `/edit/:id` to prevent any error
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const recipes = this.recipeService.getAllRecipes();
    //if recipes are not present then only fetch the recipes, else return recipes array in order to prevent excess load on server
    if (recipes.length === 0) {
      this.toastService.showError('Error!', 'No recipes');
      return this.authService.getAllRecipes();
    } else {
      this.toastService.showSuccess('Success!', 'Recipes loaded');
      return recipes;
    }
  }
}
