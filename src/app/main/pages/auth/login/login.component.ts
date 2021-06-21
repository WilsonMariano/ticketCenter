import { UsersService } from '../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private fxGlobalsService: FxGlobalsService,
    private dataService: DataService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }

  public async login(): Promise<void> {
    const user = this.formGroup.getRawValue();
    try {
      await this.authService.login(user.email, user.password);

      this.userService.getOneByEmail(user.email).subscribe(
        data => {
          this.authService.setUserData(data[0]);
          this.dataService.currentUser.next(data[0]);
          
          switch(data[0].role) {
            case 'admin': 
            this.router.navigate(['admin']);
            break;
            default: 
              this.router.navigate(['home']);
            break;
          }
        }
      );
  
      this.dataService.isLogged.next(true);
      localStorage.setItem('accessToken', this.authService.getUserToken());
      this.formGroup.reset();


    } catch(e) {
      console.log("error: ", e);
      let errMsg: string;
      switch(e.code) {
        case 'auth/wrong-password':
          errMsg = 'Contraseña incorrecta'
          break;
        default:
          errMsg = 'Ocurrió un error al intentar iniciar sesión, reintente luego';
          break;
      }
      this.fxGlobalsService.showAlert('No se pudo iniciar sesión', errMsg, EIcon.warning);
    }
  }
}

