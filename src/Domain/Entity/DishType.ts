export default class DishType {
    constructor(
        private id: number | null,
        private name: string
    ) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }
}
