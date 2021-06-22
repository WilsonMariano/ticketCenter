import { SaloonDataService } from './saloon-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare const Stepper;

@Component({
  selector: 'app-saloon-data',
  templateUrl: './saloon-data.component.html',
  styleUrls: ['./saloon-data.component.scss']
})
export class SaloonDataComponent implements OnInit {

  public stepper: any;
  public stepperNumber: number = 1;
  public typeOperation: string = 'nuevo';
  public formGroup: FormGroup;
  private arrLetters = ['A', 'B', 'C'];

  constructor(
    private route: ActivatedRoute,
    public saloonService: SaloonDataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('.bs-stepper'))

    this.formGroup = this.fb.group({
      height: ['', Validators.required],
      width: ['', Validators.required]
    });
  }

  public nextStepper(): void {
    this.stepperNumber += 1;
    this.stepper.next();

    if(this.stepperNumber === 3) {
      this.drawSeats();
    }
  }

  public previousStepper(): void {
    this.stepper.previous();
    this.stepperNumber -= 1;
  }

  public drawSeats(): void {
    const abcMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const enabledMap = "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"; 
    const height = parseInt(this.formGroup.get('height').value);
    const width = parseInt(this.formGroup.get('width').value);

    const seatConfig = [];

    for(let i = 0; i < height; i++) {
      const seat = {
        seat_label: abcMap[i],
        layout: enabledMap.slice(0, width)
      }
      seatConfig.push(seat);
    }
    console.log(seatConfig);
    this.saloonService.seatmap = [];
    this.saloonService.processSeatChart([{seat_map: seatConfig}]);


    // console.log(this.formGroup.getRawValue());
    // this.seatConfig = [
    //   {
    //     seat_map: [
    //       {
    //         seat_label: "A",
    //         layout: "g_____"
    //       },
    //       {
    //         seat_label: "2",
    //         layout: "gg__gg"
    //       },
    //       {
    //         seat_label: "3",
    //         layout: "gg__gg"
    //       },
    //       {
    //         seat_label: "4",
    //         layout: "gg__gg"
    //       },
    //       {
    //         seat_label: "5",
    //         layout: "gg__gg"
    //       },
    //       {
    //         seat_label: "6",
    //         layout: "gg__gg"
    //       },
    //       {
    //         seat_label: "7",
    //         layout: "gg__gg"
    //       },
    //       {
    //         seat_label: "8",
    //         layout: "gggggg"
    //       }
    //     ]
    //   }
    // ];
    // this.saloonService.seatmap = [];
    // this.saloonService.processSeatChart(this.seatConfig);
    // this.saloonService.blockSeats("7_1,7_2");
  }
}
