import {Routes} from '@angular/router';
// Dashboard Pages
import {ContentComponent} from '../components/dashboard/content.component';
import {NotFound404Component} from "../components/errors/not-found-404.component";

export const DashboardRoutes: Routes = [
    // Dashboard Pages
    {path: '', component: ContentComponent},
    {path: 'customer/404-not-found', component: NotFound404Component},
    {path: '404-not-found', component: NotFound404Component},
    {path: '**', redirectTo: '404'}
];
