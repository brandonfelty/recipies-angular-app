import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @Output() newIngredient = new EventEmitter<Ingredient>();

  addNewIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    this.newIngredient.emit(new Ingredient(nameInput.value, Number(amountInput.value)));
  }

}
