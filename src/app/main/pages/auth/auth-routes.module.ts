import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: '',                             redirectTo: '/login',       pathMatch: 'full'                            },
            { path: 'login',                        component: LoginComponent                                   },
            { path: 'register',                     component: RegisterComponent                                }
        ]
    }
];


export const AUTH_ROUTES = RouterModule.forChild( authRoutes );