import { SaloonDataService } from './saloon-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saloon-data',
  templateUrl: './saloon-data.component.html',
  styleUrls: ['./saloon-data.component.scss']
})
export class SaloonDataComponent implements OnInit {

  public typeOperation: string = 'nuevo';
  public formGroup: FormGroup;
  public seatConfig: any = null;
  private arrLetters = ['A', 'B', 'C'];

  constructor(
    private route: ActivatedRoute,
    public saloonService: SaloonDataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      height: ['', Validators.required],
      width: ['', Validators.required]
    });
  }

  public drawSeats(): void {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    console.log(this.formGroup.getRawValue());
    this.seatConfig = [
      {
        seat_map: [
          {
            seat_label: "A",
            layout: "g_____"
          },
          {
            seat_label: "2",
            layout: "gg__gg"
          },
          {
            seat_label: "3",
            layout: "gg__gg"
          },
          {
            seat_label: "4",
            layout: "gg__gg"
          },
          {
            seat_label: "5",
            layout: "gg__gg"
          },
          {
            seat_label: "6",
            layout: "gg__gg"
          },
          {
            seat_label: "7",
            layout: "gg__gg"
          },
          {
            seat_label: "8",
            layout: "gggggg"
          }
        ]
      }
    ];
    this.saloonService.seatmap = [];
    this.saloonService.processSeatChart(this.seatConfig);
    this.saloonService.blockSeats("7_1,7_2");
  }
}
