// Modules
import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import {HISUtilService} from './services/his-util.service';
import {PermissionsService} from './services/permissions.service';

import {AppConfig} from './configuration/app.config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastOptions} from 'ng2-toastr';
import {CustomOption} from './configuration/CustomOption';
import {DoctorDashboardComponent} from './components/dashboard/doctor/doctor-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {UserSharedService} from './services/user.shared.service';
import {SettingComponent} from './components/dashboard/setting/setting.component';
import {SettingNavigationComponent} from './components/dashboard/setting/setting-navigation.component';
import {StaffComponent} from './components/dashboard/setting/staff.component';
import {ICDComponent} from './components/dashboard/setting/icd.component';
import {DepartmentComponent} from './components/dashboard/setting/department.component';
import {CashierComponent} from './components/dashboard/setting/cashier.component';
import {MedicalServiceComponent} from './components/dashboard/setting/medical-service.component';
import {NurseComponent} from './components/dashboard/setting/nurse.component';
import {ReceptionistComponent} from './components/dashboard/setting/receptionist.component';
import {BranchComponent} from './components/dashboard/setting/branch.component';
import { UpdateCashierComponent} from './components/dashboard/setting/updatecashier.component';
import {RolePermissionsComponent} from './components/dashboard/setting/role-permissions.component';
import {UpdatedoctorComponent} from './components/dashboard/setting/updatedoctor.component';
import {UpdateNurseComponent} from './components/dashboard/setting/updatenurse.component';
import {AddReceptionistComponent} from './components/dashboard/setting/addreceptionist.component';
import {AddBranchComponent} from './components/dashboard/setting/addbranch.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIcon,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSnackBarModule
} from '@angular/material';
import {NotificationService} from './services/notification.service';
import {OrganizationComponent} from './components/dashboard/setting/organization.component';
import {AddOrganizationComponent} from './components/dashboard/setting/addorganization.component';
import {AddStaffComponent} from './components/dashboard/setting/addstaff.component';
import {ErrordisplayComponent} from './components/dashboard/setting/errordisplay.component';
import {ConfirmationdialogComponent} from './components/dashboard/confirmationdialog.component';
import {ConformationDialogService} from './services/ConformationDialogService';


@NgModule({
    providers: [
        // Services
        RequestsService,
        NotificationService,
        HISUtilService,
        AppConfig,
        PermissionsService,
        {provide: ToastOptions, useClass: CustomOption},
        UserSharedService,
        ConformationDialogService
    ],
    entryComponents: [ConfirmationdialogComponent],
    imports: [
        // Modules
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routes,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        MatSnackBarModule,
        AmazingTimePickerModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatIconModule,


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
        StaffComponent,
        ICDComponent,
        DepartmentComponent,
        CashierComponent,
        MedicalServiceComponent,
        NurseComponent,
        ReceptionistComponent,
        BranchComponent,
        UpdateCashierComponent,
        RolePermissionsComponent,
        UpdatedoctorComponent,
        UpdateNurseComponent,
        AddReceptionistComponent,
        AddBranchComponent,
        OrganizationComponent,
        AddOrganizationComponent,
        AddStaffComponent,
        ErrordisplayComponent,
        ConfirmationdialogComponent,

    ],
    bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
    ngOnInit() {
    }
}
