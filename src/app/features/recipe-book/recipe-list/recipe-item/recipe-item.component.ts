import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipiesService } from '../../recipies.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() viewDetails = new EventEmitter<void>();

  constructor(private recipeService: RecipiesService) {}

  showRecipeDetails() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
