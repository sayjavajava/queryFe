import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../services/requests.service';
import {PermissionsService} from '../services/permissions.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'login-component',
    templateUrl: '../templates/login.template.html',
    styleUrls: ['../styles/login.style.css']
})
export class LoginComponent {
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

    constructor(private requestsService: RequestsService,
                private router: Router,
                private permissionsService: PermissionsService,
                private titleService: Title,
                private activatedRoute: ActivatedRoute) {
    };

    ngOnInit() {
    }

    login(form: NgForm) {
    }

    onChange() {
        this.error = null;
    }

    getCookie() {
    }

    forgotPassword() {
        this.router.navigate(['/forgotPassword']);
    }
}
