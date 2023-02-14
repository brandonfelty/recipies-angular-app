import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/Ingredient.model';

import { Recipe } from '../recipe.model';
import { RecipiesService } from '../recipies.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  private id: number;

  constructor(private recipiesService: RecipiesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipiesService.getRecipe(this.id)
    });
  }

  addIngredient() {
    const ingredients: Ingredient[] = this.recipe.ingredients;
    this.recipiesService.addToShopping(ingredients);
  }
}
