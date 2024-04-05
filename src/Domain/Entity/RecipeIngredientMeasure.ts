export default class RecipeIngredientMeasure {
    constructor(
        public id: number | null,
        public unit: string,
        public amount: number
    ) {}
}
