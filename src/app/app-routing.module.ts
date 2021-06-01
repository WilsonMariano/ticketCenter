import { CommonComponent } from './main/pages/common/common.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './main/pages/auth/auth.component';
import { AdminComponent } from './main/pages/admin/admin.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
