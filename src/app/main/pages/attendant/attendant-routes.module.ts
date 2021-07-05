import { VerifyTicketComponent } from './verify-ticket/verify-ticket.component';
import { Routes, RouterModule } from '@angular/router';
import { AttendantComponent } from './attendant.component';


const attendantRoutes: Routes = [
    {
        path: 'attendant',
        component: AttendantComponent,
        children: [
            { path: '',                             redirectTo: 'verify-ticket',          pathMatch: 'full'         },
            { path: 'verify-ticket',                component: VerifyTicketComponent                                }
        ]
    }
];


export const ATTENDANT_ROUTES = RouterModule.forChild( attendantRoutes );