"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var amazing_time_picker_1 = require("amazing-time-picker");
var datepicker_1 = require("@angular/material/datepicker");
// App Components
var app_component_1 = require("./components/app.component");
var main_component_1 = require("./components/dashboard/main.component");
var login_component_1 = require("./components/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
// Dashboard Components
var header_component_1 = require("./components/dashboard/header.component");
var navigation_component_1 = require("./components/dashboard/navigation.component");
var footer_component_1 = require("./components/dashboard/footer.component");
var content_component_1 = require("./components/dashboard/content.component");
// Errors
var not_found_404_component_1 = require("./components/errors/not-found-404.component");
// Routes
var app_routes_1 = require("./app.routes");
// Services
var requests_service_1 = require("./services/requests.service");
var his_util_service_1 = require("./services/his-util.service");
var permissions_service_1 = require("./services/permissions.service");
var app_config_1 = require("./configuration/app.config");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_toastr_1 = require("ng2-toastr");
var CustomOption_1 = require("./configuration/CustomOption");
var doctor_dashboard_component_1 = require("./components/dashboard/doctor/doctor-dashboard.component");
var http_1 = require("@angular/common/http");
var user_shared_service_1 = require("./services/user.shared.service");
var setting_component_1 = require("./components/dashboard/setting/setting.component");
var setting_navigation_component_1 = require("./components/dashboard/setting/setting-navigation.component");
var staff_component_1 = require("./components/dashboard/setting/staff.component");
var icd_component_1 = require("./components/dashboard/setting/icd.component");
var department_component_1 = require("./components/dashboard/setting/department.component");
var cashier_component_1 = require("./components/dashboard/setting/cashier.component");
var medical_service_component_1 = require("./components/dashboard/setting/medical-service.component");
var nurse_component_1 = require("./components/dashboard/setting/nurse.component");
var receptionist_component_1 = require("./components/dashboard/setting/receptionist.component");
var branch_component_1 = require("./components/dashboard/setting/branch.component");
var updatecashier_component_1 = require("./components/dashboard/setting/updatecashier.component");
var role_permissions_component_1 = require("./components/dashboard/setting/role-permissions.component");
var updatedoctor_component_1 = require("./components/dashboard/setting/updatedoctor.component");
var updatenurse_component_1 = require("./components/dashboard/setting/updatenurse.component");
var addreceptionist_component_1 = require("./components/dashboard/setting/addreceptionist.component");
var addbranch_component_1 = require("./components/dashboard/setting/addbranch.component");
var material_1 = require("@angular/material");
var notification_service_1 = require("./services/notification.service");
var organization_component_1 = require("./components/dashboard/setting/organization.component");
var addorganization_component_1 = require("./components/dashboard/setting/addorganization.component");
var addstaff_component_1 = require("./components/dashboard/setting/addstaff.component");
var errordisplay_component_1 = require("./components/dashboard/setting/errordisplay.component");
var confirmationdialog_component_1 = require("./components/dashboard/confirmationdialog.component");
var ConformationDialogService_1 = require("./services/ConformationDialogService");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.prototype.ngOnInit = function () {
    };
    AppModule = __decorate([
        core_1.NgModule({
            providers: [
                // Services
                requests_service_1.RequestsService,
                notification_service_1.NotificationService,
                his_util_service_1.HISUtilService,
                app_config_1.AppConfig,
                permissions_service_1.PermissionsService,
                { provide: ng2_toastr_1.ToastOptions, useClass: CustomOption_1.CustomOption },
                user_shared_service_1.UserSharedService,
                ConformationDialogService_1.ConformationDialogService
            ],
            entryComponents: [confirmationdialog_component_1.ConfirmationdialogComponent],
            imports: [
                // Modules
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routes_1.routes,
                animations_1.BrowserAnimationsModule,
                material_1.MatButtonModule,
                http_1.HttpClientModule,
                material_1.MatSnackBarModule,
                amazing_time_picker_1.AmazingTimePickerModule,
                material_1.MatFormFieldModule,
                datepicker_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                material_1.MatInputModule,
                material_1.MatIconModule,
            ],
            declarations: [
                // App Components
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                doctor_dashboard_component_1.DoctorDashboardComponent,
                // Dashboard Components
                header_component_1.HeaderComponent,
                navigation_component_1.NavigationComponent,
                footer_component_1.FooterComponent,
                content_component_1.ContentComponent,
                not_found_404_component_1.NotFound404Component,
                //Setting Components
                setting_component_1.SettingComponent,
                setting_navigation_component_1.SettingNavigationComponent,
                staff_component_1.StaffComponent,
                icd_component_1.ICDComponent,
                department_component_1.DepartmentComponent,
                cashier_component_1.CashierComponent,
                medical_service_component_1.MedicalServiceComponent,
                nurse_component_1.NurseComponent,
                receptionist_component_1.ReceptionistComponent,
                branch_component_1.BranchComponent,
                updatecashier_component_1.UpdateCashierComponent,
                role_permissions_component_1.RolePermissionsComponent,
                updatedoctor_component_1.UpdatedoctorComponent,
                updatenurse_component_1.UpdateNurseComponent,
                addreceptionist_component_1.AddReceptionistComponent,
                addbranch_component_1.AddBranchComponent,
                organization_component_1.OrganizationComponent,
                addorganization_component_1.AddOrganizationComponent,
                addstaff_component_1.AddStaffComponent,
                errordisplay_component_1.ErrordisplayComponent,
                confirmationdialog_component_1.ConfirmationdialogComponent,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map