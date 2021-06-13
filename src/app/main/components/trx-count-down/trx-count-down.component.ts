import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FxGlobalsService } from '../../services/fx-globals.service';
declare var $: any;

@Component({
  selector: 'app-trx-count-down',
  templateUrl: './trx-count-down.component.html',
  styleUrls: ['./trx-count-down.component.scss']
})
export class TrxCountDownComponent implements OnInit {
  
  public countDown: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private fxGlobalsService: FxGlobalsService) { }

  ngOnInit(): void {
    this.dataService.trxCountDown$.subscribe(res => this.countDown = res);
    this.setTrxTimer();
  }

  private setTrxTimer(){
    let duration = moment.duration({
      'minutes': parseInt(this.countDown.substring(0,1)),
      'seconds': parseInt(this.countDown.substring(2))
    });
    
    let interval = 1;
    let timer = setInterval(function() {
      duration = moment.duration(duration.asSeconds() - interval, 'seconds');
      let min = duration.minutes();
      let sec = duration.seconds();
      let strTimer = min + ':' + (sec < 10 ? "0" + sec : sec);
      this.dataService.trxCountDown.next(strTimer);

      if (strTimer === "3:00") this.showSnackBar();
      if (min == 0 && sec == 0) this.endTransaction(timer);

    }.bind(this), 1000);
  }

  private showSnackBar(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  private endTransaction(timer){
    clearInterval(timer);
    this.fxGlobalsService.showAlert(
      'Tiempo agotado', 
      'Se superó el tiempo permitido para operar, reinicie la transacción por favor.',
      'warning');
    this.router.navigate(['home']);
  }
}
