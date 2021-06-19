import { TransactionService } from './transactions.service';
import { FxGlobalsService } from './fx-globals.service';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { DataService } from './data.service';
import { CinemasService } from './cinemas.service';
import { MoviesService } from './movies.service';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  imports: [
    NgxSpinnerModule
  ],
  providers: [
    MoviesService,
    CinemasService,
    DataService,
    UsersService,
    TransactionService,
    AuthService,
    FxGlobalsService
  ],
})
export class ServicesModule { }
