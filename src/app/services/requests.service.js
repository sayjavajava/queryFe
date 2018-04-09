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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var router_1 = require("@angular/router");
var app_config_1 = require("../configuration/app.config");
var RequestsService = (function () {
    function RequestsService(http, router, appConfig) {
        this.http = http;
        this.router = router;
        this.appConfig = appConfig;
    }
    ;
    RequestsService.prototype.getThisUrl = function () {
    };
    RequestsService.prototype.getToken = function () {
        return window.localStorage.getItem('access_token');
    };
    RequestsService.prototype.postRequestOauth2Token = function (url, _params) {
    };
    RequestsService.prototype.getHostServer = function () {
    };
    RequestsService.prototype.getBEAPIServer = function () {
    };
    RequestsService.prototype.transformRequest = function (obj) {
        var clr = new Object();
        var str = new Array();
        for (var p in obj) {
            if (obj[p] !== undefined) {
                clr[p] = obj[p];
            }
        }
        for (var _i = 0, _a = Object.keys(clr); _i < _a.length; _i++) {
            var p = _a[_i];
            if ('object'.indexOf(typeof (clr[p])) > -1) {
                clr[p] = JSON.stringify(clr[p]);
            }
            str.push(encodeURIComponent(p) + '=' + clr[p]);
        }
        return str.join('&');
    };
    RequestsService.prototype.getRequest = function (url, _params) {
        var headers = new http_1.Headers();
        var params = this.transformRequest(_params);
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        if (params.length > 0) {
            return this.http.get(this.getBEAPIServer() + url + '?' + params, { headers: headers })
                .map(function (response) { return response.json(); });
        }
        else {
            return this.http.get(this.getBEAPIServer() + url, { headers: headers })
                .map(function (response) { return response.json(); });
        }
    };
    RequestsService.prototype.getRequestReport = function (url, _params) {
        var headers = new http_1.Headers();
        var params = this.transformRequest(_params);
        headers.append('Authorization', 'Bearer ' + this.getToken());
        headers.append('Accept', 'application/pdf');
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        if (params.length > 0) {
            return this.http.get(this.getBEAPIServer() + url + '?' + params, { headers: headers })
                .map(function (res) { return res.blob(); });
        }
        return this.http.get(this.getBEAPIServer() + url, {
            headers: headers,
            responseType: http_1.ResponseContentType.ArrayBuffer
        }).map(function (res) { return res.blob(); });
    };
    RequestsService.prototype.getRequestToBilling = function (url, _params, accessToken) {
        var headers = new http_1.Headers();
        var params = this.transformRequest(_params);
        var uri = app_config_1.AppConfig.BILLING_API_ENDPOINT + url;
        console.log(uri);
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        if (params.length > 0) {
            return this.http.get(uri + '?' + params, { headers: headers })
                .map(function (response) { return response.json(); });
        }
        else {
            return this.http.get(app_config_1.AppConfig.BILLING_API_ENDPOINT + url, { headers: headers })
                .map(function (response) { return response.json(); });
        }
    };
    RequestsService.prototype.getTokenFromConsole = function (url, _params) {
        var headers = new http_1.Headers();
        var params = this.transformRequest(_params);
        if (params.length > 0) {
            return this.http.get(app_config_1.AppConfig.CONSOLE_API_ENDPOINT + url + '?' + params, { headers: headers })
                .map(function (response) { return response.json(); });
        }
        else {
            return this.http.get(app_config_1.AppConfig.CONSOLE_API_ENDPOINT + url, { headers: headers })
                .map(function (response) { return response.json(); });
        }
    };
    RequestsService.prototype.getTokenFromBilling = function (url, _params) {
        var headers = new http_1.Headers();
        var params = this.transformRequest(_params);
        if (params.length > 0) {
            return this.http.get(app_config_1.AppConfig.BILLING_API_ENDPOINT + url + '?' + params, { headers: headers })
                .map(function (response) { return response.json(); });
        }
        else {
            return this.http.get(app_config_1.AppConfig.BILLING_API_ENDPOINT + url, { headers: headers })
                .map(function (response) { return response.json(); });
        }
    };
    RequestsService.prototype.getRequestUserInfo = function (url, _params) {
        var headers = new http_1.Headers();
        var params = this.transformRequest(_params);
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        if (params.length > 0) {
            return this.http.get(this.getBEAPIServer() + url + '?' + params, { headers: headers })
                .map(function (response) { return response.json(); });
        }
        else {
            return this.http.get(this.getBEAPIServer() + url, { headers: headers })
                .map(function (response) { return response.json(); });
        }
    };
    RequestsService.prototype.deleteRequest = function (url, _params) {
        var headers = new http_1.Headers();
        if (this.getToken()) {
            headers.append('Authorization', 'auth_token ' + this.getToken());
        }
        return this.http.delete(this.getBEAPIServer() + url, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    ;
    RequestsService.prototype.postRequest = function (url, _params) {
        var headers = new http_1.Headers();
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.getBEAPIServer() + url, _params, { headers: headers })
            .map(function (response) {
            return response.json();
        });
    };
    RequestsService.prototype.postUnAuthRequest = function (url, _params) {
        var headers = new http_1.Headers();
        var encoded = btoa('APClient:APSecret');
        if (this.getToken()) {
            headers.append('Authorization', 'Basic ' + encoded);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.getBEAPIServer() + url, _params, { headers: headers })
            .map(function (response) {
            return response.json();
        });
    };
    RequestsService.prototype.getUnAuthRequest = function (url, _params) {
        var headers = new http_1.Headers();
        var encoded = btoa('APClient:APSecret');
        if (this.getToken()) {
            headers.append('Authorization', 'Basic ' + encoded);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.getBEAPIServer() + url, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    RequestsService.prototype.postRequestToBilling = function (url, _params, accessToken) {
        var headers = new http_1.Headers();
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(app_config_1.AppConfig.BILLING_API_ENDPOINT + url, {}, { headers: headers })
            .map(function (response) {
            return response.json();
        });
    };
    RequestsService.prototype.getRequestToConsole = function (url, _params, accessToken) {
        var headers = new http_1.Headers();
        var uri = app_config_1.AppConfig.CONSOLE_API_ENDPOINT + url;
        console.log(uri);
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        if (_params.length > 0) {
            return this.http.get(uri + '?' + _params, { headers: headers })
                .map(function (response) { return response.json(); });
        }
        else {
            return this.http.get(app_config_1.AppConfig.CONSOLE_API_ENDPOINT + url, { headers: headers })
                .map(function (response) { return response.json(); });
        }
    };
    RequestsService.prototype.postRequestToConsole = function (url, _params, accessToken) {
        var headers = new http_1.Headers();
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(app_config_1.AppConfig.CONSOLE_API_ENDPOINT + url, {}, { headers: headers })
            .map(function (response) {
            return response.json();
        });
    };
    RequestsService.prototype.putRequestToBilling = function (url, _params, accessToken) {
        var headers = new http_1.Headers();
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(app_config_1.AppConfig.BILLING_API_ENDPOINT + url, _params, { headers: headers })
            .map(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    RequestsService.prototype.postRequestMultipartFormData = function (url, data) {
        var formData = new FormData();
        var headers = new http_1.Headers();
        formData.append('file', data, data.name);
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getBEAPIServer() + url, formData, options)
            .map(function (response) {
            return response.json();
        });
    };
    RequestsService.prototype.postRequestMultipartFormData1 = function (url, data, files) {
        var formData = new FormData();
        formData.append('file', files, files.name);
        console.log(formData);
        var headers = new http_1.Headers();
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post(this.getBEAPIServer() + url, formData, { headers: headers })
            .map(function (response) {
            return response.json();
        });
    };
    /* postRequestXFormData(url: any, data: any) {
         const headers = new Headers();
         let formData = new FormData();
         for (let i in data) {
             formData.append(i, data[i]);
         }
         if (this.getToken()) {
             headers.append('Authorization', 'auth_token ' + this.getToken());
         }
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         return this.http.post(this.getBEAPIServer() + url, data, {headers: headers})
             .map((response: Response) => {
                 return response.json();
             });
     }*/
    RequestsService.prototype.putRequest = function (url, _params) {
        var headers = new http_1.Headers();
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.getBEAPIServer() + url, _params, { headers: headers })
            .map(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    RequestsService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    RequestsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            app_config_1.AppConfig])
    ], RequestsService);
    return RequestsService;
}());
exports.RequestsService = RequestsService;
//# sourceMappingURL=requests.service.js.map