import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { LoggingService } from 'src/app/logging.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs-compat';
import * as fromApp from '../../../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients$: Observable<{ ingredients: Ingredient[] }>;

  constructor (
    private _loggingService: LoggingService,
    private _store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients$ = this._store.select('shoppingList');

    this._loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index: number) {
    this._store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
  }

}
