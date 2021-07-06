import { EIcon, FxGlobalsService } from 'src/app/main/services/fx-globals.service';
import { AbmCinemasService } from './cinemas.service';
import { Cinema } from 'src/app/main/classes/cinema.class';
import { CinemasService } from 'src/app/main/services/cinemas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  public cinemas: Cinema[];
  public pagedCinemaItems: Cinema[];

  constructor(
    private cinemasService: CinemasService,
    private abmCinemaService: AbmCinemasService,
    private fxService: FxGlobalsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getAllCinemas();
  }

  private getAllCinemas(): void {
    this.cinemasService.getAll().subscribe(
      res => this.cinemas = res
    );
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  /**
   * Handler para el output del paginado. Actualiza los items de mi array
   * @param data 
   */
  public pageChanged(data: any){
    this.pagedCinemaItems = data;
  }

  public async delete(idCinema: string): Promise<void> {

    if(await this.fxService.showAlertConfirm('Confirmación', '¿Está seguro que desea eliminar el cine seleccionado?', EIcon.info)) {
      this.fxService.showSpinner();
      
      if(!await this.abmCinemaService.verifyPendingShows(idCinema)) {
        this.cinemasService.delete(idCinema).then(res => {
          setTimeout(() => {
            this.fxService.hideSpinner();
            window.location.reload();
          }, 2000);
        })
      } else {
        this.fxService.showAlert('Atención', 'No se puede eliminar el cine, hay funciones pendientes', EIcon.warning);
        this.fxService.hideSpinner();
      }
    }

  }
}
