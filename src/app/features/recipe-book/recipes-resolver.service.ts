import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Recipe } from './recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private _store: Store<fromApp.AppState>,
    private _actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this._store.select('recipes')
      .pipe(
        take(1),
        map(recipeState => {
          return recipeState.recipes;
        }),
        switchMap((recipes: Recipe[]) => {
          if (recipes.length === 0) {
            this._store.dispatch(new RecipeActions.FetchRecipes());
            return this._actions$.pipe(
              ofType(RecipeActions.SET_RECIPES),
              take(1)
            );
          } else {
            return of(recipes);
          }
        })
      );
  }
}
