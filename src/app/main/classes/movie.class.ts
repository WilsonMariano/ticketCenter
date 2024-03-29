import { Cinema } from './cinema.class';
import { MovieShow } from './movieShow.class';

export class Movie {
    public id: string;
    public title: string;
    public director: string;
    public poster: string;
    public backdrop: string;
    public overview: string;
    public runtime: number;
    public cast: string[];
    public trailer: string;
    public startDate: string;
    public endDate: string;
    public movieShows: MovieShow[];
    public cinemas: string[];
    public inCarousel?: boolean;
}