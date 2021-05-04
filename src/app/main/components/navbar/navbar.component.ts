import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userLogged: Boolean;


  constructor(
    private dataService: DataService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.dataService.userLogged$.subscribe(
      res => this.userLogged = res);
  }

  public logout(){
    this.authService.logout();
  }

}