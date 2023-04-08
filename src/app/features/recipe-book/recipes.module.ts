import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipiesComponent } from "./recipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipiesComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    //CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    // HttpClientModule,
    // AppRoutingModule,
    // RecipesModule
    SharedModule
  ],
  // exports: [
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeListComponent,
  //   RecipiesComponent,
  //   RecipeEditComponent,
  // ]
})
export class RecipesModule {}
