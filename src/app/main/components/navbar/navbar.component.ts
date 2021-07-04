import { CinemasService } from 'src/app/main/services/cinemas.service';
import { Cinema } from './../../classes/cinema.class';
import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user.class';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  public currentUser: User;
  public cinema: Cinema;
  public isLogged: Boolean;

  constructor(
    private dataService: DataService,
    private cinemaService: CinemasService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.dataService.currentUser$.subscribe(
        res => {
          this.currentUser = res; 
          if(this.currentUser && this.currentUser.idCinema) {
            this.cinemaService.getOne(this.currentUser.idCinema).subscribe(
              cinema => this.cinema = cinema[0]
            );
          }

        }
    );    

    this.dataService.isLogged$.subscribe(
       res => this.isLogged = res);
  }

  public logout(){
    this.authService.logout();
    this.dataService.currentUser.next(null);
    this.dataService.isLogged.next(false);
    this.cinema = null;
  }

  public getCinemaName(): string {
    const arrCinema = this.cinema.name.split(' ');

    return arrCinema.length > 3
      ? arrCinema[2] +' '+ arrCinema[3]
      : arrCinema[2];
  }
}