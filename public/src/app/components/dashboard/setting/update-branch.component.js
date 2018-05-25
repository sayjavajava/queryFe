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
var router_1 = require("@angular/router");
var requests_service_1 = require("../../../services/requests.service");
var notification_service_1 = require("../../../services/notification.service");
var amazing_time_picker_1 = require("amazing-time-picker");
var app_constants_1 = require("../../../utils/app.constants");
var UpdateBranchComponent = (function () {
    function UpdateBranchComponent(route, router, requestService, fb, notificationService, amazingTimePickerService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.requestService = requestService;
        this.fb = fb;
        this.notificationService = notificationService;
        this.amazingTimePickerService = amazingTimePickerService;
        this.examRooms = [];
        this.userSelected = 'doctor';
        this.pDoctor = [];
        this.requestService.getRequest(app_constants_1.AppConstants.USER_BY_ROLE + '?name=' + this.userSelected)
            .subscribe(function (response) {
            if (response['responseCode'] === 'USER_SUC_01') {
                var data = response['responseData'];
                var userNameData = data;
                _this.pDoctor = response['responseData'];
                console.log(_this.pDoctor);
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    }
    UpdateBranchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createBranchForm();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
        });
        this.createBillingForm();
        this.createScheduleForm();
        this.patchData();
    };
    UpdateBranchComponent.prototype.createBranchForm = function () {
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
    UpdateBranchComponent.prototype.createBillingForm = function () {
        this.billingForm = this.fb.group({
            'billingBranch': [null],
            'billingName': [null],
            'billingTaxID': [null],
        });
    };
    UpdateBranchComponent.prototype.createScheduleForm = function () {
        this.scheduleForm = this.fb.group({
            'showBranchOnline': '',
            'allowOnlineSchedulingInBranch': '',
        });
    };
    UpdateBranchComponent.prototype.createExamRoom = function () {
        return this.fb.group({
            'examName': '',
            'allowOnlineScheduling': '',
        });
    };
    UpdateBranchComponent.prototype.patchData = function () {
        var _this = this;
        if (this.id) {
            this.requestService.findById(app_constants_1.AppConstants.FETCH_BRANCHES_BY_ID + this.id).subscribe(function (branch) {
                //  this.id = user.id;
                _this.branchForm.patchValue({
                    branchName: branch.branchName,
                    officeHoursStart: branch.officeHoursStart,
                    officeHoursEnd: branch.officeHoursEnd,
                    noOfExamRooms: branch.noOfExamRooms,
                    state: branch.state,
                    city: branch.city,
                    primaryDoctor: branch.username,
                    fax: branch.fax,
                    formattedAddress: branch.formattedAddress,
                    country: branch.country,
                    address: branch.address,
                    zipCode: branch.zipCode,
                    officePhone: branch.officePhone,
                });
                _this.billingForm.patchValue({
                    billingBranch: branch.billingBranch,
                    billingName: branch.billingName,
                    billingTaxID: branch.billingTaxID
                });
                _this.scheduleForm.patchValue({
                    showBranchOnline: branch.showBranchOnline,
                    allowOnlineSchedulingInBranch: branch.allowOnlineSchedulingInBranch,
                });
                console.log(branch.zipCode);
                _this.branchForm.controls['zipCode'].patchValue(branch.zipCode);
                _this.addFields(branch.rooms);
                _this.branchForm.controls['examRooms'].patchValue(branch.examRooms);
            }, function (error) {
                //console.log(error.json());
                _this.error = error.error.error_description;
            });
        }
    };
    UpdateBranchComponent.prototype.addBranch = function (data, value) {
        if (this.branchForm.valid) {
            var branchObject = this.prepareSaveBranch();
            if (value === 'done') {
                this.requestService.putRequest(app_constants_1.AppConstants.UPDATE_BRANCH + this.id, branchObject)
                    .subscribe(function (response) {
                    if (response['responseCode'] === 'BRANCH_UPDATE_SUC_01') {
                        this.notificationService.success(' Branch has been Updated Successfully');
                    }
                }, function (error) {
                    this.error = error.error.error_description;
                    this.notificationService.error('ERROR', 'Branch is not updated ');
                });
                console.log(this.branchForm.value);
            }
            else {
                console.log('i am else');
                this.validateAllFormFields(this.branchForm);
            }
        }
    };
    UpdateBranchComponent.prototype.prepareSaveBranch = function () {
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
    UpdateBranchComponent.prototype.isFieldValid = function (field) {
        return !this.branchForm.get(field).valid && this.branchForm.get(field).touched;
    };
    UpdateBranchComponent.prototype.displayFieldCss = function (field) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    };
    UpdateBranchComponent.prototype.validateAllFormFields = function (formGroup) {
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
    UpdateBranchComponent.prototype.cancel = function () {
        this.router.navigate(['/dashboard/setting/staff']);
    };
    UpdateBranchComponent.prototype.getOfficeHoursStart = function () {
        var _this = this;
        var amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.officeHoursStart = time;
            _this.branchForm.controls['officeHoursStart'].setValue(time);
        });
    };
    UpdateBranchComponent.prototype.getOfficeHoursEnd = function () {
        var _this = this;
        var amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.officeHoursEnd = time;
            _this.branchForm.controls['officeHoursEnd'].setValue(time);
        });
    };
    UpdateBranchComponent.prototype.getDoctor = function (value) {
        if (value) {
            this.branchForm.controls['primaryDoctor'].setValue(value);
        }
    };
    UpdateBranchComponent.prototype.getCountry = function (value) {
        if (value) {
            this.branchForm.controls['country'].setValue(value);
        }
    };
    UpdateBranchComponent.prototype.getState = function (value) {
        if (value) {
            this.branchForm.controls['country'].setValue(value);
        }
    };
    UpdateBranchComponent.prototype.getBillingBranch = function (value) {
        if (value) {
            this.billingForm.controls['billingBranch'].setValue(value);
        }
    };
    UpdateBranchComponent.prototype.getZipCode = function (value) {
        if (value) {
            this.branchForm.controls['zipCode'].setValue(value);
        }
    };
    UpdateBranchComponent.prototype.getNoOfExamRooms = function (value) {
        if (value) {
            this.branchForm.controls['noOfExamRooms'].setValue(value);
            //  this.noOfExamRooms=value;
            this.addFields(value);
        }
    };
    UpdateBranchComponent.prototype.addFields = function (no) {
        this.examRooms = this.branchForm.get('examRooms');
        for (var i = 0; i < no; i++) {
            this.examRooms.push(this.createExamRoom());
        }
    };
    UpdateBranchComponent = __decorate([
        core_1.Component({
            selector: 'update-branch-component',
            templateUrl: '../../../templates/dashboard/setting/update-branch.template.html',
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            requests_service_1.RequestsService,
            forms_1.FormBuilder,
            notification_service_1.NotificationService,
            amazing_time_picker_1.AmazingTimePickerService])
    ], UpdateBranchComponent);
    return UpdateBranchComponent;
}());
exports.UpdateBranchComponent = UpdateBranchComponent;
//# sourceMappingURL=update-branch.component.js.map