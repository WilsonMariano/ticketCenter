import { ManagerComponent } from './main/pages/manager/manager.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './main/pages/auth/auth.component';
import { AdminComponent } from './main/pages/admin/admin.component';
import { AttendantComponent } from './main/pages/attendant/attendant.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'attendant', component: AttendantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
