import Recipe from './Recipe';

export default class DishType {
    private recipes: Recipe[] = [];

    constructor(private id: number, private name: string) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getRecipes() {
        return this.recipes;
    }
}
