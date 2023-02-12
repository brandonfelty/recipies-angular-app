import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipiesService } from './recipies.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
  providers: [RecipiesService]
})
export class RecipiesComponent {
  selectedRecipe: Recipe;

  constructor(private recipesService: RecipiesService) {}

  ngOnInit() {
    this.recipesService.recipeSelected.
      subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
      })
  }
}
