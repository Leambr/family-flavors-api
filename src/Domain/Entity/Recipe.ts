import DishType from './DishType';
import Season from './Season';

export default class Recipe {
    constructor(
        private id: number | null,
        private title: string,
        private dietType: string,
        private serving: number,
        private prepTime: number,
        private cookTime: number,
        private instruction: string,
        private imageUrl: string,
        private seasonId: number,
        private dishTypeId: number
    ) {}

    public getId() {
        return this.id;
    }

    public getTitle() {
        return this.title;
    }

    public getDietType() {
        return this.dietType;
    }

    public getServing() {
        return this.serving;
    }

    public getPrepTime() {
        return this.prepTime;
    }

    public getCookTime() {
        return this.cookTime;
    }

    public getInstructions() {
        return this.instruction;
    }

    public getImageUrl() {
        return this.imageUrl;
    }

    public getSeasonId() {
        return this.seasonId;
    }

    public getDishTypeId() {
        return this.dishTypeId;
    }
}
