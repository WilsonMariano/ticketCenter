import { UsersService } from './../../../services/users.service';
import { User } from './../../../classes/user.class';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[];

  constructor(
    private router: Router,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      res => this.users = res);
  }
  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
