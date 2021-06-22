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
    public cinemasService: CinemasService,
    private router: Router,
    ) { }

  ngOnInit(): void {
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
}
