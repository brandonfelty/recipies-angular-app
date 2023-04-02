import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../features/recipe-book/recipes.service';
import { Recipe } from '../features/recipe-book/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipesService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(
      'https://recipes-angular-app-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(
      'https://recipes-angular-app-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          })}
        ),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
