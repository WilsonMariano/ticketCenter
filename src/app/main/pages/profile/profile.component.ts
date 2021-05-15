import { FxGlobalsService } from './../../services/fx-globals.service';
import { UsersService } from './../../services/users.service';
import { CinemasService } from './../../services/cinemas.service';
import { Cinema } from './../../classes/cinema.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { User } from './../../classes/user.class';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User;
  public cinemas: Cinema[];
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UsersService,
    private cinemasService: CinemasService,
    private fxGlobalService: FxGlobalsService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.formGroup = this.fb.group({
      'name': [this.user.name],
      'surname': [this.user.surname],
      'document': [this.user.document],
      'email': [{value: this.user.email, disabled: true}],
      'cinemaPreference': ['']
    });
    this.getCinemas();
  }

  private getCinemas(): void {
    this.fxGlobalService.showSpinner();
    this.cinemasService.getAll().subscribe(
      res => {
        this.cinemas = res;
        this.fxGlobalService.hideSpinner();
      });
  }

  public editUser(): void {
    this.fxGlobalService.showSpinner();
    this.userService.edit(this.formGroup.getRawValue());
    this.fxGlobalService.hideSpinner();
    this.fxGlobalService.showAlert('Perfecto', 'Usuario editado con éxito', 'success');
  
  }

}
