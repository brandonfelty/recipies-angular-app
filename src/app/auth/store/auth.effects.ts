import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import * as AuthActions from './auth.actions';
import { environment } from "src/environments/environment.development";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const _handleAuthentication = (expiresIn, email, localId, idToken) => {
  const expirationDate = new Date(
    new Date().getTime() + +expiresIn * 1000
  );
  const user = new User(
    email,
    localId,
    idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expirationDate: expirationDate,
    redirect: true
  });
}

const _handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

  authLogout = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        this._authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
      })
    ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return;
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this._authService.setLogoutTimer(expirationDuration);

          return (
            new AuthActions.AuthenticateSuccess({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate),
              redirect: false
            })
          );
        }
        return { type: 'DUMMY' }
      }
      )
    )
  );

  authSignup = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((authData: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.FIREBASE_KEY,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }
          )
          .pipe(
            tap(resData => {
              this._authService.setLogoutTimer(+resData.expiresIn * 1000 );
            }),
            map(resData => {
              return _handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return _handleError(errorRes);
            })
          );
      })
    )
  )

  authLogin = createEffect(() =>
  this._actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.FIREBASE_KEY,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this._authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return _handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return _handleError(errorRes);
          })
        );
    })
  )
 )

  authRedirect = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
      tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
        if (authSuccessAction.payload.redirect) {
          this.router.navigate(['/']);
        }
      })
    ),
    { dispatch: false }
  );

 constructor(
  private _actions$: Actions,
  private http: HttpClient,
  private router: Router,
  private _authService: AuthService
) {}
}
