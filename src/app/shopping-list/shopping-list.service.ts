import { Ingredient } from '../recipes/shared/ingredient.model';

import { Subject } from 'rxjs/internal/Subject';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // instead of using for loop
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }

        // use ES6 spread operator
        this.ingredients.push(...ingredients);

        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
