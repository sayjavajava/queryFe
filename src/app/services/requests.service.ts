import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Router} from '@angular/router';
import {AppConfig} from '../configuration/app.config';

@Injectable()
export class RequestsService {
    constructor(private http: Http,
                private router: Router,
                private appConfig: AppConfig) {
    };

    getThisUrl() {

    }

    getToken() {
        return window.localStorage.getItem('access_token')
    }

    postRequestOauth2Token(url: any, _params: any) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        var encoded = btoa(AppConfig.BE_ACCESS_CLIENT + ':' + AppConfig.BE_ACCESS_SECRET);
        var getURL = this.getBEAPIServer() + url + "?username=" + _params['userName'] + "&password=" + _params['password'] + "&grant_type=" + _params['grantType'];

        headers.append('Authorization', 'Basic ' + encoded);
        headers.append('Content-Type', 'application/json');
        return this.http.post(getURL, _params, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
    }

    getHostServer() {
        var protocol = 'http' // http
        var server = 'monitor.sa-brightlife.com' // 192.168.1.188
        var port = '' // 8080 Leave Empty to if running on port 80
        if (protocol === '' || !protocol || server === '' || !server) {
            return ''
        }
        else {
            if (port === '' || !port) {
                return protocol + '://' + server
            }
            else {
                return protocol + '://' + server + ':' + port
            }
        }

    }

    getBEAPIServer() {
        var protocol = AppConfig.BE_HTTP_PROTOCOL; // http
        var server = AppConfig.BE_API_ENDPOINT; // 192.168.1.188
        var port = AppConfig.BE_API_PORT; // 8080 Leave Empty to if running on port 80
        var contextPath = '/' + AppConfig.BE_API_CONTEXT_PATH;
        if (protocol === '' || !protocol || server === '' || !server)
            return ''
        else {
            if (port === '' || !port) {
                return protocol + AppConfig.BE_HTTP_SEPARATOR + server + ':' + port + contextPath
            }
            else {
                return protocol + AppConfig.BE_HTTP_SEPARATOR + server + ':' + port + contextPath
            }
        }
    }

    getRequest(url: any, _params: any) {
        const headers = new Headers();
        const params = this.transformRequest(_params);
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        if (params.length > 0) {
            return this.http.get(this.getBEAPIServer() + url + '?' + params, {headers: headers})
                .map((response: Response) => response.json());
        }
        else {
            return this.http.get(this.getBEAPIServer() + url, {headers: headers})
                .map((response: Response) => response.json());
        }
    }

    getRequestReport(url: any, _params: any) {
        const headers = new Headers();
        const params = this.transformRequest(_params);
        headers.append('Authorization', 'Bearer ' + this.getToken());
        headers.append('Accept', 'application/pdf');
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        if (params.length > 0) {
            return this.http.get(this.getBEAPIServer() + url + '?' + params, {headers: headers})
                .map((res: Response) => res.blob());
        }
        return this.http.get(this.getBEAPIServer() + url, {
            headers: headers,
            responseType: ResponseContentType.ArrayBuffer
        }).map((res: Response) => res.blob());
    }

    getRequestToBilling(url: any, _params: any, accessToken: string) {
        const headers = new Headers();
        const params = this.transformRequest(_params);
        var uri = AppConfig.BILLING_API_ENDPOINT + url;
        console.log(uri);
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        if (params.length > 0) {
            return this.http.get(uri + '?' + params, {headers: headers})
                .map((response: Response) => response.json());
        }
        else {
            return this.http.get(AppConfig.BILLING_API_ENDPOINT + url, {headers: headers})
                .map((response: Response) => response.json());
        }
    }

    getTokenFromConsole(url: any, _params: any) {
        const headers = new Headers();
        const params = this.transformRequest(_params);
        if (params.length > 0) {
            return this.http.get(AppConfig.CONSOLE_API_ENDPOINT + url + '?' + params, {headers: headers})
                .map((response: Response) => response.json());
        } else {
            return this.http.get(AppConfig.CONSOLE_API_ENDPOINT + url, {headers: headers})
                .map((response: Response) => response.json());
        }
    }

    getTokenFromBilling(url: any, _params: any) {
        const headers = new Headers();
        const params = this.transformRequest(_params);
        if (params.length > 0) {
            return this.http.get(AppConfig.BILLING_API_ENDPOINT + url + '?' + params, {headers: headers})
                .map((response: Response) => response.json());
        } else {
            return this.http.get(AppConfig.BILLING_API_ENDPOINT + url, {headers: headers})
                .map((response: Response) => response.json());
        }
    }

    getRequestUserInfo(url: any, _params: any) {
        const headers = new Headers();
        const params = this.transformRequest(_params);
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        if (params.length > 0) {
            return this.http.get(this.getBEAPIServer() + url + '?' + params, {headers: headers})
                .map((response: Response) => response.json());
        }
        else {
            return this.http.get(this.getBEAPIServer() + url, {headers: headers})
                .map((response: Response) => response.json());
        }
    }

    deleteRequest(url: any, _params: any) {
        const headers = new Headers();
        if (this.getToken()) {
            headers.append('Authorization', 'auth_token ' + this.getToken());
        }
        return this.http.delete(this.getBEAPIServer() + url, {headers: headers})
            .map((response: Response) => response.json());
    };

    removeUndefined(obj: any) {
        var cleanObj = new Object;
        for (var p in obj) {
            try {
                if (obj[p].isArray) {
                    var cleanSubObj = new Object;
                    for (var i in obj[p]) {
                        if (obj[p][i]) {
                            cleanSubObj[i] = obj[p][i];
                        }
                    }
                    cleanObj[p] = cleanSubObj;
                }
                else {
                    if (obj[p]) {
                        cleanObj[p] = obj[p]
                    }
                }
            }
            catch (err) {
                continue
            }
        }
        return cleanObj;
    }

    transformRequest(obj: any) {
        var clr = new Object();
        var str = new Array();
        for (var p in obj) {
            if (obj[p] != undefined) {
                clr[p] = obj[p]
            }
        }
        for (var p in clr) {
            if ('object'.indexOf(typeof(clr[p])) > -1) {
                clr[p] = JSON.stringify(clr[p]);
            }
            str.push(encodeURIComponent(p) + '=' + clr[p]);
        }
        return str.join('&');
    }

    postRequest(url: any, _params: any) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.getBEAPIServer() + url, _params, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
    }

    postUnAuthRequest(url: any, _params: any) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        var encoded = btoa('APClient:APSecret');
        if (this.getToken()) {
            headers.append('Authorization', 'Basic ' + encoded);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.getBEAPIServer() + url, _params, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
    }

    getUnAuthRequest(url: any, _params: any) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        var encoded = btoa('APClient:APSecret');
        if (this.getToken()) {
            headers.append('Authorization', 'Basic ' + encoded);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.getBEAPIServer() + url, {headers: headers})
            .map((response: Response) => response.json());
    }

    postRequestToBilling(url: any, _params: any, accessToken: string) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(AppConfig.BILLING_API_ENDPOINT + url, {}, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
    }
    getRequestToConsole(url: any, _params: any, accessToken: string) {
        const headers = new Headers();
        const params = this.transformRequest(_params);
        var uri = AppConfig.CONSOLE_API_ENDPOINT + url;
        console.log(uri);
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        if (params.length > 0) {
            return this.http.get(uri + '?' + params, {headers: headers})
                .map((response: Response) => response.json());
        }
        else {
            return this.http.get(AppConfig.CONSOLE_API_ENDPOINT + url, {headers: headers})
                .map((response: Response) => response.json());
        }
    }

    postRequestToConsole(url: any, _params: any, accessToken: string) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.post(AppConfig.CONSOLE_API_ENDPOINT + url, {}, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
    }

    putRequestToBilling(url: any, _params: any, accessToken: string) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        if (this.getToken()) {
            headers.append('X-Auth-token', accessToken);
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(AppConfig.BILLING_API_ENDPOINT + url, _params, {headers: headers})
            .map((response: Response) => {
                return response.json()
            }).catch(this.handleError);
    }

    postRequestMultipartFormData(url: any, data: any) {
        //data = this.removeUndefined(data);
        let formData: FormData = new FormData()
        const headers = new Headers();
        formData.append('file', data, data.name);
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        //headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'undefined');
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.getBEAPIServer() + url, formData, options)
            .map((response: Response) => {
                return response.json();
            })
    }

    postRequestMultipartFormData1(url: any, data: any, files: any) {
        data = this.removeUndefined(data);
        var formData = new FormData();
        //for (var i in files) {
        formData.append('file', files, files.name);
        //}
        console.log(formData);
        const headers = new Headers();
        // for (var i in data) {
        //     formData.append(i, data[i]);
        // }
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post(this.getBEAPIServer() + url, formData, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
    }

    postRequestXFormData(url: any, data: any) {
        data = this.removeUndefined(data);
        const headers = new Headers();
        var formData = new FormData();
        for (var i in data) {
            formData.append(i, data[i]);
        }
        if (this.getToken()) {
            headers.append('Authorization', 'auth_token ' + this.getToken());
        }
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.getBEAPIServer() + url, data, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
    }

    putRequest(url: any, _params: any) {
        _params = this.removeUndefined(_params);
        const headers = new Headers();
        if (this.getToken()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.getBEAPIServer() + url, _params, {headers: headers})
            .map((response: Response) => {
                return response.json()
            }).catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
