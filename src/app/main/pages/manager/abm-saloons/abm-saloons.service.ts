import { TransactionService } from './../../../services/transactions.service';
import { Reservation } from './../../../classes/reservation';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
  })
  export class AbmSaloonsService {

    private transactions: Reservation[];

    constructor(
        private transactionService: TransactionService) {
            this.transactionService.getAll().subscribe(
                res => this.transactions = res
            );
    }

    // Verifico que no existan funciones pendientes para la sala recibida
    public verifyPendingShows(idSaloon: string): Promise<boolean> {
        return new Promise(resolve => {
            const transactionsSaloon = this.transactions.filter(t => t.movieShow.idSaloon === idSaloon);

            const filteredTransactions =  transactionsSaloon.filter(t => 
                moment(`${t.movieShow.date} ${t.movieShow.time}`, 'DD-MM-YYYY HH:mm').diff(moment()) > 0);

            if(filteredTransactions.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }

        });
    }
  }