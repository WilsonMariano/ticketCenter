import { Movie } from './movie.class';
import { Cinema } from './cinema.class';
import { MovieShow } from './movieShow.class';
import { Seat } from './seat.class';
export class Reservation {
   
    public id: string;
    public user: string;
    public movie: Movie;
    public movieShow: MovieShow;
    public cinema: Cinema;
    public saloonNumber: number;
    public price: number;
    public ticketQuantity: number;
    public totalAmount: number;
    public payMethod: string;
    public seats: Seat[];
    public state: IState;

    constructor() {
        this.movieShow = new MovieShow();
        this.cinema = new Cinema();
        this.movie = new Movie();
        this.state = IState.InProgress;

        //Mock
        this.seats = [
            {
                row: 'A',
                seat: 1
            },
            {
                row: 'A',
                seat: 2
            }
        ];
    }
}

export enum IState {
    InProgress = 'InProgress',
    Paid = 'Paid',
    Canceled = 'Canceled'
}