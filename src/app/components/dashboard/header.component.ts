import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {Router} from '@angular/router';

@Component({
    selector: 'header-component',
    templateUrl: '../../templates/dashboard/header.template.html',
    styleUrls: ['../../styles/dashboard/header.style.css']
})
export class HeaderComponent implements OnInit {
    id: number;
    firstName: string;
    lastName: string;
    profileImg: string;
    userDesignation: string;

    constructor(private requestsService: RequestsService,
                private router: Router) {
    }

    ngOnInit() {
    }

    logout() {
    }

    goToAdminProfile() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/profile']);
        }
    }

    createNewCustomer() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/dashboard/customer/add']);
        }
    }

    goToActivityLog() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/activityLogs']);
        }
    }

    goToAdminSettings() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/settings']);
        }
    }
}
