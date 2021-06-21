import { UserDataComponent } from './user-data/user-data.component';
import { CinemaDataComponent } from './cinema-data/cinema-data.component';
import { UsersComponent } from './users/users.component';
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
            { path: 'abm-users',                    component: UsersComponent                                     },
            { path: 'cinema-data/:id',              component: CinemaDataComponent                                },
            { path: 'user-data/:id',                component: UserDataComponent                                  }
        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );