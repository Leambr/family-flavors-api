export default class User {
    constructor(
        private id: number | null,
        private email: string,
        private password: string,
        private firstname: string,
        private lastname: string,
        private roles: string[]
    ) {}

    public getId() {
        return this.id;
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public getFirstname() {
        return this.firstname;
    }

    public getLastname() {
        return this.lastname;
    }

    public getRoles() {
        return this.roles;
    }
}
