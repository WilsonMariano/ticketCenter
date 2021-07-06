import { TransactionService } from './../../../services/transactions.service';
import { Reservation } from './../../../classes/reservation';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
  })
  export class AbmCinemasService {

    private transactions: Reservation[];

    constructor(
        private transactionService: TransactionService) {
            this.transactionService.getAll().subscribe(
                res => this.transactions = res
            );
    }

    // Verifico que no existan funciones pendientes para el cinema recibido
    public verifyPendingShows(idCinema: string): Promise<boolean> {
        return new Promise(resolve => {
            const transactionsCinema = this.transactions.filter(t => t.cinema.id === idCinema);

            const filteredTransactions =  transactionsCinema.filter(t => 
                moment(`${t.movieShow.date} ${t.movieShow.time}`, 'DD-MM-YYYY HH:mm').diff(moment()) > 0);

            if(filteredTransactions.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }

        });
    }
  }