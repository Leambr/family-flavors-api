export default class User {
    constructor(
        public id: number | null,
        public email: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public roles: string[]
    ) {}
}
