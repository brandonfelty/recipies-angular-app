import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { Recipe } from "./recipe.model";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
@Injectable()
export class RecipesService {
  newRecipeAdded: Subject<Recipe[]> = new Subject();

  constructor(
    private _store: Store<fromApp.AppState>
  ) {}

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.newRecipeAdded.next(this.recipes.slice());
  }

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
    this._store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
}
