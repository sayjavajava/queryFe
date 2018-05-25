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
var forms_1 = require("@angular/forms");
var requests_service_1 = require("../../../services/requests.service");
var router_1 = require("@angular/router");
var notification_service_1 = require("../../../services/notification.service");
var amazing_time_picker_1 = require("amazing-time-picker");
var app_constants_1 = require("../../../utils/app.constants");
var AddBranchComponent = (function () {
    function AddBranchComponent(router, requestService, fb, notificationService, amazingTimePickerService) {
        var _this = this;
        this.router = router;
        this.requestService = requestService;
        this.fb = fb;
        this.notificationService = notificationService;
        this.amazingTimePickerService = amazingTimePickerService;
        this.examRooms = [];
        this.userSelected = 'doctor';
        this.pDoctor = [];
        this.branchesList = [];
        this.requestService.getRequest(app_constants_1.AppConstants.USER_BY_ROLE + '?name=' + this.userSelected)
            .subscribe(function (response) {
            if (response['responseStatus'] === 'SUCCESS') {
                var data = response['responseData'];
                var userNameData = data;
                _this.pDoctor = response['responseData'];
                console.log(_this.pDoctor);
            }
        }, function (error) {
            _this.error = error.error.error;
        });
        this.allBranches();
    }
    AddBranchComponent.prototype.ngOnInit = function () {
        this.createBranchMendatoryForm();
        console.log('user found:' + this.pDoctor.length);
        this.createBranchForm();
        this.createScheduleForm();
    };
    AddBranchComponent.prototype.createBranchForm = function () {
        this.billingForm = this.fb.group({
            'billingBranch': [null],
            'billingName': [null],
            'billingTaxID': [null],
        });
    };
    AddBranchComponent.prototype.createScheduleForm = function () {
        this.scheduleForm = this.fb.group({
            'showBranchOnline': '',
            'allowOnlineSchedulingInBranch': '',
        });
    };
    AddBranchComponent.prototype.createBranchMendatoryForm = function () {
        this.branchForm = this.fb.group({
            'branchName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'country': [null],
            'state': [null],
            'city': [null],
            'primaryDoctor': [null],
            'zipCode': [null],
            'address': [null],
            'officePhone': [null],
            'fax': [null],
            'formattedAddress': [null],
            'officeHoursStart': [null, forms_1.Validators.required],
            'officeHoursEnd': [null, forms_1.Validators.required],
            'noOfExamRooms': [null],
            'examRooms': this.fb.array([this.createExamRoom()]),
        });
    };
    AddBranchComponent.prototype.prepareSaveBranch = function () {
        var formModel = this.branchForm.value;
        var billingModel = this.billingForm.value;
        var scheduleModel = this.scheduleForm.value;
        var secretLairsDeepCopy = formModel.examRooms.map(function (examRooms) { return Object.assign({}, examRooms); });
        // return new `Hero` object containing a combination of original hero value(s)
        // and deep copies of changed form model values
        var saveBranchModel = {
            branchName: formModel.branchName,
            officeHoursStart: formModel.officeHoursStart,
            officeHoursEnd: formModel.officeHoursEnd,
            noOfExamRooms: formModel.noOfExamRooms,
            state: formModel.state,
            city: formModel.city,
            country: formModel.country,
            primaryDoctor: formModel.primaryDoctor,
            zipCode: formModel.zipCode,
            address: formModel.address,
            officePhone: formModel.officePhone,
            fax: formModel.fax,
            formattedAddress: formModel.formattedAddress,
            examRooms: secretLairsDeepCopy,
            billingBranch: billingModel.billingBranch,
            billingName: billingModel.billingName,
            billingTaxID: billingModel.billingTaxID,
            showBranchOnline: scheduleModel.showBranchOnline,
            allowOnlineSchedulingInBranch: scheduleModel.allowOnlineSchedulingInBranch
        };
        return saveBranchModel;
    };
    AddBranchComponent.prototype.allBranches = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.BRANCHES_NAME)
            .subscribe(function (response) {
            if (response['responseCode'] === 'BRANCH_SUC_01') {
                _this.branchesList = response['responseData'];
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    AddBranchComponent.prototype.addBranch = function (data, value) {
        if (this.branchForm.valid) {
            var branchObject = this.prepareSaveBranch();
            if (value === 'done') {
                this.requestService.postRequest(app_constants_1.AppConstants.ADD_BRANCH, branchObject)
                    .subscribe(function (response) {
                    if (data['responseCode'] === 'BRANCH_ADD_SUCCESS_01') {
                        this.notificationService.success('Branch is Created Successfully');
                    }
                }, function (error) {
                    this.notificationService.error('ERROR', 'Branch is not Created');
                });
            }
        }
        else {
            this.validateAllFormFields(this.branchForm);
        }
    };
    AddBranchComponent.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.validateAllFormFields(control);
            }
        });
    };
    AddBranchComponent.prototype.createExamRoom = function () {
        return this.fb.group({
            'examName': '',
            'allowOnlineScheduling': '',
        });
    };
    AddBranchComponent.prototype.addFields = function (no) {
        this.examRooms = this.branchForm.get('examRooms');
        for (var i = 0; i < no; i++) {
            this.examRooms.push(this.createExamRoom());
        }
    };
    AddBranchComponent.prototype.deleteField = function (index) {
        this.examRooms = this.branchForm.get('examRooms');
        this.examRooms.removeAt(index);
    };
    AddBranchComponent.prototype.getOfficeHoursStart = function () {
        var _this = this;
        var amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.officeHoursStart = time;
            _this.branchForm.controls['officeHoursStart'].setValue(time);
        });
    };
    AddBranchComponent.prototype.getOfficeHoursEnd = function () {
        var _this = this;
        var amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.officeHoursEnd = time;
            _this.branchForm.controls['officeHoursEnd'].setValue(time);
        });
    };
    AddBranchComponent.prototype.getDoctor = function (value) {
        if (value) {
            this.branchForm.controls['primaryDoctor'].setValue(value);
        }
    };
    AddBranchComponent.prototype.getCountry = function (value) {
        if (value) {
            this.branchForm.controls['country'].setValue(value);
        }
    };
    AddBranchComponent.prototype.getState = function (value) {
        if (value) {
            this.branchForm.controls['state'].setValue(value);
        }
    };
    AddBranchComponent.prototype.getBillingBranch = function (value) {
        if (value) {
            this.billingForm.controls['billingBranch'].setValue(value);
        }
    };
    AddBranchComponent.prototype.getZipCode = function (value) {
        if (value) {
            this.branchForm.controls['zipCode'].setValue(value);
        }
    };
    AddBranchComponent.prototype.getNoOfExamRooms = function (value) {
        if (value) {
            // this.examRooms=[];
            this.branchForm.controls['noOfExamRooms'].setValue(value);
            //  this.noOfExamRooms=value;
            this.addFields(value);
        }
    };
    AddBranchComponent.prototype.getSelectedBranch = function (value) {
        if (value) {
            this.billingForm.controls['billingBranch'].setValue(value);
        }
    };
    AddBranchComponent = __decorate([
        core_1.Component({
            selector: 'addbranch-component',
            templateUrl: '../../../templates/dashboard/setting/addbranch.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, requests_service_1.RequestsService,
            forms_1.FormBuilder, notification_service_1.NotificationService,
            amazing_time_picker_1.AmazingTimePickerService])
    ], AddBranchComponent);
    return AddBranchComponent;
}());
exports.AddBranchComponent = AddBranchComponent;
//# sourceMappingURL=addbranch.component.js.map