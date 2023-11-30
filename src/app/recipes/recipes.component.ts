import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../shared/firebase-auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  constructor(private firebaseAuthService: FirebaseAuthService) {}

  //if recipes is not there, then it will load recipes automatically from firebase for `/recipes` route
  ngOnInit(): void {
    this.firebaseAuthService.getAllRecipes().subscribe();
  }
}
