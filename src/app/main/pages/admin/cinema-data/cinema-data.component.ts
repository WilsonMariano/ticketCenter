import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';
import { Cinema } from '../../../classes/cinema.class';
import { CinemasService } from '../../../services/cinemas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cinema-data',
  templateUrl: './cinema-data.component.html',
  styleUrls: ['./cinema-data.component.scss']
})
export class CinemaDataComponent implements OnInit {

  public typeOperation: string;
  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fxService: FxGlobalsService,
    private cinemaService: CinemasService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'id': [''],
      'name': ['Cinema 1', [Validators.required]],
      'address': ['Hunter 1034', [Validators.required]],
      'location': ['Adrogue', [Validators.required]],
      'phone': ['123456', [Validators.required]],
      'schedule': ['1 a 9 hs', [Validators.required]],
      'lat': ['-34.057747', [Validators.required]],
      'lng': ['-11.5456565', [Validators.required]],
      '2D': ['100', [Validators.required]],
      '3D': ['200', [Validators.required]]
    });

    const idCinema = this.route.snapshot.paramMap.get('id');
    
    if(idCinema === 'nuevo') {
      this.typeOperation = 'nuevo';

    } else {
     this.cinemaService.getOne(idCinema).subscribe(
        data => {
          const cinema = data[0] as Cinema;
          console.log({cinema});

          this.formGroup.patchValue({
            ...cinema,
            '2D': cinema.prices['2D'],
            '3D': cinema.prices['3D']
          });
        });
    }
  }

  public async submit(): Promise<void> {
    const form = this.formGroup.getRawValue();
    const cinema: Cinema = {
      id: form.id,
      name: form.name,
      address: form.address,
      location: form.location,
      phone: form.phone,
      schedule: form.schedule,
      lat: form.lat,
      lng: form.lng,
      prices: {
        '2D': form['2D'],
        '3D': form['3D']
      }
    }

    if(this.typeOperation === 'nuevo') {

      cinema.id = this.fxService.getRandomId();

      try {
        await this.cinemaService.create(cinema);
        this.fxService.showSpinner(500);
        this.fxService.showAlert('Perfecto!', 'El cinema se ha dado de alta con éxito', EIcon.success);
        this.router.navigate(['admin/abm-cinemas']);
      } catch(e) {
        console.log(e);
        this.fxService.showAlert('Error!', 'Se ha producido un error, intente de nuevo en unos minutos', EIcon.error);
      }
    } else {
      try {
        this.fxService.showSpinner(500);
        await this.cinemaService.edit(cinema);
        this.fxService.showAlert('Perfecto!', 'El cinema se ha editado con éxito', EIcon.success);
        this.router.navigate(['admin/abm-cinemas']);
      } catch(e) {
        console.log(e);
        this.fxService.showAlert('Error!', 'Se ha producido un error, intente de nuevo en unos minutos', EIcon.error);
      }
    }
  }

}
