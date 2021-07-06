import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cinema } from 'src/app/main/classes/cinema.class';
import { MovieShow } from 'src/app/main/classes/movieShow.class';
import { Saloon } from 'src/app/main/classes/saloon.class';
import { CinemasService } from 'src/app/main/services/cinemas.service';
import { DataService } from 'src/app/main/services/data.service';
import { FxGlobalsService } from 'src/app/main/services/fx-globals.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {

  public countDown: string;
  public cinema: Cinema;
  private movieShow: MovieShow;
  public seatConfig: any = null;
  public seatmap = [];
  public seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: false,
    newSeatNoForRow: true
  };
  public cart = {
    selectedSeats: [],
    seatstoStore: [],
  };
  title = "seat-chart-generator";

  constructor(
    private router: Router,
    private cinemasService: CinemasService,
    private fxGlobalService: FxGlobalsService,
    public dataService: DataService
  ){
  }

  ngOnInit(): void {

    if(!this.dataService.reservation) {
      this.router.navigate(['home']);
    } else {
      this.dataService.reservation.seats = [];
      this.movieShow = this.dataService.reservation.movieShow;
      this.getSaloonLayout(this.movieShow);
    }
  }

  private getSaloonLayout(movieShow : MovieShow): void {
    this.fxGlobalService.showSpinner();
    this.cinemasService.getOne(movieShow.idCinema).subscribe(
      res => {
        this.cinema = res;
        const saloon : Saloon = this.cinema[0].saloons.find(s => s.id == movieShow.idSaloon);
        this.setLayout(saloon);
        this.processSeatChart(this.seatConfig);
        this.blockSeats(movieShow.bookedSeats);
        this.fxGlobalService.hideSpinner();
      });
  }

  private setLayout(saloon: Saloon){
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let seatsArray = [];
    for(let i=0; i < Object.keys(saloon.layout).length; i++){       
      seatsArray.push(
        { 
          seat_label: abc[i],
          layout: saloon.layout[abc[i]].join('')
        }
      );
    }
    this.seatConfig = [
      {
        seat_price: 250,  //TODO: ver si podemos sacar esto
        seat_map: seatsArray
      }
    ];
  }

  private processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;

      for (let i = 0; i < map_data.length; i++) {
        var item_map = map_data[i].seat_map;

        item_map.forEach(map_element => {
          var mapObj = {
            seatRowLabel: map_element.seat_label,
            seats: []
          };

          var seatValArr = map_element.layout.split("");
          if (this.seatChartConfig.newSeatNoForRow) seatNoCounter = 1;  
          var totalItemCounter = 1;

          seatValArr.forEach(item => {
            var seatObj = {
              key: map_element.seat_label + "_" + totalItemCounter,
              status: "available"
            };

            if (item != "_") {
              seatObj["seatLabel"] =  map_element.seat_label + seatNoCounter;
              seatObj["seatNo"] = seatNoCounter < 10 ? "0" + seatNoCounter : seatNoCounter;
              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter ++;
            mapObj["seats"].push(seatObj);
          });
          this.seatmap.push(mapObj);
        });
      }
    }
  }

  public blockSeats(seatsToBlockArr: string[]) {
    if (seatsToBlockArr.length > 0) {
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");

        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              break;
            }
          }
        }
      }
    }
  }

  public selectSeat(seatObject: any) {
    if(this.cart.selectedSeats.length == this.dataService.reservation.ticketQuantity && seatObject.status == "available"){
      this.fxGlobalService.showToast("seatsToast");
    } else if (seatObject.status == "available") {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
    } else if ((seatObject.status = "booked")) {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
      }
    }
    this.dataService.reservation.seats = this.cart.seatstoStore;
  }

}
