import { SpinnerModule } from './../../components/spinner/spinner.module';
import { FxGlobalsService } from './../../services/fx-globals.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  providers: [
    FxGlobalsService
  ]
})
export class ProfileModule { }
