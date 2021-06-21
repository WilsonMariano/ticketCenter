import { Saloon } from "./saloon.class";

export class Cinema {
    public id: string;
    public name: string;
    public address: string;
    public location: string;
    public phone: string;
    public lat: string;
    public lng: string;
    public schedule: string;
    public prices: any;
    public saloons?: Saloon[];
}