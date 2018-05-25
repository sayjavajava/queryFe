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
var forms_1 = require("@angular/forms");
var PasswordValidation_1 = require("./PasswordValidation");
var User_1 = require("../../../model/User");
var notification_service_1 = require("../../../services/notification.service");
var AddReceptionistComponent = (function () {
    function AddReceptionistComponent(route, router, requestService, fb, notificationService) {
        this.route = route;
        this.router = router;
        this.requestService = requestService;
        this.fb = fb;
        this.notificationService = notificationService;
        this.firstNameError = 'First name is required';
        this.userNameError = 'User name is required';
        this.emailError = 'Email is required';
        this.passwordError = 'Password is required';
        this.confirmPasswordError = 'Password must be equal';
        this.primaryBranchError = 'Select Primary Branch';
        this.restrictBranchError = 'Select Restrict Branch';
        this.departmentError = 'Select one or more Departments';
        this.serviceError = 'Select one or more Services';
        this.dutyTimmingShiftError = 'Select Duty Time';
    }
    AddReceptionistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createUserForm();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
        });
        this.patchData();
    };
    AddReceptionistComponent.prototype.createUserForm = function () {
        this.userForm = this.fb.group({
            'firstName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'lastName': [null],
            'userName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.pattern('^[a-z0-9_-]{4,15}$')])],
            'password': [null],
            'confirmPassword': [null],
            'homePhone': [null, forms_1.Validators.required],
            'cellPhone': [null],
            'primaryBranch': [null, forms_1.Validators.required],
            'interval': [null],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            'restrictBranch': [null],
            'allowDiscount': [null],
            'otherDashboard': '',
            'sendBillingReport': '',
            'useReceptDashboard': '',
            'shift2': '',
            'vacation': '',
            'otherDoctorDashboard': '',
            'accountExpiry': [null],
            'active': '',
            'dateFrom': [null],
            'dateTo': [null],
            'managePatientInvoices': '',
            'managePatientRecords': '',
            'departmentControl': [null],
            'servicesControl': [null],
            'shift1': [null],
            'nurseDutyWithDoctor': [null],
            'changeUser': [null]
        }, {
            validator: PasswordValidation_1.CustomValidators.Match('password', 'confirmPassword')
        });
    };
    AddReceptionistComponent.prototype.patchData = function () {
        var _this = this;
        if (this.id) {
            this.requestService.findById('/user/get/' + this.id).subscribe(function (receptionist) {
                //  this.id = user.id;
                _this.userForm.patchValue({
                    firstName: receptionist.profile.firstName,
                    lastName: receptionist.profile.lastName,
                    email: receptionist.email,
                    homePhone: receptionist.profile.homePhone,
                    cellPhone: receptionist.profile.cellPhone,
                    sendBillingReport: receptionist.profile.sendBillingReport,
                    userName: receptionist.username,
                    active: receptionist.active,
                    accountExpiry: receptionist.profile.accountExpiry,
                    otherDashboard: receptionist.profile.otherDashboard,
                    useReceptDashboard: receptionist.profile.useReceptDashBoard,
                    otherDoctorDashBoard: receptionist.profile.otherDoctorDashBoard,
                    primaryBranch: receptionist.primaryBranch
                });
            }, function (error) {
                //console.log(error.json());
                _this.error = error.error.error_description;
            });
        }
    };
    AddReceptionistComponent.prototype.addReceptionist = function (data) {
        console.log('i am invalid');
        if (this.userForm.valid) {
            console.log('i am receptionist submit' + data);
            var receptionist = new User_1.User({
                userType: 'receptionist',
                firstName: data.firstName,
                lastName: data.lastName,
                userName: data.userName,
                password: data.password,
                homePhone: data.homePhone,
                cellPhone: data.cellPhone,
                sendBillingReport: data.sendBillingReport,
                useReceptDashboard: data.useReceptDashboard,
                otherDashboard: data.otherDashboard,
                accountExpiry: data.accountExpiry,
                primaryBranch: data.primaryBranch,
                email: data.email,
                selectedRestrictBranch: data.selectedRestrictBranch,
                otherDoctorDashBoard: data.otherDoctorDashBoard,
                active: data.active,
                allowDiscount: data.allowDiscount,
            });
            this.makeService(receptionist);
        }
        else {
            console.log('i am else');
            this.validateAllFormFields(this.userForm);
        }
    };
    AddReceptionistComponent.prototype.makeService = function (user) {
        var _this = this;
        this.requestService.putRequest('/user/edit/' + this.id, user).subscribe(function (response) {
            if (response['responseStatus'] === 'SUCCESS') {
                console.log('saved00');
                _this.responseUser = response['responseData'];
                _this.notificationService.success('User has been updated Successfully');
                _this.router.navigate(['/dashboard/setting/staff']);
            }
        }, function (error) {
            //console.log(error.json());
            _this.error = error.error.error_description;
            _this.notificationService.error('ERROR', 'User is not Updated');
        });
    };
    AddReceptionistComponent.prototype.isFieldValid = function (field) {
        return !this.userForm.get(field).valid && this.userForm.get(field).touched;
    };
    AddReceptionistComponent.prototype.displayFieldCss = function (field) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    };
    AddReceptionistComponent.prototype.getBranch = function (value) {
        if (value) {
            this.userForm.controls['primaryBranch'].setValue(value);
        }
    };
    AddReceptionistComponent.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            //console.log(field);
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.validateAllFormFields(control);
            }
        });
    };
    AddReceptionistComponent.prototype.cancel = function () {
        this.router.navigate(['/dashboard/setting/staff']);
    };
    AddReceptionistComponent = __decorate([
        core_1.Component({
            selector: 'addreceptionist-component',
            templateUrl: '../../../templates/dashboard/setting/addreceptionist.template.html',
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, requests_service_1.RequestsService,
            forms_1.FormBuilder, notification_service_1.NotificationService])
    ], AddReceptionistComponent);
    return AddReceptionistComponent;
}());
exports.AddReceptionistComponent = AddReceptionistComponent;
//# sourceMappingURL=addreceptionist.component.js.map