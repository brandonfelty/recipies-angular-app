import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];
  newIngredient: Subscription;

  constructor (private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.newIngredient = this.shoppingListService.newIngredient
      .subscribe((newIngredient) => {
        this.shoppingListService.addIngredient(newIngredient);
        this.ingredients = this.shoppingListService.getIngredients();
      })
  }

  ngOnDestroy(): void {
    this.newIngredient.unsubscribe();
  }
}
