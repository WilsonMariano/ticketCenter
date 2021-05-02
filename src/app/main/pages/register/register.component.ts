import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private authService: AuthService) { }

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

  public register(): void {
    const user = this.formGroup.getRawValue();
    
    this.authService.createUser()
    
    
    delete user.passwordRepeat;

    this.usersService.create(user);
  }

}
