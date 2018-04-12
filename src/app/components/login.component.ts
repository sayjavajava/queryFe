import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {RequestsService} from '../services/requests.service';

@Component({
    selector: 'login-component',
    templateUrl: '../templates/login.template.html'
})
export class LoginComponent {
    username: string;
    password: string;
    remember: boolean;

    constructor(private requestsService: RequestsService,
                private router: Router) {
    };

    ngOnInit() {
    }

    login(form: NgForm) {
        // this.toaster.success('Test Toaster', 'Login');
    }

    forgotPassword() {
        this.router.navigate(['/forgotPassword']);
    }
}
