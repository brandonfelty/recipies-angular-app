import { EventEmitter } from '@angular/core';
import { Ingredient } from "src/app/shared/Ingredient.model";

export class ShoppingListService {
  newIngredient = new EventEmitter<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
