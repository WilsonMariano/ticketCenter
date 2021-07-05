import { ERole } from './../classes/user.class';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {

  private roles = [];

  constructor() {
    const roleKeys = Object.keys(ERole);
    roleKeys.forEach(r => {
      this.roles.push({
        key: ERole[r],
        value: r
      })
    });
  }

  transform(value: string = 'client'): string {
    const role = this.roles.find(r => r.key === value);
    return role.value;
  }

}
