import { Saloon } from './../../../classes/saloon.class';
import { AuthService } from './../../../services/auth.service';
import { Cinema } from 'src/app/main/classes/cinema.class';
import { CinemasService } from 'src/app/main/services/cinemas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-saloons',
  templateUrl: './abm-saloons.component.html',
  styleUrls: ['./abm-saloons.component.scss']
})
export class AbmSaloonsComponent implements OnInit {

  public saloons: Saloon[];

  constructor(
    private router: Router,
    private cinemaService: CinemasService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.cinemaService.getOne(this.authService.getUserData().idCinema).subscribe(
      res => {this.saloons = res[0].saloons; console.log(res[0].saloons)});
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

}
