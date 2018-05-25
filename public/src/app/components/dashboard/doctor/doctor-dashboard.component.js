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
var router_1 = require("@angular/router");
var requests_service_1 = require("../../../services/requests.service");
var platform_browser_1 = require("@angular/platform-browser");
var DoctorDashboardComponent = (function () {
    function DoctorDashboardComponent(requestsService, router, titleService) {
        this.requestsService = requestsService;
        this.router = router;
        this.titleService = titleService;
        this.title = "Doctor Dashboard";
    }
    ;
    DoctorDashboardComponent.prototype.ngOnInit = function () {
    };
    DoctorDashboardComponent = __decorate([
        core_1.Component({
            selector: 'doctor-dashboard-component',
            templateUrl: '../../../templates/dashboard/doctor/doctor-dashboard.template.html',
            styleUrls: [],
        }),
        __metadata("design:paramtypes", [requests_service_1.RequestsService,
            router_1.Router,
            platform_browser_1.Title])
    ], DoctorDashboardComponent);
    return DoctorDashboardComponent;
}());
exports.DoctorDashboardComponent = DoctorDashboardComponent;
//# sourceMappingURL=doctor-dashboard.component.js.map