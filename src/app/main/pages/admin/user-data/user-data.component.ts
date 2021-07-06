import { CinemasService } from 'src/app/main/services/cinemas.service';
import { Cinema } from './../../../classes/cinema.class';
import { EIcon, FxGlobalsService } from 'src/app/main/services/fx-globals.service';
import { AuthService } from './../../../services/auth.service';
import { User, ERole } from './../../../classes/user.class';
import { UsersService } from './../../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  public typeOperation: string;
  public formGroup: FormGroup;
  public roles = [];

  public cinemas: Cinema[];

  constructor(
    private userService: UsersService,
    private cinemaService: CinemasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fxService: FxGlobalsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCinemas();

    this.formGroup = this.fb.group({
      'email': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'surname': ['', [Validators.required]],
      'document': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'role': ['', [Validators.required]],
      'idCinema': [{value: '', disabled: true}, [Validators.required]]
    });

    const roleKeys = Object.keys(ERole);
    roleKeys.forEach(r => {
      if(ERole[r] === 'anonymus') return;
      
      this.roles.push({
        key: ERole[r],
        value: r
      })
    });

    const emailUser = this.route.snapshot.paramMap.get('id');
    
    if(emailUser === 'nuevo') {
      this.typeOperation = 'nuevo';
      this.changeRole();

    } else {
     this.userService.getOneByEmail(emailUser).subscribe(
        data => {
          const user = data[0] as User;
          this.formGroup.patchValue(user);
          this.changeRole();
        });
      
      this.formGroup.get('email').disable();
      this.formGroup.get('password').disable();
    }
  }

  private getAllCinemas(): void {
    this.cinemaService.getAll().subscribe(
      res => this.cinemas = res
    );
  }

  public async submit(): Promise<void> {
    this.fxService.showSpinner();
    const user = this.formGroup.getRawValue() as User;

    if(this.typeOperation === 'nuevo') {
      try {
        await this.authService.createUser(user.email, user.password);
        delete user.password;
        await this.userService.create(user);
        this.router.navigate(['admin/abm-users']);
        this.fxService.showAlert('Perfecto!', 'El usuario fue insertado con éxito', EIcon.success);
        this.fxService.hideSpinner();
      } catch(e) {
        this.fxService.showAlert('Error!', 'El email ingresado es erróneo o ya está en uso', EIcon.error);
        this.fxService.hideSpinner();
      }
    } else {
        delete user.password;
        try{
          await this.userService.edit(user);
          this.router.navigate(['admin/abm-users']);
          this.fxService.showAlert('Perfecto!', 'El usuario fue editado con éxito', EIcon.success);
          this.fxService.hideSpinner();

        } catch(e) {
          this.fxService.showAlert('Error!', 'El usuario no pudo ser editado, intente más tarde', EIcon.error);
          this.fxService.hideSpinner();
        }
    }
  }

  public changeRole(): void {
    const role = this.formGroup.get('role').value;
    
    if(role === ERole.Encargado || role === ERole.Acomodador) {
      this.formGroup.get('idCinema').enable();
    } else {
      this.formGroup.get('idCinema').disable();
    }
  }

}
