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
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
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
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
