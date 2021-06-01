import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CinemasComponent } from './cinemas/cinemas.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '',                             redirectTo: 'abm-cinemas',       pathMatch: 'full'               },
            { path: 'abm-cinemas',                  component: CinemasComponent                                   }
        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );