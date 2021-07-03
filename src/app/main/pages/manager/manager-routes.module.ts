import { MovieShowDataComponent } from './movie-show-data/movie-show-data.component';
import { Routes, RouterModule } from '@angular/router';
import { AbmMovieShowsComponent } from './../../pages/manager/abm-movie-shows/abm-movie-shows.component';
import { SaloonDataComponent } from './saloon-data/saloon-data.component';
import { AbmSaloonsComponent } from './abm-saloons/abm-saloons.component';
import { ManagerComponent } from './manager.component';


const managerRoutes: Routes = [
    {
        path: 'manager',
        component: ManagerComponent,
        children: [
            { path: '',                             redirectTo: 'abm-saloons',          pathMatch: 'full'         },
            { path: 'abm-saloons',                  component: AbmSaloonsComponent                                },
            { path: 'abm-movie-shows',              component: AbmMovieShowsComponent                             },
            { path: 'saloon-data/:id',              component: SaloonDataComponent                                },
            { path: 'movie-show-data/:id',          component: MovieShowDataComponent                             }
        ]
    }
];


export const MANAGER_ROUTES = RouterModule.forChild( managerRoutes );