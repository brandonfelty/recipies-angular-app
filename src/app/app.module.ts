import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipeDetailComponent, RecipeItemComponent, RecipeListComponent } from './features/recipe-book';
import { ShoppingListComponent, ShoppingListEditComponent } from './features/shopping/';
import { HeaderComponent } from './header/header.component';
import { RecipiesComponent } from './features/recipe-book/recipes.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './features/shopping/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { DefaultrecipeComponent } from './features/recipe-book/defaultrecipe/defaultrecipe.component';
import { RecipeEditComponent } from './features/recipe-book/recipe-edit/recipe-edit.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { RecipesService } from './features/recipe-book/recipes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipiesComponent,
    DropdownDirective,
    DefaultrecipeComponent,
    RecipeEditComponent,
    PageErrorComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipesService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
