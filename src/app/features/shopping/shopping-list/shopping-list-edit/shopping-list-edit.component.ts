import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../../../store/app.reducer';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm;
  editedItem: Ingredient;
  subscription: Subscription;
  editMode = false;

  constructor(
    private _store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this._store.select('shoppingList').subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        } else {
          this.editMode = false;
        }
      }
    )
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this._store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this._store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
    this._store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this._store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._store.dispatch(new ShoppingListActions.StopEdit());
  }
}
