import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userLogged: Boolean;


  constructor() { }

  ngOnInit(): void {
    this.userLogged = localStorage.getItem("userLogged") == "true";
  }

}
