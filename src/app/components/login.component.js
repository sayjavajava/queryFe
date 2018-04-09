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
var _ = require("lodash");
var requests_service_1 = require("../services/requests.service");
var user_shared_service_1 = require("../services/user.shared.service");
var core_2 = require("angular2-cookie/core");
var permissions_service_1 = require("../services/permissions.service");
var app_constants_1 = require("../utils/app.constants");
var platform_browser_1 = require("@angular/platform-browser");
var app_config_1 = require("../configuration/app.config");
var LoginComponent = (function () {
    function LoginComponent(requestsService, router, userSharedService, _cookieService, permissionsService, titleService, activatedRoute) {
        this.requestsService = requestsService;
        this.router = router;
        this.userSharedService = userSharedService;
        this._cookieService = _cookieService;
        this.permissionsService = permissionsService;
        this.titleService = titleService;
        this.activatedRoute = activatedRoute;
        this.isPasswordExpired = false;
        this.isLoggedInProcessed = false;
    }
    ;
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle("BrightLife Admin - Login");
        if (!window.localStorage.getItem('access_token')) {
            this.activatedRoute.queryParams.subscribe(function (params) {
                _this.clientId = params['client_id'];
                _this.responseType = params['response_type'];
                _this.alexaState = params['state'];
                _this.redirectUri = params['redirect_uri'];
            });
            if (this.alexaState && this.redirectUri && this.clientId && this.responseType) {
                console.log('in method');
                window.localStorage.setItem('state', this.alexaState);
                window.localStorage.setItem('response_type', this.responseType);
                window.localStorage.setItem('redirect_uri', this.redirectUri);
                window.localStorage.setItem('client_id', this.clientId);
            }
            this.router.navigate(['/login']);
        }
    };
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        this.error = null;
        this.isLoggedInProcessed = true;
        // this._cookieService.removeAll();
        _.each(form.form.controls, function (control) {
            control['_touched'] = true;
        });
        this.requestsService.postRequestOauth2Token('/oauth/token', {
            'userName': this.username,
            'password': this.password,
            'grantType': 'password',
        })
            .subscribe(function (response) {
            if (response['token_type'] === 'bearer') {
                window.localStorage.setItem('access_token', response['access_token']);
                window.localStorage.setItem('refresh_token', response['refresh_token']);
                window.localStorage.setItem('expire_in', response['expires_in']);
                // this.router.navigate(['/dashboard/']);
                if (window.localStorage.getItem('client_id') === app_config_1.AppConfig.CLIENT_ID) {
                    _this.requestsService.postRequest('/alexa/signIn', {
                        'userName': _this.username,
                        'password': _this.password,
                        'accessToken': window.localStorage.getItem('access_token'),
                        'refreshToken': window.localStorage.getItem('refresh_token'),
                        'redirectURI': window.localStorage.getItem('redirect_uri'),
                        'state': window.localStorage.getItem('state'),
                        'clientId': app_config_1.AppConfig.CLIENT_ID,
                        'clientSecret': app_config_1.AppConfig.CLIENT_SECRET,
                        'expireIn': window.localStorage.getItem('expire_in'),
                    })
                        .subscribe(function (responseAlexa) {
                        if (responseAlexa['responseCode'] === 'ADM_AUTH_SUC_01') {
                            var uri = responseAlexa['responseData'].redirectURI +
                                '?state=' + responseAlexa['responseData'].state +
                                '&code=' + responseAlexa['responseData'].code;
                            window.localStorage.removeItem('redirect_uri');
                            window.localStorage.removeItem('access_token');
                            window.localStorage.removeItem('refresh_token');
                            window.localStorage.removeItem(btoa('permissions'));
                            _this.isLoggedInProcessed = false;
                            console.log(uri);
                            window.location.href = uri;
                            return;
                        }
                        else {
                            _this.router.navigate(['/login/']);
                            window.localStorage.removeItem('access_token');
                            window.localStorage.removeItem('refresh_token');
                            _this.passwordExpiredToken = null;
                            _this.error = response['responseMessage'];
                            _this.isLoggedInProcessed = false;
                        }
                    }, function (error) {
                        console.log(error.json());
                        _this.error = error.json()['responseMessage'];
                        _this.isLoggedInProcessed = false;
                    });
                }
                else {
                    _this.requestsService.postRequest('/admin/auth/signIn', {
                        'userName': _this.username,
                        'password': _this.password,
                    })
                        .subscribe(function (response) {
                        if (response['responseCode'] === 'ADM_AUTH_SUC_01') {
                            if (_this.remember === true) {
                                _this._cookieService.put(_this.username, _this.password);
                            }
                            _this.userSharedService.firstName = response['responseData'].firstName;
                            _this.userSharedService.lastName = response['responseData'].lastName;
                            _this.userSharedService.profileImg = response['responseData'].profileImg;
                            _this.userSharedService.userDesignation = response['responseData'].role;
                            _this.permissionsService.loadPermissions(response['responseData'].permission);
                            _this.isLoggedInProcessed = false;
                            _this.router.navigate(['/dashboard/']);
                        }
                        else if (response['responseCode'] === 'ADM_AUTH_ERR_02') {
                            window.localStorage.removeItem('access_token');
                            window.localStorage.removeItem('refresh_token');
                            window.localStorage.setItem(app_constants_1.AppConstants.EXPIRE_PASSWORD_TOKEN, response['responseData'].expirePasswordToken);
                            _this.isPasswordExpired = true;
                            _this.isLoggedInProcessed = false;
                            _this.passwordExpiredToken = window.localStorage.getItem(app_constants_1.AppConstants.EXPIRE_PASSWORD_TOKEN);
                        }
                        else {
                            _this.router.navigate(['/login/']);
                            window.localStorage.removeItem('access_token');
                            window.localStorage.removeItem('refresh_token');
                            _this.passwordExpiredToken = null;
                            _this.error = response['responseMessage'];
                            _this.isLoggedInProcessed = false;
                        }
                    }, function (error) {
                        console.log(error.json());
                        _this.error = error.json()['responseMessage'];
                        _this.isLoggedInProcessed = false;
                    });
                }
            }
        }, function (error) {
            console.log(error.json());
            _this.error = error.json()['error_description'];
            _this.isLoggedInProcessed = false;
        });
    };
    LoginComponent.prototype.onChange = function () {
        this.error = null;
    };
    LoginComponent.prototype.getCookie = function () {
        if (this._cookieService.get(this.username) != null) {
            this.password = this._cookieService.get(this.username);
        }
        else {
            this.password = null;
        }
    };
    LoginComponent.prototype.forgotPassword = function () {
        this.router.navigate(['/forgotPassword']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: '../templates/login.template.html',
            styleUrls: ['../styles/login.style.css'],
            providers: [core_2.CookieService]
        }),
        __metadata("design:paramtypes", [requests_service_1.RequestsService,
            router_1.Router, typeof (_a = typeof user_shared_service_1.UserSharedService !== "undefined" && user_shared_service_1.UserSharedService) === "function" && _a || Object, typeof (_b = typeof core_2.CookieService !== "undefined" && core_2.CookieService) === "function" && _b || Object, permissions_service_1.PermissionsService,
            platform_browser_1.Title,
            router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map