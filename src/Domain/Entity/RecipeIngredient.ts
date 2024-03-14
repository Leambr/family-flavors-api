export default class RecipeIngredient {
    constructor(
        private readonly recipeId: string,
        private readonly ingredientId: string,
        private readonly recipeIngredientMeasureId: string
    ) {}

    public getRecipeId(): string {
        return this.recipeId;
    }

    public getIngredientId(): string {
        return this.ingredientId;
    }

    public getRecipeIngredientMeasureId(): string {
        return this.recipeIngredientMeasureId;
    }
}
