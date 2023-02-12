import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';

import { Recipe } from '../recipe.model';
import { RecipiesService } from '../recipies.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipiesService: RecipiesService) {}

  addIngredient() {
    const ingredients: Ingredient[] = this.recipe.ingredients;
    this.recipiesService.addToShopping(ingredients);
  }
}
