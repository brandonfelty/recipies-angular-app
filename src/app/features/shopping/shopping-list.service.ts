import { Ingredient } from "src/app/shared/Ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {
  newIngredient = new Subject<Ingredient>();

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
