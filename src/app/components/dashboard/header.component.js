"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var requests_service_1 = require("../../services/requests.service");
var router_1 = require("@angular/router");
var user_shared_service_1 = require("../../services/user.shared.service");
var ap_util_service_1 = require("../../services/ap.util.service");
var admin_update_service_1 = require("../../services/admin-update.service");
var permissions_service_1 = require("../../services/permissions.service");
var HeaderComponent = (function () {
    function HeaderComponent(requestsService, router, userSharedService, apUtilServer, adminUpdateService, permissionsService) {
        this.requestsService = requestsService;
        this.router = router;
        this.userSharedService = userSharedService;
        this.apUtilServer = apUtilServer;
        this.adminUpdateService = adminUpdateService;
        this.permissionsService = permissionsService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminUpdateService.newSubject.subscribe(function (profileImgUrl) { return _this.profileImg = profileImgUrl; });
        if (window.localStorage.getItem('access_token')) {
            this.requestsService.getRequest('/admin/', {})
                .subscribe(function (response) {
                if (response['responseCode'] === 'ADM_SUC_08') {
                    _this.userSharedService.firstName = response['responseData'].firstName;
                    _this.userSharedService.lastName = response['responseData'].lastName;
                    _this.userSharedService.profileImg = response['responseData'].profileImg;
                    _this.userSharedService.userDesignation = response['responseData'].role;
                    _this.firstName = _this.userSharedService.firstName;
                    _this.lastName = _this.userSharedService.lastName;
                    _this.profileImg = _this.userSharedService.profileImg;
                    _this.userDesignation = _this.userSharedService.userDesignation;
                }
            }, function (error) {
                _this.apUtilServer.tokenExpired(error.json()['error']);
                //console.log(error.json())
            });
        }
    };
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        this.requestsService.postRequest('/admin/auth/signOut/', {})
            .subscribe(function (response) {
            if (response['responseCode'] === 'ADM_SUC_07') {
                window.localStorage.removeItem('access_token');
                window.localStorage.removeItem('state');
                window.localStorage.removeItem('client_id');
                window.localStorage.removeItem('response_type');
                window.localStorage.removeItem('redirect_uri');
                window.localStorage.removeItem('expire_in');
                window.localStorage.removeItem('refresh_token');
                window.localStorage.removeItem(btoa('permissions'));
                _this.router.navigate(['/login']);
            }
            else {
                window.localStorage.removeItem('access_token');
                window.localStorage.removeItem(btoa('permissions'));
                window.localStorage.removeItem('state');
                window.localStorage.removeItem('client_id');
                window.localStorage.removeItem('response_type');
                window.localStorage.removeItem('redirect_uri');
                window.localStorage.removeItem('expire_in');
                window.localStorage.removeItem('refresh_token');
                _this.router.navigate(['/login']);
            }
        }, function (error) {
            //console.log(error.json())
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('state');
            window.localStorage.removeItem('client_id');
            window.localStorage.removeItem('response_type');
            window.localStorage.removeItem('redirect_uri');
            window.localStorage.removeItem('expire_in');
            window.localStorage.removeItem('refresh_token');
            window.localStorage.removeItem(btoa('permissions'));
            _this.router.navigate(['/login']);
        });
    };
    HeaderComponent.prototype.goToAdminProfile = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/profile']);
        }
    };
    HeaderComponent.prototype.createNewCustomer = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/dashboard/customer/add']);
        }
    };
    HeaderComponent.prototype.goToActivityLog = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/activityLogs']);
        }
    };
    HeaderComponent.prototype.goToAdminSettings = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/settings']);
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-component',
            templateUrl: '../../templates/dashboard/header.template.html',
            styleUrls: ['../../styles/dashboard/header.style.css']
        }),
        __metadata("design:paramtypes", [requests_service_1.RequestsService,
            router_1.Router, typeof (_a = typeof user_shared_service_1.UserSharedService !== "undefined" && user_shared_service_1.UserSharedService) === "function" && _a || Object, ap_util_service_1.APUtilService, typeof (_b = typeof admin_update_service_1.AdminUpdateService !== "undefined" && admin_update_service_1.AdminUpdateService) === "function" && _b || Object, permissions_service_1.PermissionsService])
    ], HeaderComponent);
    return HeaderComponent;
    var _a, _b;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map