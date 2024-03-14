export default class Ingredient {
    constructor(private id: number, private name: string) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }
}
