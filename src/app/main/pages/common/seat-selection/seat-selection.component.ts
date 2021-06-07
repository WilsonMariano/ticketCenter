import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cinema } from 'src/app/main/classes/cinema.class';
import { MovieShow } from 'src/app/main/classes/movieShow.class';
import { Saloon } from 'src/app/main/classes/saloon.class';
import { CinemasService } from 'src/app/main/services/cinemas.service';
import { FxGlobalsService } from 'src/app/main/services/fx-globals.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  public cinema: Cinema;
  private movieShow : MovieShow;
  public seatConfig: any = null;
  public seatmap = [];
  public seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };
  public cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };
  title = "seat-chart-generator";

  constructor(
    private route: ActivatedRoute,
    private cinemasService: CinemasService,
    private fxGlobalService: FxGlobalsService
  ){
  }

  ngOnInit(): void {
    //TODO: Remover funcion de cine hardcode
    this.movieShow = {
      id : "1623013541383",
      day : 4,
      idCinema : "1623011804458",
      idSaloon : "1623006476625",
      time : "22:00",
      type : "2D Subtitulada",
      bookedSeats : ["A_1", "B_2"]
    };
    // this.movieShow = JSON.parse(localStorage.getItem('movieShow'));

    this.getSaloonLayout(this.movieShow);
  }

  private getSaloonLayout(movieShow : MovieShow): void {
    this.fxGlobalService.showSpinner();
    this.cinemasService.getOne(movieShow.idCinema).subscribe(
      res => {
        this.cinema = res;
        const saloon : Saloon = this.cinema[0].saloons.find(s => s.id == movieShow.idSaloon);
        this.setLayout(saloon);
        this.processSeatChart(this.seatConfig);
        this.blockSeats(this.movieShow.bookedSeats);
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
          layout: saloon.layout[abc[i]].join()
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
        var row_label = "";
        var item_map = map_data[i].seat_map;

        //Get the label name and price
        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += " : $ " + map_data[i].seat_price;

        item_map.forEach(map_element => {
          var mapObj = {
            seatRowLabel: map_element.seat_label,
            seats: [],
            seatPricingInformation: row_label
          };
          row_label = "";
          var seatValArr = map_element.layout.split("");
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach(item => {
            var seatObj = {
              key: map_element.seat_label + "_" + totalItemCounter,
              price: map_data[i]["seat_price"],
              status: "available"
            };

            if (item != "_") {
              seatObj["seatLabel"] =
                map_element.seat_label + " " + seatNoCounter;
              if (seatNoCounter < 10) {
                seatObj["seatNo"] = "0" + seatNoCounter;
              } else {
                seatObj["seatNo"] = "" + seatNoCounter;
              }

              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });
          this.seatmap.push(mapObj);
        });
      }
    }
  }

  private blockSeats(seatsToBlockArr: string[]) {
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");

        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][
                parseInt(seatSplitArr[1]) - 1
              ] = seatObj;
              break;
            }
          }
        }
      }
  }

  public selectSeat(seatObject: any) {
    if (seatObject.status == "available") {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if ((seatObject.status = "booked")) {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
    }
  }
}
