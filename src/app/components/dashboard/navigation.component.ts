import {Component} from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {UserSharedService} from "../../services/user.shared.service";
import {PermissionsService} from "../../services/permissions.service";

@Component({
    selector: 'navigation-component',
    templateUrl: '../../templates/dashboard/navigation.template.html',
    styleUrls: ['../../styles/dashboard/navigation.style.css']
})
export class NavigationComponent {

    constructor(private requestsService: RequestsService,
                private router: Router,
                private userSharedService: UserSharedService,
                private permissionsService: PermissionsService) {
    };

    firstName: string;
    lastName: string;
    profileImg: string;
    userDesignation: string

    ngOnInit() {
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
                        //console.log(error.json())
                    }
                );
        }
    }

    logout() {
        window.localStorage.removeItem('access_token');
        this.router.navigate(['/login/']);
    }

    populatePasswordPolicy() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/dashboard/passwordPolicies']);
        }
    }

    goToActivityLog() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/activityLogs']);
        }
    }

    goToAdminProfile() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/profile']);
        }
    }

    goToAdminSettings() {
        if (window.localStorage.getItem('access_token')) {
            this.router.navigate(['/admin/settings']);
        }
    }

}
