import { Cinema } from './cinema.class';
import { MovieShow } from './movieShow.class';
export class Reservation {
   
    public id: string;
    public user: string;
    public movieShow: MovieShow;
    public cinema: Cinema;
    public title: string;
    public saloonNumber: number;
    public price: number;
    public ticketQuantity: number;
    public totalAmount: number;
    public payMethod: string;
    public seats: string[];

    constructor(){
        this.movieShow = new MovieShow();
        this.cinema = new Cinema();
    }

}