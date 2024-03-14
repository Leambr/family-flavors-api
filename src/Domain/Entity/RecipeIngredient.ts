export default class RecipeIngredient {
    constructor(
        private readonly recipeId: number,
        private readonly ingredientId: number,
        private readonly recipeIngredientMeasureId: number
    ) {}

    public getRecipeId() {
        return this.recipeId;
    }

    public getIngredientId() {
        return this.ingredientId;
    }

    public getRecipeIngredientMeasureId() {
        return this.recipeIngredientMeasureId;
    }
}
