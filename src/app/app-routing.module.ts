import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './features/recipe-book';
import { DefaultrecipeComponent } from './features/recipe-book/defaultrecipe/defaultrecipe.component';
import { RecipeEditComponent } from './features/recipe-book/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './features/recipe-book/recipes-resolver.service';
import { RecipiesComponent } from './features/recipe-book/recipes.component';
import { ShoppingListComponent } from './features/shopping';
import { PageErrorComponent } from './page-error/page-error.component';
import { AuthGuard } from './auth/auth.gaurd';

// define routes here
const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes',
    component: RecipiesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DefaultrecipeComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '404', component: PageErrorComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
