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
var permissions_service_1 = require("../../services/permissions.service");
var NavigationComponent = (function () {
    function NavigationComponent(requestsService, router, userSharedService, permissionsService) {
        this.requestsService = requestsService;
        this.router = router;
        this.userSharedService = userSharedService;
        this.permissionsService = permissionsService;
    }
    ;
    NavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
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
                //console.log(error.json())
            });
        }
    };
    NavigationComponent.prototype.logout = function () {
        window.localStorage.removeItem('access_token');
        this.router.navigate(['/login/']);
    };
    NavigationComponent.prototype.populatePasswordPolicy = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/dashboard/passwordPolicies']);
        }
    };
    NavigationComponent.prototype.goToActivityLog = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/activityLogs']);
        }
    };
    NavigationComponent.prototype.goToAdminProfile = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/profile']);
        }
    };
    NavigationComponent.prototype.goToAdminSettings = function () {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/settings']);
        }
    };
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'navigation-component',
            templateUrl: '../../templates/dashboard/navigation.template.html',
            styleUrls: ['../../styles/dashboard/navigation.style.css']
        }),
        __metadata("design:paramtypes", [requests_service_1.RequestsService,
            router_1.Router, typeof (_a = typeof user_shared_service_1.UserSharedService !== "undefined" && user_shared_service_1.UserSharedService) === "function" && _a || Object, permissions_service_1.PermissionsService])
    ], NavigationComponent);
    return NavigationComponent;
    var _a;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map