import { Component, OnInit } from '@angular/core';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../features/recipe-book/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  collapsed = true;
  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this._store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this._store.dispatch(new AuthActions.Logout());
  }

  onSaveData() {
    this._store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this._store.dispatch(new RecipeActions.FetchRecipes());
  }

}
