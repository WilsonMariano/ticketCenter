export class User {
    public uid: string;
    public name: string;
    public surname: string;
    public email: string;
    public password: string;
    public document: number;
    public preferenceCinema: number;
    public role: ERole;
    public idCinema?: string;
}

export enum ERole {
    Cliente = 'client',
    Administrador = 'admin',
    Encargado = 'manager',
    Anónimo = 'anonymus',
    Acomodador = 'attendant'
}