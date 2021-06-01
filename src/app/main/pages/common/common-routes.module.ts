import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './common.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const commonRoutes: Routes = [
    {
        path: '',
        component: CommonComponent,
        children: [
            { path: '',                                 redirectTo: 'home',                 pathMatch: 'full'                                   },
            { path: 'home',                             component: HomeComponent                                   },
            { path: 'profile',                          component: ProfileComponent                                },
            { path: 'movie/:id',                        component: MovieDetailComponent                            },
            { path: 'movies',                           component: MoviesComponent                                 },
            { path: 'cinemas',                          component: CinemasComponent                                },
            { path: 'seat-selection/:movieShowId',      component: SeatSelectionComponent                          },
            { path: '**', component: HomeComponent },
        ]
    }
];


export const COMMON_ROUTES = RouterModule.forChild( commonRoutes );