// Modules
import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
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
// Errors
import {NotFound404Component} from './components/errors/not-found-404.component';
// Routes
import {routes} from './app.routes';
// Services
import {RequestsService} from './services/requests.service';
import {APUtilService} from './services/ap.util.service';
import {PermissionsService} from './services/permissions.service';

import {AppConfig} from './configuration/app.config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule, ToastOptions, ToastsManager} from 'ng2-toastr';
import {CustomOption} from './configuration/CustomOption';
import {DoctorDashboardComponent} from './components/dashboard/doctor/doctor-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {UserSharedService} from './services/user.shared.service';
import {SettingComponent} from './components/dashboard/setting/setting.component';
import {SettingNavigationComponent} from './components/dashboard/setting/setting-navigation.component';
import {DoctorComponent} from './components/dashboard/setting/doctor.component';
import {ICDComponent} from './components/dashboard/setting/icd.component';
import {DepartmentComponent} from './components/dashboard/setting/department.component';
import {CashierComponent} from './components/dashboard/setting/cashier.component';
import {MedicalServiceComponent} from './components/dashboard/setting/medical-service.component';
import {NurseComponent} from './components/dashboard/setting/nurse.component';
import {ReceptionistComponent} from './components/dashboard/setting/receptionist.component';
import {BranchComponent} from './components/dashboard/setting/branch.component';
import {AddCashierComponent} from './components/dashboard/setting/addcashier.component';
import {RolePermissionsComponent} from './components/dashboard/setting/role-permissions.component';
import {AdddoctorComponent} from './components/dashboard/setting/adddoctor.component';
import {AddNurseComponent} from './components/dashboard/setting/addnurse.component';
import {AddReceptionistComponent} from './components/dashboard/setting/addreceptionist.component';
import {AddBranchComponent} from './components/dashboard/setting/addbranch.component';

@NgModule({
    providers: [
        // Services
        RequestsService,
        APUtilService,
        AppConfig,
        PermissionsService,
        ToastsManager,
        {provide: ToastOptions, useClass: CustomOption},
        UserSharedService
    ],
    imports: [
        // Modules
        BrowserModule,
        FormsModule,
        routes,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        HttpClientModule
    ],
    declarations: [
        // App Components
        AppComponent,
        MainComponent,
        LoginComponent,
        DashboardComponent,
        DoctorDashboardComponent,

        // Dashboard Components
        HeaderComponent,
        NavigationComponent,
        FooterComponent,
        ContentComponent,
        NotFound404Component,

        //Setting Components
        SettingComponent,
        SettingNavigationComponent,
        DoctorComponent,
        ICDComponent,
        DepartmentComponent,
        CashierComponent,
        MedicalServiceComponent,
        NurseComponent,
        ReceptionistComponent,
        BranchComponent,
        AddCashierComponent,
        RolePermissionsComponent,
        AdddoctorComponent,
        AddNurseComponent,
        AddReceptionistComponent,
        AddBranchComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
    ngOnInit() {
    }
}
