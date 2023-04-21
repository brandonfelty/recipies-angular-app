import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public index: number;
  private editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _store: Store<fromApp.AppState>,
  ) {};

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.index = +params['id'];
        this.editMode = params['id'] !== undefined;
        this.initForm();
    })
  }

  onSubmit() {
    const newRecipe: Recipe = this.recipeForm.value;

    if (this.editMode) {
      this._store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.index,
        updatedRecipe: newRecipe
      }));
    } else {
      this._store.dispatch(new RecipeActions.AddRecipe(newRecipe));
    }

    this.onCancel();
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this._store.select('recipes')
        .pipe(map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.index;
          });
        }))
        .subscribe(recipe => {

          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;

          if(recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount,
                    [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              )
            }
          }
        })
      }

      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
      });
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
