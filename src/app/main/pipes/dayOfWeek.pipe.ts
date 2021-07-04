import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  private dayOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];    

  transform(value: number): string {
    return this.dayOfWeek[value];
  }

}
