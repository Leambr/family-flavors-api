import Recipe from './Recipe';

export default class DishType {
    private recipes: Recipe[] = [];

    constructor(private id: number | null, private name: string) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getRecipes() {
        return this.recipes;
    }

    public addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
    }

    // Supprime une recette de la liste
    public removeRecipe(recipeId: number): void {
        this.recipes = this.recipes.filter((recipe) => recipe.getId() !== recipeId);
    }
}
