import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { EIcon, FxGlobalsService } from '../../services/fx-globals.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-trx-count-down',
  templateUrl: './trx-count-down.component.html',
  styleUrls: ['./trx-count-down.component.scss']
})
export class TrxCountDownComponent implements OnInit {
  
  public countDown: string;
  public timerWarning: string = "3:00";
  private timerStrFormat: string = "m:ss"
  private timerDuration = environment.timerDuration ?? "5:00";
  private subscription: Subscription;
  private intervalRef: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private fxGlobalsService: FxGlobalsService) {

  }

  ngOnInit(): void {
    // this.dataService.trxCountDown.next(environment.timerDuration);
    this.subscription = this.dataService.trxCountDown$.subscribe(res => this.countDown = res);
    this.setTrxTimer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.intervalRef);
  }

  private setTrxTimer(){
    let duration = moment.duration({
      'minutes': parseInt(this.countDown.substring(0,1)),
      'seconds': parseInt(this.countDown.substring(2))
    });
    
    const interval = 1;
    const formatedWarningTime = this.getTimerString(this.timerWarning);
    const formatedEndTime = this.getTimerString("0");

    this.intervalRef = setInterval(function() {
      duration = moment.duration(duration.asSeconds() - interval, 'seconds');
      let min = duration.minutes();
      let sec = duration.seconds();
      let strTimer = this.getTimerString(min + ":" + sec);
      this.dataService.trxCountDown.next(strTimer);
    
      if (strTimer === formatedWarningTime)
        this.showTimeWarning();

      if (strTimer === formatedEndTime) 
        this.endTrxCountDown(this.intervalRef);

    }.bind(this), 1000);
  }
  
  /**
   * Despliega un alert para advertir el tiempo restante de operación
   */
  private showTimeWarning(){
    this.fxGlobalsService.showToast("timeToast");
  }

  /**
   * Formatea horarios usando momentjs
   * @param time 
   * @returns  Devuelve un string del horario  recibido por param, respetando el formato definido en la variable global timerStrFormat
   */
  private getTimerString(time: string): string{
    let mom = moment(time, this.timerStrFormat);
    return mom.format(this.timerStrFormat);
  }

  /**
   * Ejecuta las acciones necesarias al finalizar la cuenta regresiva del timer
   * @param timer Objeto timer generado por setInterval()
   */
  private endTrxCountDown(timer){
    clearInterval(timer);
    this.fxGlobalsService.showAlert(
      'Tiempo agotado', 
      'Se superó el tiempo permitido para operar, reinicie la transacción por favor.',
      EIcon.warning);
    this.router.navigate(['home']);
    this.dataService.trxCountDown.next(this.timerDuration);
  }
}
