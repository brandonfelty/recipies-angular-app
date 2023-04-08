import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipies-angular-app';

  constructor(private _authService: AuthService, private _loggingService: LoggingService) {}

  ngOnInit(): void {
    this._authService.autoLogin();
    this._loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
