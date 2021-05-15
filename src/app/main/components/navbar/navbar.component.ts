import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  public isLogged: Boolean;

  constructor(
    private dataService: DataService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.dataService.currentUser$.subscribe(
        res => this.currentUser = res);    

    this.dataService.isLogged$.subscribe(
       res => this.isLogged = res);
  }

  public logout(){
    this.authService.logout();
  }
}