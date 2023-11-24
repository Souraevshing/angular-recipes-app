import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingListForm!: FormGroup;
  subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  currentlyEditedItem!: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //initializing form
    this.shoppingListForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    });

    //if user is in edit mode, then set `editMode` to true and set `editItemIndex` to current index of edited item
    //set `currentlyEditedItem` by index or id fetched from url params
    this.subscription = this.shoppingListService.isEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.currentlyEditedItem =
          this.shoppingListService.getIngredientById(index);
        this.shoppingListForm.setValue({
          name: this.currentlyEditedItem.name,
          amount: this.currentlyEditedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Use this method to access form controls in your template
  get formControls() {
    return this.shoppingListForm.controls;
  }

  handleAddIngredient(e: Event) {
    e.preventDefault();
    if (this.shoppingListForm.valid) {
      const newIngredient = new Ingredient(
        this.shoppingListForm.get('name')?.value,
        this.shoppingListForm.get('amount')?.value
      );
      if (this.editMode) {
        //user is in edit mode currently, so update the existing ingredient
        this.shoppingListService.updateIngredientToShoppingList(
          this.editedItemIndex,
          newIngredient
        );
      } else {
        ////user is in create mode currently, so add the new ingredient
        this.shoppingListService.addIngredient(newIngredient);
      }
      this.editMode = false;
      this.shoppingListForm.reset();
    }
  }

  handleResetForm(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  handleDeleteIngredient(): void {
    this.shoppingListService.deleteIngredientFromShoppingList(
      this.editedItemIndex
    );
    this.shoppingListForm.reset();
    this.editMode = false;
  }
}
