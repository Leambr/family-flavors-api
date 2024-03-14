import DishType from './DishType';
import Season from './Season';

export default class Recipe {
    constructor(
        private id: string,
        private title: string,
        private diet_type: string,
        private serving: number,
        private prep_time: number,
        private cook_time: number,
        private instruction: string,
        private image_url: string,
        private season: Season,
        private dish_type: DishType
    ) {}

    public getId() {
        return this.id;
    }

    public getTitle() {
        return this.title;
    }

    public getDietType() {
        return this.diet_type;
    }

    public getServing() {
        return this.serving;
    }

    public getPrepTime() {
        return this.prep_time;
    }

    public getCookTime() {
        return this.cook_time;
    }

    public getInstructions() {
        return this.instruction;
    }

    public getImageUrl() {
        return this.image_url;
    }

    public getSeason() {
        return this.season;
    }

    public getDishType() {
        return this.dish_type;
    }
}
