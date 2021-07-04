import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location,
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

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public async login(): Promise<void> {
    const user = this.formGroup.getRawValue();
    try {
      await this.authService.login(user.email, user.password);

      this.subscription = this.userService.getOneByEmail(user.email).subscribe(
        data => {
          this.authService.setUserData(data[0]);
          this.dataService.currentUser.next(data[0]);
   
          switch(data[0].role) {
            case 'admin': 
            this.router.navigate(['admin']);
            break;
            case 'manager': 
            this.router.navigate(['manager']);
            break;
            case 'attendant': 
            this.router.navigate(['attendant']);
            break;
            default: 
              this.location.back();
              // this.router.navigate(['home']);
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

