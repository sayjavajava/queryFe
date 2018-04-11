import {Component, ViewContainerRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../services/requests.service';
import {PermissionsService} from '../services/permissions.service';
import {Title} from '@angular/platform-browser';
import {ToastsManager} from 'ng2-toastr';

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
                private activatedRoute: ActivatedRoute,
                public toaster: ToastsManager,
                vcr: ViewContainerRef) {
        this.toaster.setRootViewContainerRef(vcr);
    };

    ngOnInit() {
    }

    login(form: NgForm) {
        // this.toaster.success('Test Toaster', 'Login');
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
