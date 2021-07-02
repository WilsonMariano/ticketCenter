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
    public endDate: string;
    public movieShows: MovieShow[];
}