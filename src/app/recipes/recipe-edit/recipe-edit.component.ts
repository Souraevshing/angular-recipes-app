import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeEditForm!: FormGroup;

  get recipeControls() {
    return (this.recipeEditForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //subscribing to activatedRoute params and get `id`, if id present then `editMode` is set to true
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      // If there is an id present and in editMode, then initialize the form with populated values
      this.initForm();
    });
  }

  handleSubmitRecipeEditForm() {
    // If in editMode, then update recipe; create if not in editMode
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeEditForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value);
    }
    this.handleCancel();
  }

  handleAddIngredients() {
    (this.recipeEditForm.get('ingredients') as FormArray).push(
      this.formBuilder.group({
        name: [null, Validators.required],
        amount: [
          null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
        ],
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeEditForm.get('ingredients') as FormArray).clear();
  }

  handleCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = this.formBuilder.array<FormGroup>([]); //creating ingredients array using FormBuilder

    //if in edit mode, fetch recipe by id and populate in the `recipeEditForm`
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.image;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        //if recipe has ingredients, iterate over all the ingredients and populate the form
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.formBuilder.group({
              name: [ingredient.name, Validators.required],
              amount: [
                ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
              ],
            })
          );
        }
      }
    }

    this.recipeEditForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      image: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients,
    });
  }
}
