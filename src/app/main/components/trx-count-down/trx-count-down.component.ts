import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FxGlobalsService } from '../../services/fx-globals.service';
import { environment } from '../../../../environments/environment';
declare var $: any;

@Component({
  selector: 'app-trx-count-down',
  templateUrl: './trx-count-down.component.html',
  styleUrls: ['./trx-count-down.component.scss']
})
export class TrxCountDownComponent implements OnInit {
  
  public countDown: string;
  public timerWarning: string = "3:00";
  private timerStrFormat: string = "m:ss"
  private timerDuration = environment.timerDuration;

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
      let strTimer = this.getTimerString(min + ":" + sec);
      this.dataService.trxCountDown.next(strTimer);
    
      if (strTimer === this.getTimerString(this.timerWarning))
        this.showTimeWarning();

      if (strTimer === this.getTimerString("0")) 
        this.endTrxCountDown(timer);

    }.bind(this), 1000);
  }

  private showTimeWarning(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  private getTimerString(time: string): string{
    let mom = moment(time, this.timerStrFormat);
    return mom.format(this.timerStrFormat);
  }

  private endTrxCountDown(timer){
    clearInterval(timer);
    this.fxGlobalsService.showAlert(
      'Tiempo agotado', 
      'Se superó el tiempo permitido para operar, reinicie la transacción por favor.',
      'warning');
    this.router.navigate(['home']);
    this.dataService.trxCountDown.next(this.timerDuration);
  }
}
