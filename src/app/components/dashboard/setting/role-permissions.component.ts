import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';

@Component({
    selector: 'rolepermissions-component',
    templateUrl: '../../../templates/dashboard/setting/roles-permissions.template.html',
})
export class RolePermissionsComponent implements OnInit {

    constructor(private notificationservice: NotificationService) {
    }

    ngOnInit() {

    }
}
