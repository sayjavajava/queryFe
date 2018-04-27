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
var AddStaffComponent = (function () {
    function AddStaffComponent(router) {
        this.router = router;
        this.allowdiscount = true;
    }
    AddStaffComponent.prototype.ngOnInit = function () {
    };
    AddStaffComponent.prototype.goTo = function (value) {
        console.log('i am goto' + value);
        if (value) {
            this.checkPermission(value);
        }
    };
    AddStaffComponent.prototype.checkPermission = function (user) {
        this.changeState();
        switch (user) {
            case 'doctor':
                this.doctorPermissions();
                break;
            case 'nurse':
                this.nursePermissions();
                break;
            case 'receptionist':
                this.receptionistPermissions();
                break;
            case 'cashier':
                this.cashierPermissions();
                break;
            default:
                this.doctorPermissions();
        }
    };
    AddStaffComponent.prototype.doctorPermissions = function () {
        this.checkUpInterval = true;
        this.department = true;
        this.dutytimmingshift1 = true;
        this.dutytimmingshift2 = true;
        this.vacation = true;
        this.vacationweek = true;
        this.services = true;
    };
    AddStaffComponent.prototype.nursePermissions = function () {
        this.department = true;
        this.managepatientinvoices = true;
        this.managepatientrecord = true;
        this.dutywithdoctor = true;
    };
    AddStaffComponent.prototype.receptionistPermissions = function () {
        this.allowdiscount = true;
    };
    AddStaffComponent.prototype.cashierPermissions = function () {
        this.allowdiscount = true;
    };
    AddStaffComponent.prototype.changeState = function () {
        this.allowdiscount = false;
        this.department = false;
        this.checkUpInterval = false;
        this.dutytimmingshift1 = false;
        this.dutytimmingshift2 = false;
        this.vacation = false;
        this.vacationweek = false;
        this.services = false;
        this.dutywithdoctor = false;
        this.managepatientrecord = false;
        this.managepatientinvoices = false;
    };
    AddStaffComponent = __decorate([
        core_1.Component({
            selector: 'addstaff-component',
            templateUrl: '../../../templates/dashboard/setting/addstaff.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AddStaffComponent);
    return AddStaffComponent;
}());
exports.AddStaffComponent = AddStaffComponent;
//# sourceMappingURL=addstaff.component.js.map