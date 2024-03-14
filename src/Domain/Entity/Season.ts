import Recipe from './Recipe';

export default class Season {
    private recipes: Recipe[] = [];

    constructor(
        private id: number,
        private name: string,
        private start_date: Date,
        private end_date: Date
    ) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getStartDate() {
        return this.start_date;
    }

    public getEndDate() {
        return this.end_date;
    }

    public getRecipes() {
        return this.recipes;
    }
}
