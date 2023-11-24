import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //subscribing to the id param from url everytime url changes and fetch the recipe
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  handleAddRecipeIngredients(): void {
    this.recipeService.addRecipeIngredientsToShoppingList(
      this.recipe.ingredients
    );
  }

  handleEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //we can do this way also,
    //here we are constructing the url by,
    //first going one level up `http://localhost:4200/recipes/`, then setting id inside url
    //the url becomes `http://localhost:4200/recipes/1`,
    //then setting `/edit` url becomes `http://localhost:4200/recipes/1/edit` and since it's relative to current route
    //the final url will be `http://localhost:4200/recipes/1/edit`
    //this.router.navigate(['../',this.id,'edit'], { relativeTo: this.route });
  }

  handleDeleteRecipe() {
    this.recipeService.deleteRecipeById(this.id);
    this.router.navigate(['/recipes']);
  }
}
