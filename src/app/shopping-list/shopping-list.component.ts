import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { Ingredient } from '../recipes/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    public ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();

        this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
            (ingredient: Ingredient[]) => {
                this.ingredients = ingredient;
            },
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
