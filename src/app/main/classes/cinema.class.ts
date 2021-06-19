import { Saloon } from "./saloon.class";

export class Cinema {
    public id: number;
    public name: string;
    public address: string;
    public lat: string;
    public lng: string;
    public schedule: string;
    public prices: number[];
    public saloons: Saloon[];
}