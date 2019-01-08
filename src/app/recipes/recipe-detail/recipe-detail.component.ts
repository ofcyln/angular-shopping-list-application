import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
    @Input()
    recipe: Recipe;
    id: number;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<{
            shoppingList: {
                ingredients: Ingredient[];
            };
        }>,
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];

            this.recipe = this.recipeService.getRecipe(this.id);
        });
    }

    addToShoppingList() {
        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));

        this.router.navigate(['shopping-list']);
    }

    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
        // same
        // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);

        this.router.navigate(['/recipes']);
    }
}
