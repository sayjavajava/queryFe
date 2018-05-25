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
var notification_service_1 = require("../../../services/notification.service");
var requests_service_1 = require("../../../services/requests.service");
var his_util_service_1 = require("../../../services/his-util.service");
var router_1 = require("@angular/router");
var ICDCodeVersionModel_1 = require("../../../models/ICDCodeVersionModel");
var app_constants_1 = require("../../../utils/app.constants");
var CodeVersionComponent = (function () {
    function CodeVersionComponent(notificationService, requestsService, HISUtilService, router) {
        this.notificationService = notificationService;
        this.requestsService = requestsService;
        this.HISUtilService = HISUtilService;
        this.router = router;
        this.iCDCVM = new ICDCodeVersionModel_1.ICDCodeVersionModel();
        this.pages = [];
        this.data = [];
        this.searchCodeVersion = "";
    }
    CodeVersionComponent.prototype.ngOnInit = function () {
        document.title = 'HIS | ICD Code Version';
        if (localStorage.getItem(btoa('access_token'))) {
            this.getCodeVersionsFromServer(0);
        }
    };
    CodeVersionComponent.prototype.versionsPopupLoadByServer = function () {
        var _this = this;
        if (localStorage.getItem(btoa('access_token'))) {
            this.requestsService.getRequest(app_constants_1.AppConstants.ICD_VERSIONS)
                .subscribe(function (response) {
                if (response['responseCode'] === 'ICD_VERSIONS_FOUND_03') {
                    _this.iCDCVM = new ICDCodeVersionModel_1.ICDCodeVersionModel();
                    _this.iCDVersions = [];
                    _this.iCDVersions = response['responseData'];
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    CodeVersionComponent.prototype.codesPopupLoadByServer = function () {
        var _this = this;
        if (localStorage.getItem(btoa('access_token'))) {
            this.requestsService.getRequest(app_constants_1.AppConstants.ICD_CODES)
                .subscribe(function (response) {
                if (response['responseCode'] === 'ICD_SUC_16') {
                    _this.iCDCVM = new ICDCodeVersionModel_1.ICDCodeVersionModel();
                    _this.iCDCodes = [];
                    _this.iCDCodes = response['responseData'];
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    CodeVersionComponent.prototype.onAddICDCVMPopupLoad = function () {
        this.versionsPopupLoadByServer();
        this.codesPopupLoadByServer();
    };
    CodeVersionComponent.prototype.getPageWiseICDs = function (page) {
        this.data = [];
        if (this.searched) {
            this.searchCodeVersionByVersionName(page);
        }
        else {
            this.getCodeVersionsFromServer(page);
        }
    };
    CodeVersionComponent.prototype.refreshCodeVersionTable = function () {
        this.searched = false;
        this.searchCodeVersion = "";
        this.getCodeVersionsFromServer(0);
    };
    CodeVersionComponent.prototype.refreshICDsTable = function (page) {
        this.getCodeVersionsFromServer(page);
    };
    CodeVersionComponent.prototype.deleteCodeVersion = function (associateICDCVId) {
        var _this = this;
        if (localStorage.getItem(btoa('access_token'))) {
            this.requestsService.deleteRequest(app_constants_1.AppConstants.ICD_CODE_VERSION_DELETE_URL + associateICDCVId)
                .subscribe(function (response) {
                if (response['responseCode'] === 'ICD_CODE_VERSION_DEL_SUC_17') {
                    _this.notificationService.success(response['responseMessage'], 'ICD');
                    _this.getPageWiseICDs(_this.currPage);
                }
                else {
                    _this.getPageWiseICDs(_this.currPage);
                    _this.notificationService.error(response['responseMessage'], 'ICD');
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    CodeVersionComponent.prototype.getCodeVersionsFromServer = function (page) {
        var _this = this;
        if (page > 0) {
            page = page;
        }
        this.requestsService.getRequest(app_constants_1.AppConstants.ICD_CODE_VERSIONS + page)
            .subscribe(function (response) {
            if (response['responseCode'] === 'ICD_SUC_16') {
                _this.nextPage = response['responseData']['nextPage'];
                _this.prePage = response['responseData']['prePage'];
                _this.currPage = response['responseData']['currPage'];
                _this.pages = response['responseData']['pages'];
                _this.data = response['responseData']['data'];
            }
        }, function (error) {
            _this.HISUtilService.tokenExpired(error.error.error);
        });
    };
    CodeVersionComponent.prototype.saveCodeVersion = function () {
        var _this = this;
        if (this.iCDCVM.selectedICDVersionId === 0) {
            this.notificationService.error('Please select Version ', 'Association');
            return;
        }
        this.iCDCVM.iCDCodes = this.iCDCodes;
        if (localStorage.getItem(btoa('access_token'))) {
            this.requestsService.postRequest(app_constants_1.AppConstants.ICD_CODE_VERSION_SAVE_URL, JSON.parse(JSON.stringify(this.iCDCVM))).subscribe(function (response) {
                if (response['responseCode'] === 'ICD_ASSOCIATE_SUC_18') {
                    _this.iCDCVM = new ICDCodeVersionModel_1.ICDCodeVersionModel();
                    _this.notificationService.success(response['responseMessage'], 'ICD');
                    document.getElementById('close-btn').click();
                    _this.refreshICDsTable(0);
                }
                else {
                    _this.notificationService.error(response['responseMessage'], 'ICD');
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    CodeVersionComponent.prototype.searchCodeVersionByVersionName = function (page) {
        var _this = this;
        if (localStorage.getItem(btoa('access_token'))) {
            this.searched = true;
            this.requestsService.getRequest(app_constants_1.AppConstants.ICD_CODE_VERSION_SEARCH + page + '?versionName=' + this.searchCodeVersion)
                .subscribe(function (response) {
                if (response['responseCode'] === 'ICD_SUC_02') {
                    _this.nextPage = response['responseData']['nextPage'];
                    _this.prePage = response['responseData']['prePage'];
                    _this.currPage = response['responseData']['currPage'];
                    _this.pages = response['responseData']['pages'];
                    _this.data = response['responseData']['data'];
                }
                else {
                    _this.nextPage = 0;
                    _this.prePage = 0;
                    _this.currPage = 0;
                    _this.pages = [];
                    _this.data = [];
                    _this.notificationService.warn('Not found');
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
    };
    CodeVersionComponent.prototype.versionChanged = function (associatedICDCVId) {
        var _this = this;
        if (associatedICDCVId === 0) {
            for (var _i = 0, _a = this.iCDCodes; _i < _a.length; _i++) {
                var obj = _a[_i];
                obj.checkedCode = false;
            }
            return;
        }
        if (localStorage.getItem(btoa('access_token'))) {
            this.requestsService.getRequest(app_constants_1.AppConstants.ICD_VERSION_CODES_VERSION + associatedICDCVId)
                .subscribe(function (response) {
                if (response['responseCode'] === 'ICD_ASSOCIATED_FOUND_SUC_02') {
                    _this.iCDCVM.selectedICDCodes = [];
                    _this.iCDCVM.selectedICDCodes = response['responseData'];
                    _this.iCDCVM.description = response['responseData'][0].descriptionCodeVersion;
                    for (var _i = 0, _a = _this.iCDCodes; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        obj.checkedCode = false;
                    }
                    for (var _b = 0, _c = _this.iCDCVM.selectedICDCodes; _b < _c.length; _b++) {
                        var selectedICDCode = _c[_b];
                        for (var _d = 0, _e = _this.iCDCodes; _d < _e.length; _d++) {
                            var obj = _e[_d];
                            if (obj.id === selectedICDCode.id) {
                                obj.checkedCode = true;
                            }
                        }
                    }
                }
                else {
                    for (var _f = 0, _g = _this.iCDCodes; _f < _g.length; _f++) {
                        var obj = _g[_f];
                        obj.checkedCode = false;
                    }
                }
            }, function (error) {
                _this.HISUtilService.tokenExpired(error.error.error);
            });
        }
    };
    CodeVersionComponent = __decorate([
        core_1.Component({
            selector: 'manage-icd-component',
            templateUrl: '../../../templates/dashboard/setting/code-version.template.html',
        }),
        __metadata("design:paramtypes", [notification_service_1.NotificationService,
            requests_service_1.RequestsService,
            his_util_service_1.HISUtilService,
            router_1.Router])
    ], CodeVersionComponent);
    return CodeVersionComponent;
}());
exports.CodeVersionComponent = CodeVersionComponent;
//# sourceMappingURL=code-version.component.js.map