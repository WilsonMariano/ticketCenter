import { Reservation } from './../classes/reservation';
import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public generatePdf(transaction: Reservation, qr: any): void {
    const doc = new jsPDF('p', 'mm', [110, 140]);

    doc.text(transaction.movie.title, 10, 10);
    doc.text(transaction.movieShow.type, 10, 20);
    doc.text('Cine: ' + transaction.cinema.name, 10, 30);
    doc.text('Fecha y hora: ' + transaction.movieShow.date +' '+ transaction.movieShow.time, 10, 40);
    doc.text('Sala: ' + transaction.saloonNumber.toString(), 10, 50);
    doc.text('Código de Retiro: ' + transaction.id.toString(), 10, 60);
    doc.addImage(qr, 'png', 35, 70, 40, 40);

    doc.save("entradas.pdf");
  }
}
