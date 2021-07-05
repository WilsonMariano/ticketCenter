import { UserDataComponent } from './user-data/user-data.component';
import { CinemaDataComponent } from './cinema-data/cinema-data.component';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from './admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDataComponent } from './movie-data/movie-data.component';
import { CarouselComponent } from './carousel/carousel.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '',                 redirectTo: 'abm-cinemas',      pathMatch: 'full' },
            { path: 'abm-cinemas',      component: CinemasComponent                       },
            { path: 'cinema-data/:id',  component: CinemaDataComponent                    },
            { path: 'abm-users',        component: UsersComponent                         },
            { path: 'user-data/:id',    component: UserDataComponent                      },
            { path: 'abm-movies',       component: MoviesComponent                        },
            { path: 'movie-data/:id',   component: MovieDataComponent                     },
            { path: 'carousel',         component: CarouselComponent                      },
        ]
    }
];

export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );