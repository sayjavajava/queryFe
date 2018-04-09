// Modules
import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

// App Components
import {AppComponent} from './components/app.component';
import {MainComponent} from './components/dashboard/main.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

// Dashboard Components
import {HeaderComponent} from './components/dashboard/header.component';
import {NavigationComponent} from './components/dashboard/navigation.component';
import {FooterComponent} from './components/dashboard/footer.component';
import {ContentComponent} from './components/dashboard/content.component';
// Dashboard Page Components

// Charts

// Errors
import {NotFound404Component} from './components/errors/not-found-404.component';

// Forms

// Pipes

// Routes
import {routes} from './app.routes';

// Services
import {RequestsService} from './services/requests.service';
import {APUtilService} from './services/ap.util.service';
import {PermissionsService} from './services/permissions.service';

import {AppConfig} from './configuration/app.config';

// ========================================================================== //

@NgModule({
    providers: [
        // Services
        RequestsService,
        APUtilService,
        AppConfig,
        PermissionsService
    ],
    imports: [
        // Modules
        BrowserModule,
        FormsModule,
        HttpModule,
        routes,
    ],
    declarations: [
        // Third Party Components

        // App Components
        AppComponent,
        MainComponent,
        LoginComponent,
        DashboardComponent,

        // Dashboard Components
        HeaderComponent,
        NavigationComponent,
        FooterComponent,
        ContentComponent,

        // Dashboard Page Components
        // Charts

        // Errors
        NotFound404Component,

        // Forms

        // Pipes
    ],
    bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
    ngOnInit() {
    }
}
