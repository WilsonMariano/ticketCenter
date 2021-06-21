export class User {
    public uid: string;
    public name: string;
    public surname: string;
    public email: string;
    public password: string;
    public document: number;
    public preferenceCinema: number;
    public role: ERole;
}

export enum ERole {
    client = 'client',
    admin = 'admin',
    manager = 'manager',
    anonymus = 'anonymus'
}