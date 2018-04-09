import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Response} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {RequestsService} from "../services/requests.service";
import {UserSharedService} from "../services/user.shared.service";
import {CookieService} from 'angular2-cookie/core';
import {PermissionsService} from "../services/permissions.service";
import {AppConstants} from "../utils/app.constants";
import {Title} from "@angular/platform-browser";
import {AppConfig} from "../configuration/app.config";

@Component({
    selector: 'login-component',
    templateUrl: '../templates/login.template.html',
    styleUrls: ['../styles/login.style.css'],
    providers: [CookieService]
})
export class LoginComponent {
    constructor(private requestsService: RequestsService,
                private router: Router,
                private userSharedService: UserSharedService,
                private _cookieService: CookieService,
                private permissionsService: PermissionsService,
                private titleService: Title,
                private activatedRoute: ActivatedRoute) {
    };

    username: string;
    password: string;
    error: any;
    remember: boolean;
    isPasswordExpired: boolean = false;
    passwordExpiredToken: string;
    isLoggedInProcessed: boolean = false;
    alexaState: string;
    redirectUri: string;
    clientId: string;
    responseType: string;

    ngOnInit() {
        this.titleService.setTitle("BrightLife Admin - Login");
        if (!window.localStorage.getItem('access_token')) {
            this.activatedRoute.queryParams.subscribe(
                params => {
                    this.clientId = params['client_id'];
                    this.responseType = params['response_type'];
                    this.alexaState = params['state'];
                    this.redirectUri = params['redirect_uri'];
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
    }

    login(form: NgForm) {
        this.error = null;
        this.isLoggedInProcessed = true;

        // this._cookieService.removeAll();
        _.each(form.form.controls, function (control) {
            control['_touched'] = true
        });

        this.requestsService.postRequestOauth2Token(
            '/oauth/token'
            , {
                'userName': this.username,
                'password': this.password,
                'grantType': 'password',
            })
            .subscribe(
                (response: Response) => {
                    if (response['token_type'] === 'bearer') {
                        window.localStorage.setItem('access_token', response['access_token']);
                        window.localStorage.setItem('refresh_token', response['refresh_token']);
                        window.localStorage.setItem('expire_in', response['expires_in']);

                        // this.router.navigate(['/dashboard/']);
                        if (window.localStorage.getItem('client_id') === AppConfig.CLIENT_ID) {
                            this.requestsService.postRequest(
                                '/alexa/signIn'
                                , {
                                    'userName': this.username,
                                    'password': this.password,
                                    'accessToken': window.localStorage.getItem('access_token'),
                                    'refreshToken': window.localStorage.getItem('refresh_token'),
                                    'redirectURI': window.localStorage.getItem('redirect_uri'),
                                    'state': window.localStorage.getItem('state'),
                                    'clientId': AppConfig.CLIENT_ID,
                                    'clientSecret': AppConfig.CLIENT_SECRET,
                                    'expireIn': window.localStorage.getItem('expire_in'),

                                })
                                .subscribe(
                                    (responseAlexa: Response) => {
                                        if (responseAlexa['responseCode'] === 'ADM_AUTH_SUC_01') {

                                            var uri = responseAlexa['responseData'].redirectURI +
                                                '?state=' + responseAlexa['responseData'].state +
                                                '&code=' + responseAlexa['responseData'].code;

                                            window.localStorage.removeItem('redirect_uri');
                                            window.localStorage.removeItem('access_token');
                                            window.localStorage.removeItem('refresh_token');
                                            window.localStorage.removeItem(btoa('permissions'));
                                            this.isLoggedInProcessed = false;
                                            console.log(uri);
                                            window.location.href = uri;
                                            return;
                                        } else {
                                            this.router.navigate(['/login/']);
                                            window.localStorage.removeItem('access_token');
                                            window.localStorage.removeItem('refresh_token');
                                            this.passwordExpiredToken = null;
                                            this.error = response['responseMessage'];
                                            this.isLoggedInProcessed = false;
                                        }
                                    },
                                    (error: any) => {
                                        console.log(error.json());
                                        this.error = error.json()['responseMessage'];
                                        this.isLoggedInProcessed = false;
                                    });
                        } else {

                            this.requestsService.postRequest(
                                '/admin/auth/signIn'
                                , {
                                    'userName': this.username,
                                    'password': this.password,
                                })
                                .subscribe(
                                    (response: Response) => {
                                        if (response['responseCode'] === 'ADM_AUTH_SUC_01') {
                                            if (this.remember === true) {
                                                this._cookieService.put(this.username, this.password);
                                            }
                                            this.userSharedService.firstName = response['responseData'].firstName;
                                            this.userSharedService.lastName = response['responseData'].lastName;
                                            this.userSharedService.profileImg = response['responseData'].profileImg;
                                            this.userSharedService.userDesignation = response['responseData'].role;
                                            this.permissionsService.loadPermissions(response['responseData'].permission);
                                            this.isLoggedInProcessed = false;
                                            this.router.navigate(['/dashboard/']);

                                        } else if (response['responseCode'] === 'ADM_AUTH_ERR_02') {
                                            window.localStorage.removeItem('access_token');
                                            window.localStorage.removeItem('refresh_token');
                                            window.localStorage.setItem(AppConstants.EXPIRE_PASSWORD_TOKEN, response['responseData'].expirePasswordToken);
                                            this.isPasswordExpired = true;
                                            this.isLoggedInProcessed = false;
                                            this.passwordExpiredToken = window.localStorage.getItem(AppConstants.EXPIRE_PASSWORD_TOKEN);
                                        } else {
                                            this.router.navigate(['/login/']);
                                            window.localStorage.removeItem('access_token');
                                            window.localStorage.removeItem('refresh_token');
                                            this.passwordExpiredToken = null;
                                            this.error = response['responseMessage'];
                                            this.isLoggedInProcessed = false;
                                        }
                                    },
                                    (error: any) => {
                                        console.log(error.json());
                                        this.error = error.json()['responseMessage'];
                                        this.isLoggedInProcessed = false;
                                    });
                        }
                    }
                },
                (error: any) => {
                    console.log(error.json());
                    this.error = error.json()['error_description'];
                    this.isLoggedInProcessed = false;
                }
            );
    }

    onChange() {
        this.error = null;
    }

    getCookie() {
        if (this._cookieService.get(this.username) != null) {
            this.password = this._cookieService.get(this.username)
        } else {
            this.password = null;
        }

    }

    forgotPassword() {
        this.router.navigate(['/forgotPassword']);
    }
}
