import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// define routes here
const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren:
      () =>
        import('./features/recipe-book/recipes.module')
        .then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren:
      () =>
        import('./features/shopping/shopping.module')
        .then(m => m.ShoppingModule)
  },
  {
    path: 'auth',
    loadChildren:
      () =>
        import('./auth/auth.module')
        .then(m => m.AuthModule)
  }
  // ,
  // { path: '404', component: PageErrorComponent},
  // { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
