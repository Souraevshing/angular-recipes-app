import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //getting id from url params, and if id exist then we are in editMode
    //if id exist then setting editMode to true by checking if params is not null
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
  }
}
