export interface UserBody {
    id?: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    roles?: string[];
}
