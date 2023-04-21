import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Injectable()
export class RecipeEffects {

  fetchRecipes =
    createEffect(() => {
      return this._actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
          return this.httpClient
            .get<Recipe[]>(
              'https://recipes-angular-app-default-rtdb.firebaseio.com/recipes.json'
            )
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          })}
        ),
        map(recipes => {
          return new RecipeActions.SetRecipes(recipes);
        })
      )
    })

  storeRecipes = createEffect(() => {
    return this._actions$.pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this._store.select('recipes')),
      switchMap(([action, recipeState]) => {
        console.log(recipeState.recipes)
        return this.httpClient.put(
          'https://recipes-angular-app-default-rtdb.firebaseio.com/recipes.json',
          recipeState.recipes
        );
      })
    )}, {dispatch: false}
  )

  constructor(
    private _actions$: Actions,
    private httpClient: HttpClient,
    private _store: Store<fromApp.AppState>
  ) {}
}
