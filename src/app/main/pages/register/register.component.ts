import { FxGlobalsService } from './../../services/fx-globals.service';
import { User } from './../../classes/user.class';
import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private fxGlobalsService: FxGlobalsService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'passwordRepeat': ['', Validators.required],
      'document': ['', Validators.required]
    });
  }

  public async register(): Promise<void> {
    const user = this.formGroup.getRawValue();

    try {
      const res = await this.authService.createUser(user.email, user.password);
      user.uid = res.user.uid;
      delete user.password;
      delete user.passwordRepeat;
      this.usersService.create(user);
      this.formGroup.reset();
      this.fxGlobalsService.showAlert('Registro exitoso', 'El usuario se ha creado con éxito!', 'success');
      this.router.navigate['login'];

    } catch(e) {
      console.log("error: ", e);
      
      let errMsg: string;

      switch(e.code) {
        case 'auth/email-already-in-use':
          errMsg = 'El email ya se encuenta en uso, ingrese otro'
          break;
        default:
          errMsg = 'No se ha podido registrar al usuario';
          break;
      }
      this.fxGlobalsService.showAlert('Registro erróneo', errMsg, 'warning');
    }
     
  }

}
