import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipiesService } from '../../recipies.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  // @Output() viewDetails = new EventEmitter<void>();

  constructor(private recipeService: RecipiesService, private activeRoute: ActivatedRoute, private router: Router) {}

  showRecipeDetails() {
    // this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate(['recipes', this.recipe.id])
  }
}
