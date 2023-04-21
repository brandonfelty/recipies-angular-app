import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipies-angular-app';

  constructor(
    private _store: Store<fromApp.AppState>,
    private _loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this._store.dispatch(new AuthActions.AutoLogin());
    this._loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
