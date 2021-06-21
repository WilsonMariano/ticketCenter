import { DatosCinemaComponent } from './datos-cinema/datos-cinema.component';
import { AdminGuard } from './admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CinemasComponent } from './cinemas/cinemas.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '',                             redirectTo: 'abm-cinemas',          pathMatch: 'full'         },
            { path: 'abm-cinemas',                  component: CinemasComponent                                   },
            { path: 'datos-cinema/:id',             component: DatosCinemaComponent                               }
        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );