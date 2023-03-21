import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './features/recipe-book';
import { DefaultrecipeComponent } from './features/recipe-book/defaultrecipe/defaultrecipe.component';
import { RecipeEditComponent } from './features/recipe-book/recipe-edit/recipe-edit.component';
import { RecipiesComponent } from './features/recipe-book/recipes.component';
import { ShoppingListComponent } from './features/shopping';
import { PageErrorComponent } from './page-error/page-error.component';

// define routes here
const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipiesComponent, children: [
    { path: '', component: DefaultrecipeComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '404', component: PageErrorComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
