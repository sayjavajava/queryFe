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
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
// Third Party Components
var mydatepicker_1 = require("mydatepicker");
var ng2_uploader_1 = require("ng2-uploader");
// App Components
var app_component_1 = require("./components/app.component");
var main_component_1 = require("./components/dashboard/main.component");
var login_component_1 = require("./components/login.component");
var forgot_password_component_1 = require("./components/forgot-password.component");
var forgot_change_password_component_1 = require("./components/forgot-change-password.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var profile_component_1 = require("./components/admin/profile.component");
var settings_component_1 = require("./components/admin/settings.component");
var activity_log_component_1 = require("./components/admin/activity-log.component");
// Dashboard Components
var header_component_1 = require("./components/dashboard/header.component");
var navigation_component_1 = require("./components/dashboard/navigation.component");
var footer_component_1 = require("./components/dashboard/footer.component");
var content_component_1 = require("./components/dashboard/content.component");
var customer_component_1 = require("./components/dashboard/customer/customer.component");
var new_customer_component_1 = require("./components/dashboard/customer/new-customer.component");
var password_policy_component_1 = require("./components/dashboard/password.policy.component");
var admin_component_1 = require("./components/dashboard/admin/admin.component");
// Dashboard Page Components
var customer_detail_component_1 = require("./components/dashboard/customer/customer-detail.component");
var customer_policies_component_1 = require("./components/dashboard/customer/customer-policies.component");
var customer_gadget_component_1 = require("./components/dashboard/customer/customer-gadget.component");
var customer_activitylogs_component_1 = require("./components/dashboard/customer/activitylog/customer-activitylogs.component");
var admin_policies_component_1 = require("./components/dashboard/admin/admin-policies.component");
var customer_reset_password_component_1 = require("./components/dashboard/customer/customer-reset-password.component");
var admin_add_component_1 = require("./components/dashboard/admin/admin-add.component");
var admin_edit_component_1 = require("./components/dashboard/admin/admin-edit.component");
var admin_list_component_1 = require("./components/dashboard/admin/admin-list.component");
var admin_detail_component_1 = require("./components/dashboard/admin/admin-detail.component");
var role_add_component_1 = require("./components/dashboard/role/role-add.component");
var role_edit_component_1 = require("./components/dashboard/role/role-edit.component");
var role_list_component_1 = require("./components/dashboard/role/role-list.component");
var role_detail_component_1 = require("./components/dashboard/role/role-detail.component");
var report_content_component_1 = require("./components/dashboard/report-content.component");
var customer_report_content_component_1 = require("./components/dashboard/customer/report/customer-report-content.component");
var unlock_customer_component_1 = require("./components/dashboard/customer/unlock-customer.component");
// Charts
// Errors
var not_found_404_component_1 = require("./components/errors/not-found-404.component");
// Forms
// Pipes
// Routes
var app_routes_1 = require("./app.routes");
// Services
var window_service_1 = require("./services/window.service");
var requests_service_1 = require("./services/requests.service");
var user_shared_service_1 = require("./services/user.shared.service");
var ap_util_service_1 = require("./services/ap.util.service");
var country_service_1 = require("./services/country.service");
var permissions_service_1 = require("./services/permissions.service");
//Constants / Configuration
var app_config_1 = require("./configuration/app.config");
var admin_update_service_1 = require("./services/admin-update.service");
var expired_change_password_component_1 = require("./components/expired-change-password.component");
var customer_al_detail_component_1 = require("./components/dashboard/customer/activitylog/customer-al-detail.component");
var admin_permissions_component_1 = require("./components/dashboard/admin/admin-permissions.component");
var alexa_component_1 = require("./components/alexa/alexa.component");
var customer_forgot_change_password_component_1 = require("./components/dashboard/customer/customer-forgot-change-password.component");
var customers_login_report_component_1 = require("./components/dashboard/customer/report/customers-login-report.component");
var new_permission_component_1 = require("./components/dashboard/new-permission.component");
var customer_devices_component_1 = require("./components/dashboard/customer/customer-devices.component");
var customer_expired_change_password_component_1 = require("./components/dashboard/customer/customer-expired-change-password.component");
var admin_report_content_component_1 = require("./components/dashboard/admin/report/admin-report-content.component");
var permission_admins_report_component_1 = require("./components/dashboard/admin/report/permission-admins-report.component");
var admin_log_customer_report_component_1 = require("./components/dashboard/admin/report/admin-log-customer-report.component");
var role_search_report_component_1 = require("./components/dashboard/reports/role-search-report.component");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var CustomOption_1 = require("./configuration/CustomOption");
// ========================================================================== //
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.prototype.ngOnInit = function () {
    };
    AppModule = __decorate([
        core_1.NgModule({
            providers: [
                // Services
                window_service_1.WindowService,
                requests_service_1.RequestsService,
                user_shared_service_1.UserSharedService,
                ap_util_service_1.APUtilService,
                app_config_1.AppConfig,
                admin_update_service_1.AdminUpdateService,
                country_service_1.CountryService,
                permissions_service_1.PermissionsService,
                { provide: ng2_toastr_1.ToastOptions, useClass: CustomOption_1.CustomOption },
            ],
            imports: [
                // Modules
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routes_1.routes,
                mydatepicker_1.MyDatePickerModule,
                ng2_uploader_1.Ng2UploaderModule,
                ng2_toastr_1.ToastModule.forRoot(),
            ],
            declarations: [
                // Third Party Components
                // App Components
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                login_component_1.LoginComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                forgot_change_password_component_1.ForgotChangePasswordComponent,
                expired_change_password_component_1.ExpiredChangePasswordComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent,
                settings_component_1.SettingsComponent,
                activity_log_component_1.ActivityLogComponent,
                alexa_component_1.AlexaComponent,
                // Dashboard Components
                header_component_1.HeaderComponent,
                navigation_component_1.NavigationComponent,
                footer_component_1.FooterComponent,
                content_component_1.ContentComponent,
                customer_component_1.CustomerComponent,
                password_policy_component_1.PasswordPolicyComponent,
                admin_component_1.AdminComponent,
                report_content_component_1.ReportContentComponent,
                customer_report_content_component_1.CustomerReportComponent,
                new_permission_component_1.PermissionComponent,
                customer_devices_component_1.CustomerDeviceComponent,
                admin_report_content_component_1.AdminReportComponent,
                permission_admins_report_component_1.PermissionAdminsComponent,
                // Dashboard Page Components
                customer_detail_component_1.CustomerDetailComponent,
                customer_policies_component_1.CustomerPoliciesComponent,
                customer_gadget_component_1.CustomerGadgetComponent,
                customer_activitylogs_component_1.CustomerActivityLogsComponent,
                customer_al_detail_component_1.CustomerActivityLogDetailComponent,
                admin_policies_component_1.AdminPoliciesComponent,
                customer_reset_password_component_1.ResetPasswordComponent,
                admin_add_component_1.AdminAddComponent,
                admin_edit_component_1.AdminEditComponent,
                admin_list_component_1.AdminListComponent,
                admin_detail_component_1.AdminDetailComponent,
                admin_permissions_component_1.AdminPermissionsComponent,
                role_add_component_1.RoleAddComponent,
                role_edit_component_1.RoleEditComponent,
                role_list_component_1.RoleListComponent,
                role_detail_component_1.RoleDetailComponent,
                new_customer_component_1.NewCustomerComponent,
                customer_forgot_change_password_component_1.CustomerForgotChangePasswordComponent,
                customers_login_report_component_1.CustomersLoginComponent,
                unlock_customer_component_1.CustomerUnlockComponent,
                admin_log_customer_report_component_1.AdminLogCustomerReportComponent,
                role_search_report_component_1.RoleSearchComponent,
                customer_expired_change_password_component_1.CustomerExpiredChangePasswordComponent,
                // Charts
                // Errors
                not_found_404_component_1.NotFound404Component,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map