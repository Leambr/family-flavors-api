export default class Season {
    constructor(
        private id: number | null,
        private name: string,
        private startDate: Date,
        private endDate: Date
    ) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getStartDate() {
        return this.startDate;
    }

    public getEndDate() {
        return this.endDate;
    }
}
