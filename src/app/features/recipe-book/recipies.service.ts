import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipiesService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'test recipe',
      'this is a test recipe',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [
        new Ingredient('meat', 3),
        new Ingredient('tomatoes', 9),
    ]),
    new Recipe(
      'test recipe 2',
      'this is a test recipe 2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [
        new Ingredient('corn', 10),
        new Ingredient('pasta', 10),
    ]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  addToShopping(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this.shoppingListService.addIngredient(ingredient);
    })
  }
}
