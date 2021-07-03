export class MovieShow {
    public id: string;
    public day: number;
    public date?: string;
    public idSaloon: string;
    public idCinema: string;
    public idMovie: string;
    public time: string;
    public type: string;
    public bookedSeats: string[];
    public remainingSeats?: number;
    public delete: boolean;

    constructor() {
        this.delete = false;
    }
}