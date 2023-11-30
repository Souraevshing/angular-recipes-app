import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingEditForm!: FormGroup;
  subscription!: Subscription;
  editMode: boolean = false;
  currentlyEditedItem!: Ingredient;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    //initializing form
    this.shoppingEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    });

    //if user is in edit mode, then set `editMode` to true and set `editItemIndex` to current index of edited item
    //set `currentlyEditedItem` by index or id fetched from url params
    this.subscription = this.store.select('shoppingList').subscribe((state) => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.currentlyEditedItem = state.editedIngredient;
        this.shoppingEditForm.setValue({
          name: this.currentlyEditedItem.name,
          amount: this.currentlyEditedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  // Use this method to access form controls in your template
  get formControls() {
    return this.shoppingEditForm.controls;
  }

  handleAddIngredient(e: Event) {
    e.preventDefault();
    if (this.shoppingEditForm.valid) {
      const newIngredient = new Ingredient(
        this.shoppingEditForm.get('name')?.value,
        this.shoppingEditForm.get('amount')?.value
      );
      if (this.editMode) {
        //user is in edit mode currently, so update the existing ingredient
        this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
        );
      } else {
        //user is in create mode currently, so add the new ingredient
        this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient)
        );
      }
      this.editMode = false;
      this.shoppingEditForm.reset();
    }
  }

  handleResetForm(): void {
    this.shoppingEditForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  handleDeleteIngredient(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.shoppingEditForm.reset();
    this.editMode = false;
  }
}
