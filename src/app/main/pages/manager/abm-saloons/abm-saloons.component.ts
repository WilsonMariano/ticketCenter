import { Cinema } from './../../../classes/cinema.class';
import { FxGlobalsService, EIcon } from 'src/app/main/services/fx-globals.service';
import { AbmSaloonsService } from './abm-saloons.service';
import { Saloon } from './../../../classes/saloon.class';
import { AuthService } from './../../../services/auth.service';
import { CinemasService } from 'src/app/main/services/cinemas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-saloons',
  templateUrl: './abm-saloons.component.html',
  styleUrls: ['./abm-saloons.component.scss']
})
export class AbmSaloonsComponent implements OnInit {

  public cinema: Cinema;

  constructor(
    private router: Router,
    private cinemaService: CinemasService,
    private abmSaloonService: AbmSaloonsService,
    private fxService: FxGlobalsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.cinemaService.getOne(this.authService.getUserData().idCinema).subscribe(
      res => this.cinema = res[0]);
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  public async delete(idSaloon: string): Promise<void> {
    if(await this.fxService.showAlertConfirm('Confirmación', '¿Está seguro que desea eliminar el cine seleccionado?', EIcon.info)) {
      this.fxService.showSpinner();

      if(!await this.abmSaloonService.verifyPendingShows(idSaloon)) {
        const index = this.cinema.saloons.findIndex(e => e.id === idSaloon);
        this.cinema.saloons.splice(index, 1);
        this.cinemaService.edit(this.cinema);
        this.fxService.hideSpinner();
      } else {
        this.fxService.showAlert('Atención', 'No se puede eliminar la sala, hay funciones pendientes', EIcon.warning);
        this.fxService.hideSpinner();
      }
    } 
  }
}
