import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipeDetailComponent, RecipeItemComponent, RecipeListComponent } from './features/recipe-book';
import { ShoppingListComponent, ShoppingListEditComponent } from './features/shopping/';
import { HeaderComponent } from './header/header.component';
import { RecipiesComponent } from './features/recipe-book/recipies.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './features/shopping/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { DefaultrecipeComponent } from './features/recipe-book/defaultrecipe/defaultrecipe.component';
import { RecipeEditComponent } from './features/recipe-book/recipe-edit/recipe-edit.component';
import { PageErrorComponent } from './page-error/page-error.component';


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
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
