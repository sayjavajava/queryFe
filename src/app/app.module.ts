// Modules
import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {GlobalModule} from './global.module';

// Third Party Components
import {MyDatePickerModule} from 'mydatepicker'
import {Ng2UploaderModule} from 'ng2-uploader';

// App Components
import {AppComponent} from './components/app.component';
import {MainComponent} from './components/dashboard/main.component';
import {LoginComponent} from './components/login.component';
import {ForgotPasswordComponent} from './components/forgot-password.component';
import {ForgotChangePasswordComponent} from './components/forgot-change-password.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from './components/admin/profile.component';
import {SettingsComponent} from './components/admin/settings.component';
import {ActivityLogComponent} from './components/admin/activity-log.component';


// Dashboard Components
import {HeaderComponent} from './components/dashboard/header.component';
import {NavigationComponent} from './components/dashboard/navigation.component';
import {FooterComponent} from './components/dashboard/footer.component';
import {ContentComponent} from './components/dashboard/content.component';
import {CustomerComponent} from './components/dashboard/customer/customer.component';
import {NewCustomerComponent} from './components/dashboard/customer/new-customer.component';
import {PasswordPolicyComponent} from './components/dashboard/password.policy.component';
import {AdminComponent} from './components/dashboard/admin/admin.component';
// Dashboard Page Components
import {CustomerDetailComponent} from './components/dashboard/customer/customer-detail.component';
import {CustomerPoliciesComponent} from './components/dashboard/customer/customer-policies.component';
import {CustomerGadgetComponent} from './components/dashboard/customer/customer-gadget.component';
import {CustomerActivityLogsComponent} from "./components/dashboard/customer/activitylog/customer-activitylogs.component";

import {AdminPoliciesComponent} from './components/dashboard/admin/admin-policies.component';
import {ResetPasswordComponent} from './components/dashboard/customer/customer-reset-password.component';

import {AdminAddComponent} from './components/dashboard/admin/admin-add.component';
import {AdminEditComponent} from './components/dashboard/admin/admin-edit.component';
import {AdminListComponent} from './components/dashboard/admin/admin-list.component';
import {AdminDetailComponent} from './components/dashboard/admin/admin-detail.component';
import {RoleAddComponent} from './components/dashboard/role/role-add.component';
import {RoleEditComponent} from './components/dashboard/role/role-edit.component';
import {RoleListComponent} from './components/dashboard/role/role-list.component';
import {RoleDetailComponent} from './components/dashboard/role/role-detail.component';
import {ReportContentComponent} from "./components/dashboard/report-content.component";
import {CustomerReportComponent} from "./components/dashboard/customer/report/customer-report-content.component";
import {CustomerUnlockComponent} from "./components/dashboard/customer/unlock-customer.component";

// Charts

// Errors
import {NotFound404Component} from './components/errors/not-found-404.component';

// Forms

// Pipes

// Routes
import {routes} from './app.routes';

// Services
import {WindowService} from './services/window.service';
import {RequestsService} from './services/requests.service';
import {UserSharedService} from './services/user.shared.service';
import {APUtilService} from './services/ap.util.service';
import {CountryService} from './services/country.service';
import {PermissionsService} from './services/permissions.service';

//Constants / Configuration
import {AppConfig} from './configuration/app.config';
import {AdminUpdateService} from "./services/admin-update.service";
import {ExpiredChangePasswordComponent} from "./components/expired-change-password.component";
import {CustomerActivityLogDetailComponent} from "./components/dashboard/customer/activitylog/customer-al-detail.component";
import {AdminPermissionsComponent} from "./components/dashboard/admin/admin-permissions.component";
import {AlexaComponent} from "./components/alexa/alexa.component";
import {CustomerForgotChangePasswordComponent} from "./components/dashboard/customer/customer-forgot-change-password.component";
import {CustomersLoginComponent} from "./components/dashboard/customer/report/customers-login-report.component";
import {PermissionComponent} from "./components/dashboard/new-permission.component";
import {CustomerDeviceComponent} from "./components/dashboard/customer/customer-devices.component";
import {CustomerExpiredChangePasswordComponent} from "./components/dashboard/customer/customer-expired-change-password.component";
import {AdminReportComponent} from "./components/dashboard/admin/report/admin-report-content.component";
import {PermissionAdminsComponent} from "./components/dashboard/admin/report/permission-admins-report.component";
import {AdminLogCustomerReportComponent} from "./components/dashboard/admin/report/admin-log-customer-report.component";
import {RoleSearchComponent} from "./components/dashboard/reports/role-search-report.component";


import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {CustomOption} from "./configuration/CustomOption";

// ========================================================================== //

@NgModule({
    providers: [
        // Services
        WindowService,
        RequestsService,
        UserSharedService,
        APUtilService,
        AppConfig,
        AdminUpdateService,
        CountryService,
        PermissionsService,
        {provide: ToastOptions, useClass: CustomOption},
    ],
    imports: [
        // Modules
        BrowserModule,
        FormsModule,
        HttpModule,
        routes,
        MyDatePickerModule,
        Ng2UploaderModule,
        ToastModule.forRoot(),
        //GlobalModule.forRoot(),
    ],
    declarations: [
        // Third Party Components

        // App Components
        AppComponent,
        MainComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ForgotChangePasswordComponent,
        ExpiredChangePasswordComponent,
        DashboardComponent,
        ProfileComponent,
        SettingsComponent,
        ActivityLogComponent,
        AlexaComponent,

        // Dashboard Components
        HeaderComponent,
        NavigationComponent,
        FooterComponent,
        ContentComponent,
        CustomerComponent,
        PasswordPolicyComponent,
        AdminComponent,
        ReportContentComponent,
        CustomerReportComponent,
        PermissionComponent,
        CustomerDeviceComponent,
        AdminReportComponent,
        PermissionAdminsComponent,

        // Dashboard Page Components
        CustomerDetailComponent,
        CustomerPoliciesComponent,
        CustomerGadgetComponent,
        CustomerActivityLogsComponent,
        CustomerActivityLogDetailComponent,
        AdminPoliciesComponent,
        ResetPasswordComponent,
        AdminAddComponent,
        AdminEditComponent,
        AdminListComponent,
        AdminDetailComponent,
        AdminPermissionsComponent,
        RoleAddComponent,
        RoleEditComponent,
        RoleListComponent,
        RoleDetailComponent,
        NewCustomerComponent,
        CustomerForgotChangePasswordComponent,
        CustomersLoginComponent,
        CustomerUnlockComponent,
        AdminLogCustomerReportComponent,
        RoleSearchComponent,
        CustomerExpiredChangePasswordComponent,
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
