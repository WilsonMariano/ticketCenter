import { Cinema } from 'src/app/main/classes/cinema.class';
import { EIcon, FxGlobalsService } from './../../../services/fx-globals.service';
import { Saloon } from 'src/app/main/classes/saloon.class';
import { AuthService } from './../../../services/auth.service';
import { CinemasService } from 'src/app/main/services/cinemas.service';
import { SaloonDataService } from './saloon-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare const Stepper;

@Component({
  selector: 'app-saloon-data',
  templateUrl: './saloon-data.component.html',
  styleUrls: ['./saloon-data.component.scss']
})
export class SaloonDataComponent implements OnInit {

  public typeOperation: string;
  private cinemaEdit: Cinema;
  private saloonEdit: Saloon;

  public stepper: any;
  public stepperNumber: number = 1;
  public formGroupData: FormGroup;
  public formGroupSize: FormGroup;
  private seatConfig = [];  

  private abcMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor(
    public saloonService: SaloonDataService,
    public cinemaService: CinemasService,
    private authService: AuthService,
    private fxService: FxGlobalsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('.bs-stepper'));

    this.formGroupData = this.fb.group({
      id: [''],
      floor: ['1', Validators.required],
      number: ['1', Validators.required],
      type: ['2D', Validators.required]
    });

    this.formGroupSize = this.fb.group({
      height: ['10', [Validators.required, Validators.min(1), Validators.max(33)]],
      width: ['10', [Validators.required, Validators.min(1), Validators.max(33)]]
    });

    this.typeOperation = this.route.snapshot.paramMap.get('id');

    this.getCinema();
  }

  private getCinema(): void {
    this.cinemaService.getOne(this.authService.getUserData().idCinema).subscribe(
      res => {
        this.cinemaEdit = res[0];

        if(this.typeOperation !== 'nuevo') {
          this.saloonEdit = this.cinemaEdit.saloons.find(e => e.id === this.typeOperation);
    
    
          this.formGroupData.get('floor').setValue(this.saloonEdit.floor);
          this.formGroupData.get('number').setValue(this.saloonEdit.number);
          this.formGroupData.get('type').setValue(this.saloonEdit.type);
          this.formGroupSize.get('height').setValue(this.saloonEdit.height);
          this.formGroupSize.get('width').setValue(this.saloonEdit.width);
        }
      }
    );
  }


  public nextStepper(): void {
    this.stepperNumber += 1;
    this.stepper.next();

    if(this.stepperNumber === 3) {
      this.saloonService.initCard();
      if(this.typeOperation === 'nuevo') {
        this.drawSeats();
      } else {
        const newHeight = this.formGroupSize.get('height').value;
        const newWidth = this.formGroupSize.get('width').value;
        
        if(this.saloonEdit.width === newWidth && this.saloonEdit.height === newHeight){
          this.drawEditSeats();
        } else {
          this.drawSeats();
        }
      }
    }
  }

  public previousStepper(): void {
    if(this.stepperNumber === 1) {
      this.router.navigate(['manager/abm-saloons']);
      return;
    }
    this.stepper.previous();
    this.stepperNumber -= 1;
  }

  public drawEditSeats(): void {
    this.seatConfig = [];
    const layout = this.saloonEdit.layout;
    Object.keys(layout).map(key => {
      const seat = {
        seat_label: key,
        layout: layout[key].join('').replaceAll('_', 'e')
      }
      const index = this.abcMap.indexOf(key);
      this.seatConfig[index] = seat;
    });
    this.saloonService.seatmap = [];
    this.saloonService.processSeatChart([{seat_map: this.seatConfig}]);
  }

  private drawSeats(): void {
    
    this.seatConfig = this.genNewSeatMap();

    this.saloonService.seatmap = [];
    this.saloonService.processSeatChart([{seat_map: this.seatConfig}]);
  }

  private genNewSeatMap(): any[] {
    const enabledMap = "gggggggggggggggggggggggggggggggggggg"; 
    const height = parseInt(this.formGroupSize.get('height').value);
    const width = parseInt(this.formGroupSize.get('width').value);
    const seatLayout = [];

    for(let i = 0; i < height; i++) {
      const seat = {
        seat_label: this.abcMap[i],
        layout: enabledMap.slice(0, width)
      }
      seatLayout.push(seat);
    }
    return seatLayout;
  }

  public async finalize(): Promise<void> {
    const selectedSeats = this.saloonService.cart.seatstoStore;

    const height = parseInt(this.formGroupSize.get('height').value)
    const width = parseInt(this.formGroupSize.get('width').value)

    const seats = (height * width) - selectedSeats.length;

    this.seatConfig = this.genNewSeatMap();

    selectedSeats.map(e => {

      const arrRowColumn = e.split('_');
      const seatIndex = this.seatConfig.findIndex(seat => seat['seat_label'] === arrRowColumn[0]);
      const rowLayout =  this.seatConfig[seatIndex].layout.split('');
      
      rowLayout[arrRowColumn[1] - 1] = '_';
      this.seatConfig[seatIndex].layout = rowLayout.join('');
    });

    const newLayout = {};

    this.seatConfig.map(e => {
      newLayout[e.seat_label] = e.layout.split('');
    });


    if(this.typeOperation === 'nuevo') {
      const id = this.fxService.getRandomId();

      const saloon: Saloon = {
        layout: newLayout,
        ...this.formGroupData.getRawValue(), 
        ...this.formGroupSize.getRawValue(),
        seats
      }

      saloon.id = id;
      this.cinemaEdit.saloons.push(saloon);

    } else {

      const saloonEdit = {
        layout: newLayout,
        ... this.formGroupData.getRawValue(),
        ...this.formGroupSize.getRawValue(),
        seats
      }
      saloonEdit.id = this.saloonEdit.id;

      const index = this.cinemaEdit.saloons.findIndex(e =>e.id === this.typeOperation);
      this.cinemaEdit.saloons[index] = saloonEdit;
    }   

    try {
      await this.cinemaService.edit(this.cinemaEdit);
      this.fxService.showAlert('Perfecto!', 'La sala fue dada de alta con éxito', EIcon.success);
      this.router.navigate(['manager/abm-saloons']);
    } catch(e) {
      this.fxService.showAlert('Error', 'Se ha producido un error, reintente en unos minutos', EIcon.error);
    }
  }
}
