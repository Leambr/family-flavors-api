export default class Recipe {
    constructor(
        public id: number | null,
        public title: string,
        public dietType: string,
        public serving: number,
        public prepTime: number,
        public cookTime: number,
        public instruction: string,
        public imageUrl: string,
        public seasonId: number,
        public dishTypeId: number
    ) {}
}
