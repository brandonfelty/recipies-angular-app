import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  private newIngredient: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  addNewIngredient() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    this.shoppingListService.newIngredient
      .next(new Ingredient(
        ingName,
        +ingAmount
      ))
  }

}
