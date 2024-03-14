export default class RecipeIngredientMeasure {
    constructor(private id: number, private unit: string, private amount: number) {}

    public getId() {
        return this.id;
    }

    public getUnit() {
        return this.unit;
    }

    public getAmount() {
        return this.amount;
    }
}
