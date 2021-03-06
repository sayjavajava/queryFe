import {Injectable} from '@angular/core';

@Injectable()
export class PermissionsService {

    constructor() {
    }

    public loadPermissions(dbPermissions: string[]) {
        let permissions: string[] = [];
        dbPermissions.forEach((item, index) => {
            permissions[index] = item['permission'];
        });
        window.localStorage.setItem(btoa('permissions'), btoa(JSON.stringify(permissions)));
        //console.log('load permissions');
    }

    public unloadPermissions() {

    }

    public hasPermission(permission: string): boolean {
        //console.log(permission);
        let hasPermission: boolean = false;
        if (localStorage.getItem(btoa('permissions'))) {
            var permissions: string[] = JSON.parse(atob(localStorage.getItem(btoa('permissions'))));
            permissions.forEach((item, index) => {
                if (item === permission) {
                    hasPermission = true;
                    return hasPermission;
                }
            });
            //console.log(hasPermission);
            return hasPermission;
        }
    }

    ngOnInit() {

    }
}