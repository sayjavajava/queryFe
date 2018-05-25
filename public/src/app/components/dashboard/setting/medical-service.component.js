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
var requests_service_1 = require("../../../services/requests.service");
var notification_service_1 = require("../../../services/notification.service");
var his_util_service_1 = require("../../../services/his-util.service");
var app_constants_1 = require("../../../utils/app.constants");
var MedicalServiceSearchModel_1 = require("../../../models/MedicalServiceSearchModel");
var MedicalServiceComponent = (function () {
    function MedicalServiceComponent(notificationService, requestsService, HISUtilService) {
        this.notificationService = notificationService;
        this.requestsService = requestsService;
        this.HISUtilService = HISUtilService;
        this.pages = [];
        this.dataMD = [];
        this.branches = [];
        this.departments = [];
        this.searchMSModel = new MedicalServiceSearchModel_1.MedicalServiceSearchModel();
    }
    MedicalServiceComponent.prototype.ngOnInit = function () {
        document.title = 'HIS | Medical Services';
        if (localStorage.getItem(btoa('access_token'))) {
            this.getMedicalServicesFromServer(0);
        }
        this.getBranchesFromServer();
        this.getDepartmentsFromServer();
    };
    MedicalServiceComponent.prototype.refreshMedicalServices = function () {
        this.searchMSModel = new MedicalServiceSearchModel_1.MedicalServiceSearchModel();
        this.getMedicalServicesFromServer(0);
    };
    MedicalServiceComponent.prototype.getPageWiseMedicalServicesFromServer = function (page) {
        this.dataMD = [];
        if (this.searchMSModel.searched) {
            this.searchByMedicalServiceParams(page);
        }
        else {
            this.getMedicalServicesFromServer(page);
        }
    };
    MedicalServiceComponent.prototype.getMedicalServicesFromServer = function (page) {
        var _this = this;
        if (page > 0) {
            page = page;
        }
        this.requestsService.getRequest(app_constants_1.AppConstants.FETCH_ALL_MEDICAL_SERVICES_URL + page)
            .subscribe(function (response) {
            if (response['responseCode'] === 'MED_SER_SUC_01') {
                _this.nextPage = response['responseData']['nextPage'];
                _this.prePage = response['responseData']['prePage'];
                _this.currPage = response['responseData']['currPage'];
                _this.pages = response['responseData']['pages'];
                _this.dataMD = response['responseData']['data'];
            }
        }, function (error) {
            _this.HISUtilService.tokenExpired(error.error.error);
        });
    };
    MedicalServiceComponent.prototype.deleteMedicalServices = function (msId, dptId, branchId) {
        var _this = this;
        if (msId > 0) {
            this.requestsService.deleteRequest(app_constants_1.AppConstants.DELETE_MEDICAL_SERVICES_URL + 'msId=' + msId + '&dptId=' + dptId + '&branchId=' + branchId)
                .subscribe(function (response) {
                if (response['responseCode'] === 'MED_SER_SUC_02') {
                    _this.notificationService.success(response['responseMessage'], 'Medical Service');
                    _this.getMedicalServicesFromServer(_this.currPage);
                }
                else {
                    _this.notificationService.error(response['responseMessage'], 'Medical Service');
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
    };
    MedicalServiceComponent.prototype.searchByMedicalServiceParams = function (page) {
        var _this = this;
        if (localStorage.getItem(btoa('access_token'))) {
            //this.searchMSModel.searchServiceId = this.searchMSModel.searchServiceId > 0 ? this.searchMSModel.searchServiceId : 0;
            this.searchMSModel.searchServiceName = this.searchMSModel.searchServiceName.length > 0 ? this.searchMSModel.searchServiceName : "";
            this.searchMSModel.searchBranchId = this.searchMSModel.searchBranchId > 0 ? this.searchMSModel.searchBranchId : 0;
            this.searchMSModel.departmentId = this.searchMSModel.departmentId > 0 ? this.searchMSModel.departmentId : 0;
            this.searchMSModel.searchServiceFee = this.searchMSModel.searchServiceFee > 0 ? this.searchMSModel.searchServiceFee : 0;
            this.searchMSModel.searched = true;
            this.requestsService.getRequest(app_constants_1.AppConstants.MEDICAL_SERVICE_SEARCH + page
                + '?serviceId=' + this.searchMSModel.searchServiceId
                + '&serviceName=' + this.searchMSModel.searchServiceName
                + '&branchId=' + this.searchMSModel.searchBranchId
                + '&departmentId=' + this.searchMSModel.departmentId
                + '&serviceFee=' + this.searchMSModel.searchServiceFee)
                .subscribe(function (response) {
                if (response['responseCode'] === 'MED_SER_SUC_05') {
                    _this.nextPage = response['responseData']['nextPage'];
                    _this.prePage = response['responseData']['prePage'];
                    _this.currPage = response['responseData']['currPage'];
                    _this.pages = response['responseData']['pages'];
                    _this.dataMD = response['responseData']['data'];
                    _this.notificationService.success(response['responseMessage'], 'Medical Services');
                }
                else {
                    _this.nextPage = 0;
                    _this.prePage = 0;
                    _this.currPage = 0;
                    _this.pages = [];
                    _this.dataMD = [];
                    _this.notificationService.error(response['responseMessage'], 'Medical Services');
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
    };
    MedicalServiceComponent.prototype.getBranchesFromServer = function () {
        var _this = this;
        this.requestsService.getRequest(app_constants_1.AppConstants.FETCH_ALL_BRANCHES_URL)
            .subscribe(function (response) {
            if (response['responseCode'] === 'BR_SUC_01') {
                _this.branches = response['responseData'];
            }
        }, function (error) {
            _this.HISUtilService.tokenExpired(error.error.error);
        });
    };
    MedicalServiceComponent.prototype.getDepartmentsFromServer = function () {
        var _this = this;
        this.requestsService.getRequest(app_constants_1.AppConstants.FETCH_ALL_CLINICAL_DEPARTMENTS_URI)
            .subscribe(function (response) {
            if (response['responseCode'] === 'CLI_DPT_SUC_01') {
                _this.departments = response['responseData'];
            }
        }, function (error) {
            _this.HISUtilService.tokenExpired(error.error.error);
        });
    };
    MedicalServiceComponent = __decorate([
        core_1.Component({
            selector: 'medical-services-component',
            templateUrl: '../../../templates/dashboard/setting/medical-services.template.html',
        }),
        __metadata("design:paramtypes", [notification_service_1.NotificationService,
            requests_service_1.RequestsService,
            his_util_service_1.HISUtilService])
    ], MedicalServiceComponent);
    return MedicalServiceComponent;
}());
exports.MedicalServiceComponent = MedicalServiceComponent;
//# sourceMappingURL=medical-service.component.js.map