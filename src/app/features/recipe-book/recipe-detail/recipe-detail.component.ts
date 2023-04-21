import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/Ingredient.model';

import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { map, switchMap } from 'rxjs/operators';
import * as ShoppingListActions from '../../shopping/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  private id: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(map(params => {
        return +params['id']
      }),
        switchMap(id => {
          this.id = id;
          return this._store.select('recipes');
        }),
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  addIngredient() {
    const ingredients: Ingredient[] = this.recipe.ingredients;
    this._store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  onDelete() {
    this._store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
