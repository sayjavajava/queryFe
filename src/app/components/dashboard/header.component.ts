import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {UserSharedService} from "../../services/user.shared.service";
import {APUtilService} from "../../services/ap.util.service";
import {AdminUpdateService} from "../../services/admin-update.service";
import {PermissionsService} from "../../services/permissions.service";

@Component({
    selector: 'header-component',
    templateUrl: '../../templates/dashboard/header.template.html',
    styleUrls: ['../../styles/dashboard/header.style.css']
})
export class HeaderComponent implements OnInit {

    constructor(private requestsService: RequestsService,
                private router: Router,
                private userSharedService: UserSharedService,
                private apUtilServer: APUtilService,
                private adminUpdateService: AdminUpdateService,
                private permissionsService: PermissionsService) {
    }

    id: number;
    firstName: string;
    lastName: string;
    profileImg: string;
    userDesignation: string;

    ngOnInit() {
        this.adminUpdateService.newSubject.subscribe(
            profileImgUrl => this.profileImg = profileImgUrl
        )

        if (window.localStorage.getItem('access_token')) {
            this.requestsService.getRequest(
                '/admin/'
                , {})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'ADM_SUC_08') {
                            this.userSharedService.firstName = response['responseData'].firstName;
                            this.userSharedService.lastName = response['responseData'].lastName;
                            this.userSharedService.profileImg = response['responseData'].profileImg;
                            this.userSharedService.userDesignation = response['responseData'].role;

                            this.firstName = this.userSharedService.firstName;
                            this.lastName = this.userSharedService.lastName;
                            this.profileImg = this.userSharedService.profileImg;
                            this.userDesignation = this.userSharedService.userDesignation;
                        }
                    },
                    (error: any) => {
                        this.apUtilServer.tokenExpired(error.json()['error']);
                        //console.log(error.json())
                    }
                );
        }
    }

    logout() {
        this.requestsService.postRequest(
            '/admin/auth/signOut/'
            , {})
            .subscribe(
                (response: Response) => {
                    if (response['responseCode'] === 'ADM_SUC_07') {
                        window.localStorage.removeItem('access_token');
                        window.localStorage.removeItem('state');
                        window.localStorage.removeItem('client_id');
                        window.localStorage.removeItem('response_type');
                        window.localStorage.removeItem('redirect_uri');
                        window.localStorage.removeItem('expire_in');
                        window.localStorage.removeItem('refresh_token');
                        window.localStorage.removeItem(btoa('permissions'));
                        this.router.navigate(['/login']);
                    } else {
                        window.localStorage.removeItem('access_token');
                        window.localStorage.removeItem(btoa('permissions'));
                        window.localStorage.removeItem('state');
                        window.localStorage.removeItem('client_id');
                        window.localStorage.removeItem('response_type');
                        window.localStorage.removeItem('redirect_uri');
                        window.localStorage.removeItem('expire_in');
                        window.localStorage.removeItem('refresh_token');
                        this.router.navigate(['/login']);
                    }
                },
                (error: any) => {
                    //console.log(error.json())
                    window.localStorage.removeItem('access_token');
                    window.localStorage.removeItem('state');
                    window.localStorage.removeItem('client_id');
                    window.localStorage.removeItem('response_type');
                    window.localStorage.removeItem('redirect_uri');
                    window.localStorage.removeItem('expire_in');
                    window.localStorage.removeItem('refresh_token');
                    window.localStorage.removeItem(btoa('permissions'));
                    this.router.navigate(['/login']);
                }
            );
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
