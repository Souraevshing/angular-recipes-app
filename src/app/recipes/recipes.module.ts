import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';
import { RecipesRoutingModule } from './recipes-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    SelectRecipeComponent,
    RecipeEditComponent,
  ],
})
export class RecipesModule {}
