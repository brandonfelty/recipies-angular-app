import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
  newRecipeAdded: Subject<Recipe[]> = new Subject();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      0,
      'test recipe',
      'this is a test recipe',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [
        new Ingredient('meat', 3),
        new Ingredient('tomatoes', 9),
    ]),
    new Recipe(
      1,
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

  getRecipe(id: number) {
    return this.recipes[id];
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.newRecipeAdded.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
    if (!newRecipe.id) {
      newRecipe.id = this.recipes.length;
    }
    this.recipes.push(newRecipe);
    this.newRecipeAdded.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.newRecipeAdded.next(this.recipes.slice());
  }

  addToShopping(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this.shoppingListService.addIngredient(ingredient);
    })
  }
}
