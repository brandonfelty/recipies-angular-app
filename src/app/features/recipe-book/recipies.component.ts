import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent {
  focussedRecipe: Recipe;

  handleShowDetails(recipe: Recipe) {
    this.focussedRecipe = recipe;
  }

}
