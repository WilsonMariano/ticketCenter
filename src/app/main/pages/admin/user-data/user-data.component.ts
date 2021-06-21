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
  public roles;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fxService: FxGlobalsService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'email': ['mgw009@gmail.com', [Validators.required]],
      'name': ['Pablo', [Validators.required]],
      'surname': ['Valenzuela', [Validators.required]],
      'document': ['30555555', [Validators.required]],
      'password': ['123456', [Validators.required]],
      'role': ['manager', [Validators.required]]
    });
    this.roles = Object.keys(ERole);

    const emailUser = this.route.snapshot.paramMap.get('id');
    
    if(emailUser === 'nuevo') {
      this.typeOperation = 'nuevo';

    } else {
     this.userService.getOneByEmail(emailUser).subscribe(
        data => {
          const user = data[0] as User;
          console.log({user});
          this.formGroup.patchValue(user);
        });
      
      this.formGroup.get('email').disable();
      this.formGroup.get('password').disable();
    }
  }

  public async submit(): Promise<void> {
    const user = this.formGroup.getRawValue() as User;

    if(this.typeOperation === 'nuevo') {
      try {
        await this.authService.createUser(user.email, user.password);
        delete user.password;
        await this.userService.create(user);
        this.router.navigate(['admin/abm-users']);
        this.fxService.showAlert('Perfecto!', 'El usuario fue insertado con éxito', EIcon.success);
      } catch(e) {
        this.fxService.showAlert('Error!', 'El email ingresado es erróneo o ya está en uso', EIcon.error);
        console.log("Error: ", e);
      }
    } else {
        delete user.password;
        try{
          await this.userService.edit(user);
          this.router.navigate(['admin/abm-users']);
          this.fxService.showAlert('Perfecto!', 'El usuario fue editado con éxito', EIcon.success);

        } catch(e) {
          this.fxService.showAlert('Error!', 'El usuario no pudo ser editado, intente más tarde', EIcon.error);
          console.log("Error: ", e);
        }
    }
  }

}
