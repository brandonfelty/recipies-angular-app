import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipeDetailComponent, RecipeItemComponent, RecipeListComponent } from './features/recipe-book';
import { ShoppingListComponent, ShoppingListEditComponent } from './features/shopping/';
import { HeaderComponent } from './header/header.component';
import { RecipiesComponent } from './features/recipe-book/recipies.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
