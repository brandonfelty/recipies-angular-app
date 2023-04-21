import * as fromShoppingList from '../features/shopping/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipe from '../features/recipe-book/store/recipe.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  recipes: fromRecipe.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  recipes: fromRecipe.recipeReducer,
  auth: fromAuth.authReducer
};
